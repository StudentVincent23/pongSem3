import test from 'ava';

test("Hellow world! from frontend", t => {
    t.pass();
});

test('button click calls myMethod', async t => {
    const wrapper = shallowMount(MyComponent);
    const button = wrapper.find('button');
    await button.trigger('click');
    t.true(wrapper.vm.myMethod.calledOnce);
});

          