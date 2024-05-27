import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import HelloWorld from '../src/components/HelloWorld.vue';


describe('HelloWorld.vue', () => {
  it('renders "Hello, World!"', () => {
    const wrapper = mount(HelloWorld);
    expect(wrapper.text()).toBe('Hello, World!');
  });
});
