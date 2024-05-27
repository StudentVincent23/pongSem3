import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import InlogPage from '../src/views/InlogView.vue';


describe('InlogPage', () => {
it('renders the correct elements', () => {
    const wrapper = mount(InlogPage);
    expect(wrapper.find('.create-login-container h2').text()).toBe('maak nieuwe player');
    expect(wrapper.find('.create-login-container input').attributes('placeholder')).toBe('verzin naam');
    expect(wrapper.find('.create-login-container button').text()).toBe('maken');

    expect(wrapper.find('.login-container h2').text()).toBe('inloggen');
    expect(wrapper.find('.login-container input').attributes('placeholder')).toBe('login naam');
    expect(wrapper.find('.login-container button').text()).toBe('inloggen');

    expect(wrapper.find('.logged-in-container h2').text()).toBe('Logged In:');
  });
});
