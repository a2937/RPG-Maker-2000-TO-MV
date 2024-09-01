import fs from 'fs';
import { assert } from 'chai';
import { updateStates } from '../src/2003-to-mv/updateStates.mjs';
import { State } from '../types/state.js';

const fixtureData = fs.readFileSync('./fixtures/RPG_RT.edb', 'utf-8');
const fixtureStates = JSON.parse(await updateStates(fixtureData));

const standardData = fs.readFileSync('./standards/States.json', 'utf-8');
const standardStates: State[] = JSON.parse(standardData);



describe('State Conversion: Array', function () {
  it('First element is null', function () {
    assert.isNull(fixtureStates[0]);
  });
  it('Second element exists', function () {
    assert.isNotNull(fixtureStates[1]);
  });
  it('Has a length of eleven', function () {
    assert.strictEqual(fixtureStates.length,11);
  });
});

describe('State Conversion: Content', function () {
  it('First State has an id of 1', function () {
    assert.strictEqual(fixtureStates[1].id, 1);
  });
  it('First State has a name of "Death"', function () {
    assert.strictEqual(fixtureStates[1].name, 'Death');
  });
  it('First State has a message one of " has fallen!"', function () {
    assert.strictEqual(fixtureStates[1].message1, ' has fallen!');
  });
  it('First State has a message two of " is slain!"', function () {
    assert.strictEqual(fixtureStates[1].message2, ' is slain!');
  });
  it('First State has an empty message three', function () {
    assert.isEmpty(fixtureStates[1].message3.trim());
  });
  it('First State has an message four of " revives!"', function () {
    assert.strictEqual(fixtureStates[1].message4, ' revives!');
  });
  it('Has all defined properties', function (done) {
    const firstState = standardStates[1];
    const stateKeys = Object.keys(firstState);
    for (let i = 0; i < stateKeys.length; i++) {
      assert.isDefined(
        fixtureStates[1][stateKeys[i]],
        stateKeys[i] + ' is not defined on the first state'
      );
    }
    done();
  });
});