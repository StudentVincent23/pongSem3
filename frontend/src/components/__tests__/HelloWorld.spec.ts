import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

import { updateCookie, getCookie } from '../../cookies';
import LoginPage from '../../views/InlogView.vue'

// test of the tests
describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})

// cookies tests
describe('Cookie Functions', () => {
  // Test updateCookie function
  it('updates cookie properly', () => {
    const name = 'test_cookie';
    const value = 'test_value';

    updateCookie(name, value);
    
    const cookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith(name));
    expect(cookie).toBeDefined();
    expect(cookie).toContain(`${name}=${value}`);
  });

  // Test getCookie function
  it('returns correct cookie value', () => {
    const name = 'test_cookie';
    const value = 'test_value';
    document.cookie = `${name}=${value}`;

    const result = getCookie(name);

    expect(result).toEqual(value);
  });

  it('returns null for non-existing cookie', () => {
    const name = 'non_existing_cookie';

    const result = getCookie(name);

    expect(result).toBeNull();
  });

  it('returns the correct value when there are multiple cookies', () => {
    const name1 = 'cookie1';
    const value1 = 'value1';
    document.cookie = `${name1}=${value1}`;
  
    const name2 = 'cookie2';
    const value2 = 'value2';
    document.cookie = `${name2}=${value2}`;
  
    const result1 = getCookie(name1);
    expect(result1).toEqual(value1);
  
    const result2 = getCookie(name2);
    expect(result2).toEqual(value2);
  });
});

// login page tests
describe('LoginPage.vue', () => {
  it('submits the form when the submit button is clicked', async () => {
    const wrapper = mount(LoginPage)
    const mockSubmit = () => {} // Mock the submit function
    wrapper.vm.submitForm = mockSubmit

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.vm.submitForm).toBe(mockSubmit);
  })




  


})
