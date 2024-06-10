import { describe, expect, it } from 'vitest';
import { AddUser, GetUsers, DeleteUserById } from '../services';

describe('User Services', () => {
    const name = 'testUser06/06/2024';

    it('add, delete and get user test', async () => {
        const score = 100;
        const usersCleanUp = await GetUsers();
        const foundUserCleanUp = usersCleanUp.find(user => user.name === name);

        if (foundUserCleanUp?.name === name) {
            expect(foundUserCleanUp?.name).toBe(name);
            DeleteUserById(foundUserCleanUp.id);
        } 

        AddUser(name, score); 

        const users = await GetUsers();
        const foundUser = users.find(user => user.name === name);

        if (foundUser?.name === name) {
            expect(foundUser?.name).toBe(name);
            expect(foundUser?.score).toBe(score);
        } else {
            throw new Error('User not found not added');
        }
    });
});
     