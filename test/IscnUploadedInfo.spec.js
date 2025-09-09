import './stub'
import { mount } from '@vue/test-utils'
import IscnUploadedInfo from '~/components/IscnUploadedInfo.vue'

describe('IscnUploadedInfo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(IscnUploadedInfo, {
      mocks: {
        $t: (key) => key,
        localeLocation: () => {},
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
