import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import About from '../src/views/AboutView.vue';

describe('About.vue', () => {
  it('renders the correct title', () => {
    const wrapper = mount(About);
    expect(wrapper.find('h1').text()).toBe('PONG');
  });

  it('renders the correct subtitle', () => {
    const wrapper = mount(About);
    expect(wrapper.find('.subtitle').text()).toBe('A Classic Arcade Game');
  });

  it('renders the correct info', () => {
    const wrapper = mount(About);
    const infoParagraphs = wrapper.findAll('.info p');
    expect(infoParagraphs[0].text()).toBe('Developed by Vincent');
    expect(infoParagraphs[1].text()).toBe('Version 1.4.17.548.M.DOG');
    expect(infoParagraphs[2].text()).toBe('Release Date: April 16, 2024');
  });

  it('renders the correct description', () => {
    const wrapper = mount(About);
    const descriptionParagraphs = wrapper.findAll('.description p');
    expect(descriptionParagraphs[0].text()).toBe('Welcome to Pong, the game that started it all!');
    expect(descriptionParagraphs[1].text()).toBe('Originally developed by Atari in 1972, Pong is one of the earliest arcade video games and a pioneer in the gaming industry. Now, Vincent brings you an exciting modern rendition of this classic game.');
    expect(descriptionParagraphs[2].text()).toBe('Challenge your friends or test your skills against the computer in this timeless battle of reflexes and strategy. With its simple yet addictive gameplay, Pong is sure to provide hours of entertainment for players of all ages.');
  });
});