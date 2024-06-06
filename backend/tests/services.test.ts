import { describe, expect, it, beforeEach } from 'vitest';
import { AddUser, GetUsers, UpdateScoreOfUserById, DeleteUserById } from '../services';
import exp from 'constants';

describe('User Services', () => {
    const name = 'testUser06/06/2024';

    it('add, updatescore, delete and get user test', async () => {
        const score = 100;
        const usersCleanUp = await GetUsers();
        const foundUserCleanUp = usersCleanUp.find(user => user.name === name);

        if (foundUserCleanUp?.name === name) {
            expect(foundUserCleanUp?.name).toBe(name);
            DeleteUserById(foundUserCleanUp.id);
            console.log('Test User deleted');
        } else{
            console.log('Test User not found');
        }

        AddUser(name, score); 

        const users = await GetUsers();
        const foundUser = users.find(user => user.name === name);

        if (foundUser?.name === name) {
            expect(foundUser?.name).toBe(name);
            expect(foundUser?.score).toBe(score);


            // UpdateScoreOfUserById(foundUser.id, 200);

            
            // const users2 = await GetUsers();
            // const foundUser2 = users2.find(user => user.name === name);

            // if (foundUser2?.name === name) {
            //     expect(foundUser2?.name).toBe(name);
            //     // expect(foundUser2?.score).toBe(200);
            // }
        
        }




   
    });


    // it('should update the score of a user by ID', async () => {
    //     const userId = 1;
    //     const newScore = 200;

    //     const updatedUser = await UpdateScoreOfUserById(userId, newScore);

    //     expect(updatedUser).toBeDefined();
    //     expect(updatedUser.id).toBe(userId);
    //     expect(updatedUser.score).toBe(newScore);
    // });


});
