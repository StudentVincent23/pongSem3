import { describe, it, expect } from 'vitest';
import { updateCookie, getCookie } from '../src/cookies';


describe('Cookie Functions', () => {
    it('updates and retrieves cookie value', () => {
        const cookieName = 'testCookie';
        const cookieValue = 'testValue';

        // Update the cookie
        updateCookie(cookieName, cookieValue);

        // Retrieve the cookie value
        const retrievedValue = getCookie(cookieName);

        // Assert that the retrieved value matches the updated value
        expect(retrievedValue).toBe(cookieValue);
    });

    it('returns null for non-existent cookie', () => {
        const cookieName = 'nonExistentCookie';

        // Retrieve the non-existent cookie value
        const retrievedValue = getCookie(cookieName);

        // Assert that the retrieved value is null
        expect(retrievedValue).toBeNull();
    });
});
  
  
  