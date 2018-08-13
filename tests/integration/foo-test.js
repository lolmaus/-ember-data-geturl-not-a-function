import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';

module('save foo', function(hooks) {
  setupTest(hooks);

  let store;
  let foo;
  let bar;
  let baz;

  hooks.beforeEach(function() {
    store = this.owner.lookup('service:store');

    run(() => {
      store.pushPayload({
        foos: [
          {
            id: 1,
            name: 'Foo 1',
            bar: 1,
            baz: 1
          }
        ],
        bars: [
          {
            id: 1,
            name: 'Bar 1'
          }
        ],
        bazs: [
          {
            id: 1,
            name: 'Baz 1'
          }
        ]
      });
    });

    foo = store.peekRecord('foo', 1);
    bar = store.peekRecord('bar', 1);
    baz = store.peekRecord('baz', 1);

    console.log('foo', foo.serialize());
    console.log('bar', bar.serialize());
    console.log('baz', baz.serialize());
  });

  test('stuff', async function(assert) {
    const _bar = await foo.get('bar')
    assert.equal(_bar, bar, "foo.bar should contain bar");

    const _baz = await foo.get('baz')
    assert.equal(_baz, baz, "foo.baz should contain baz");
  });
});
