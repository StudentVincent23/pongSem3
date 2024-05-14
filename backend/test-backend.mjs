import test from 'ava';

test("Hellow world! from backend", t => {
    t.pass();
});

test('createRecord creates a new record', async t => {
    await createRecord({ field: 'value' });
    const record = await Record.findOne({ field: 'value' });
    t.truthy(record);
    await record.delete();
    t.falsy(await Record.findOne({ field: 'value' }));

});

test('GET /my-route returns correct response', async t => {
    const response = await request(app).get('/my-route');
    t.is(response.status, 200);
    t.deepEqual(response.body, { message: 'Expected message' });
});
