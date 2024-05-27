import { describe, it, expect, beforeEach } from 'vitest';
import { PrismaClient } from "@prisma/client";
import { AddUser, GetUsers, UpdateScoreOfUserById, DeleteUserById } from '../services';

it('need yet to be made', () => {
  expect(true).toBe(true);
});



// const prisma = new PrismaClient();

// describe('Services', () => {
//   // beforeEach(async () => { // cleans up the whole database
//   //   await prisma.user.deleteMany();
//   // });
//   it('clean up for tests', async () => {
//     const users = await GetUsers();
//     const ourUser = users.find(user => user.name === "TestUser27052024");

//     if (ourUser) {
//       await DeleteUserById(ourUser.id);
//     } else {
//       console.log("test user not found, no deletion performed");
//     }
//   });

//   it('adds a user correctly', async () => {
//     AddUser("TestUser27052024", 0);
  
//     const users = await GetUsers();
//     const ourUser = users.find(user => user.name === "TestUser27052024");

//     // if (ourUser) {
//     //   const dbUser = await prisma.user.findUnique({ where: { id: ourUser.id } });
//     //   expect(dbUser).toEqual({ id: ourUser.id, name: "TestUser27052024", score: 0 });
//     // } else {
//     //   console.log('User not found');
//     // }

//   //   // DeleteUserById(ourUser?.id);
//   });

//   it('gets all users correctly', async () => {
//     const users = await GetUsers();
  
//     const dbUsers = await prisma.user.findMany();
//     expect(users).toEqual(dbUsers);
//   });

//   // it('updates a user correctly', async () => {
//   //   const updatedUser = await UpdateScoreOfUserById(5, 200);
  
//   //   const dbUser = await prisma.user.findUnique({ where: { id: 1 } });
//   //   expect(dbUser).toEqual({ id: 5, name: 'TestUser', score: 200 });
//   // });

//   // it('deletes a user correctly', async () => {

    
//   //   const users = await GetUsers();
//   //   const ourUser = users.find(user => user.name === "TestUser27052024");

//   //   DeleteUserById(ourUser?.id);
  
//   //   // const dbUser = await prisma.user.findUnique({ where: { ourUser?.id } });
//   //   expect(users).toBeNull();
//   // });
// });