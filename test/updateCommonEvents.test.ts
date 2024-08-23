import fs from 'fs';
import { assert } from 'chai';
import { updateCommonEvents } from '../src/updateCommonEvents.mjs';
import { CommonEvent } from '../types/commonEvent.js';

const fixtureData = fs.readFileSync('./fixtures/RPG_RT.edb', 'utf-8');
const fixtureCommonEvents = JSON.parse(await updateCommonEvents(fixtureData));

const standardData = fs.readFileSync('./standards/CommonEvents.json', 'utf-8');
const standardCommonEvents: CommonEvent[] = JSON.parse(standardData);



describe('Common Event Conversion: Array', function () {
  it('First element is null', function () {
    assert.isNull(fixtureCommonEvents[0]);
  });
  it('Second element exists', function () {
    assert.isNotNull(fixtureCommonEvents[1]);
  });
  it('Has a length of twenty-one', function () {
    assert.lengthOf(fixtureCommonEvents, 21);
  });
});


describe('Common Event Conversion: Content', function () {
  it('First Common Event has an id of 1', function () {
    assert.strictEqual(fixtureCommonEvents[1].id, 1);
  });
  it('Twentieth Common Event has a name of "Show Picture Input"', function () {
    assert.strictEqual(fixtureCommonEvents[20].name, 'Show Picture Input');
  });
  it('Twentieth Common Event has a switch id of 1', function () {
    assert.strictEqual(fixtureCommonEvents[20].switchId, 1);
  });
   it('Twentieth Common Event has a trigger  of 5', function () {
     assert.strictEqual(fixtureCommonEvents[20].trigger,5);
   });
  it('Has all defined properties', function (done) {
    const firstCommonEvent = standardCommonEvents[1];
    const CommonEventKeys = Object.keys(firstCommonEvent);
    for (let i = 0; i < CommonEventKeys.length; i++) {
      assert.isDefined(
        fixtureCommonEvents[1][CommonEventKeys[i]],
        CommonEventKeys[i] + ' is not defined on the first Common Event'
      );
    }
    done();
  });
});
