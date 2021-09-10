<template>
  <Portal
    v-if="isOpen"
    to="snackbar"
  >
    <div :class="rootClasses">
      <div
        class="fixed inset-0"
        @click="close"
      />
      <div class="fixed">
        <div :class="containerWrapperClasses">
          <Label
            class="w-min"
            :text="text"
            :content-class="contentWrapperClasses"
            :prepend-class="prependClass"
            :append-class="appendWrapperClasses"
            :preset="textPreset"
          >
            <template #prepend>
              <IconError v-if="isError" />
              <slot v-else name="prepend" />
            </template>
            <slot />
            <template #append>
              <div @click="close">
                <IconClose />
              </div>
            </template>
          </Label>
        </div>
      </div>
    </div>
  </Portal>
</template>

<script lang="ts">
import { Vue, Component, Prop, ModelSync } from 'vue-property-decorator'

export enum Preset {
  warn = 'warn',
  success = 'success',
}

@Component
export default class Snackbar extends Vue {
  // Inner text of the label
  @Prop(String) readonly text!: string

  // Preset of the Snackbar
  @Prop(String) readonly preset!: string

  // Class of the content wrapper
  @Prop([
    String,
    Array,
  ]) readonly contentClass!: string | [] | undefined

  // Class of the prepend wrapper
  @Prop([
    String,
    Array,
  ]) readonly prependClass!: string | [] | undefined

  // Class of the append wrapper
  @Prop([
    String,
    Array,
  ]) readonly appendClass!: string | [] | undefined

  // Preset of the label that affects the label style
  @Prop(String) readonly textPreset!: string | undefined

  // Show/Hide dialog.
  @ModelSync('open', 'toggle', { type: Boolean, default: false })
  isOpen!: boolean

  get rootClasses() {
    return [
      'absolute',
      'inset-x-0',
      'top-[80vh]',
      'flex',
      'justify-center',
      'min-h-screen',
      'px-[8px]',
      'py-[80px]',
      this.preset,
    ]
  }

  get isError(): any {
    return this.preset === Preset.warn
  }

  get containerWrapperClasses(): any {
    return [
      'w-min',
      'pt-[18px]',
      'pb-[18px]',
      'pl-[24px]',
      'pr-[27px]',
      'rounded-[24px]',
      this.isError ? 'bg-red text-white' : 'bg-white',
    ]
  }

  get contentWrapperClasses(): any {
    return [
      'whitespace-nowrap',
      this.contentClass,
    ]
  }

  get appendWrapperClasses(): any {
    return [
      'ml-[50px]',
      'cursor-pointer',
      { 'text-like-green': !this.isError },
      this.appendClass,
    ]
  }

  close() {
    this.isOpen = false
  }
}
</script>