import fs from 'fs';
import { assert } from 'chai';
import { updateActors } from '../src/2003-to-mv/updateActors.mjs';
import { Actor } from '../types/actor.js';

const fixtureData = fs.readFileSync('./fixtures/RPG_RT.edb', 'utf-8');
const fixtureActors = JSON.parse(await updateActors(fixtureData));

const standardData = fs.readFileSync('./standards/Actors.json', 'utf-8');
const standardActors: Actor[] = JSON.parse(standardData);

describe('Actor Conversion: Array', function () {
  it('First element is null', function () {
    assert.isNull(fixtureActors[0]);
  });
  it('Second element exists', function () {
    assert.isNotNull(fixtureActors[1]);
  });
  it('Has a length of two', function () {
    assert.strictEqual(fixtureActors.length, 2);
  });
});

describe('Actor Conversion: Content', function () {
  it('First Actor has an id of 1', function () {
    assert.strictEqual(fixtureActors[1].id, 1);
  });
  it('First Actor has a character index of 0', function () {
    assert.strictEqual(fixtureActors[1].characterIndex, 0);
  });
  it('First Actor has a character name of "Actor4"', function () {
    assert.strictEqual(fixtureActors[1].characterName, 'Actor4');
  });
  it('First Actor has a class id of 0', function () {
    assert.strictEqual(fixtureActors[1].classId, 0);
  });
  it('First Actor has a face index of 8', function () {
    assert.strictEqual(fixtureActors[1].faceIndex, 8);
  });
  it('First Actor has a weapon id of 17', function () {
    assert.strictEqual(fixtureActors[1].equips[0], 17);
  });
  it('First Actor has a shield id of 44', function () {
    assert.strictEqual(fixtureActors[1].equips[1], 44);
  });
  it('First Actor has a helmet id of 67', function () {
    assert.strictEqual(fixtureActors[1].equips[2], 67);
  });
  it('First Actor has a armor id of 55', function () {
    assert.strictEqual(fixtureActors[1].equips[3], 55);
  });
  it('First Actor has a accessory id of 0', function () {
    assert.strictEqual(fixtureActors[1].equips[4], 0);
  });
  it('First Actor has a face name of "Actor2"', function () {
    assert.strictEqual(fixtureActors[1].faceName, 'Actor2');
  });
  it('First Actor has a traits property defined', function () {
    assert.isDefined(fixtureActors[1].traits);
  });
  it('First Actor has an initial level of 1', function () {
    assert.strictEqual(fixtureActors[1].initialLevel, 1);
  });
  it('First Actor has an max level of 99', function () {
    assert.strictEqual(fixtureActors[1].maxLevel, 99);
  });
  it('First Actor has a name of "Brian"', function () {
    assert.strictEqual(fixtureActors[1].name, 'Brian');
  });
  it('First Actor has a nickname of "Survivor"', function () {
    assert.strictEqual(fixtureActors[1].nickname, 'Survivor');
  });
  it('Has all defined properties', function (done) {
    const firstActor = standardActors[1];
    const actorKeys = Object.keys(firstActor);
    for (let i = 0; i < actorKeys.length; i++) {
      assert.isDefined(
        fixtureActors[1][actorKeys[i]],
        actorKeys[i] + ' is not defined on the first actor'
      );
    }
    done();
  });
});
