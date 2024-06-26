<template>
  <div class="flex flex-col items-center justify-center gap-[12px] mb-[32px]">
    <div
      class="flex flex-col justify-start gap-[32px] p-[20px] pb-[24px] border-2 border-[#E6F4F2] rounded-[16px] w-full"
    >
      <Label
        class="w-min text-like-green"
        :text="$t('NFTPortal.label.message.preview')"
        tag="div"
        preset="p6"
        valign="middle"
        align="left"
        content-class="whitespace-nowrap"
      >
        <template #prepend>
          <IconEye />
        </template>
      </Label>
      <div class="flex flex-col items-center justify-center">
        <div class="w-full mx-auto max-w-[80%]">
          <div class="text-[12px] text-center text-medium-gray">
            {{ $t('NFTPortal.label.message') }}
          </div>
          <EditableForm
            class="mt-[8px] mb-[18px]"
            :placeholder="$t('NFTPortal.placeholder.message')"
            @message="(value) => $emit('message-change', value)"
          />
        </div>
        <div class="flex">
          <UserAvatar :url="avatar" :size="42" />
          <div class="flex flex-col justify-start ml-[16px]">
            <div class="text-[12px] text-medium-gray">
              {{ $t('NFTPortal.label.creator') }}
            </div>
            <Label class="text-like-green" preset="h5">{{
              displayName | ellipsis
            }}</Label>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <Button
        preset="tertiary"
        text-preset="h6"
        size="mini"
        align="center"
        :text="$t('NFTPortal.button.settings')"
        @click="handleClickSettings"
      >
        <template #append>
          <IconAddMini v-if="!shouldShowSettings" />
          <div v-else class="bg-dark-gray w-[8px] h-[1px]" />
        </template>
      </Button>
    </div>

    <div
      v-if="shouldShowSettings"
      class="flex flex-col justify-start gap-[32px] pt-[20px] pb-[24px] px-[40px] border-2 border-[#E6F4F2] rounded-[16px] w-full"
    >
      <Label
        class="w-min text-like-green"
        :text="$t('NFTPortal.label.message.reserve')"
        tag="div"
        preset="p6"
        valign="middle"
        align="left"
        content-class="whitespace-nowrap"
      >
        <template #prepend>
          <IconGift />
        </template>
      </Label>
      <div
        class="flex justify-center gap-[12px] text-dark-gray text-[14px] items-center bg-[#E6F4F2] rounded-[4px] py-[4px]"
      >
        <span>{{ $t('NFTPortal.label.reserve.input') }}</span>
        <input
          ref="nameInput"
          :placeholder="placeholder"
          type="number"
          :max="premintAmount"
          min="0"
          class="w-[65px] bg-transparent border-0 border-b-2 border-black outline-none text-center placeholder-medium-gray focus:outline-none"
          @change="(value) => $emit('update-reserve', value)"
        />
      </div>
      <div
        v-if="shouldShowInitialBatchSettings"
        class="flex justify-center gap-[12px] text-dark-gray text-[14px] items-center bg-[#E6F4F2] rounded-[4px] py-[4px]"
      >
        <span>{{ $t('NFTPortal.label.initialBatch.input') }}</span>
        <select ref="batchInput" @change="(value) => $emit('update-initial-batch', value)">
          <option v-for="_, i in Array(maxInitialBatch)" :key="i" :value="i">
            {{ basePrice * Math.pow(2, i)}}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { getAddressLikerIdMinApi } from '~/constant/api'

import { ellipsis } from '~/utils/ui'

@Component({
  filters: { ellipsis },
})
export default class UploadForm extends Vue {
  @Prop(String) readonly address!: string

  @Prop(String) readonly placeholder!: string

  @Prop(Number) readonly premintAmount!: undefined

  userInfo: any = undefined
  avatar: string = ''
  displayName: string = this.address
  shouldShowSettings = false
  maxInitialBatch = 13
  basePrice = 8

  get shouldShowInitialBatchSettings() {
    return !!this.$route.query.set_initial_batch
  }

  async mounted() {
    try {
      const { data } = await this.$axios.get(
        getAddressLikerIdMinApi(this.address),
      )
      if (data) {
        this.avatar = data?.avatar
        this.displayName = data?.displayName || this.address
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }

  handleClickSettings() {
    this.shouldShowSettings = !this.shouldShowSettings
  }
}
</script>
