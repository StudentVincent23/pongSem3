import test from 'ava';
import { AddUser, GetUsers, UpdateScoreOfUserById, DeleteUserById } from './services';

test("Hellow world! from backend", t => {
    t.pass();
});

test('AddUser adds a user and DeleteUserById deletes the user', async t => {
    // Add a user
    const user = { name: 'Test User', score: 0 };
    const addedUser = await AddUser(user);
  
    // Check that the user was added
    const users = await GetUsers();
    t.true(users.some(u => u.name === user.name && u.score === user.score));
  
    // Delete the user
    await DeleteUserById(addedUser.id);
  
    // Check that the user was deleted
    const usersAfterDelete = await GetUsers();
    t.false(usersAfterDelete.some(u => u.id === addedUser.id));
  });



// test('createRecord creates a new record', async t => {
//     await createRecord({ field: 'value' });
//     const record = await Record.findOne({ field: 'value' });
//     t.truthy(record);
//     await record.delete();
//     t.falsy(await Record.findOne({ field: 'value' }));

// });

// test('GET /my-route returns correct response', async t => {
//     const response = await request(app).get('/my-route');
//     t.is(response.status, 200);
//     t.deepEqual(response.body, { message: 'Expected message' });
// });
