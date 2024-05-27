import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Home from '../src/views/HomeView.vue';

describe('Home.vue', () => {
  it('renders the correct title', () => {
    const wrapper = mount(Home);
    expect(wrapper.find('h1').text()).toBe('PONG');
  });

  it('renders the correct subtitle', () => {
    const wrapper = mount(Home);
    expect(wrapper.find('.subtitle').text()).toBe('Welcome to Pong');
  });

  it('renders the correct description', () => {
    const wrapper = mount(Home);
    const descriptionParagraphs = wrapper.findAll('.description p');
    expect(descriptionParagraphs[0].text()).toBe('Use the nav bar to go to difrent pages and play');
    expect(descriptionParagraphs[1].text()).toBe('Lets see how far you can get');
  });
});