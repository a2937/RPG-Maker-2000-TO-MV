import fs from 'fs';
import { assert } from 'chai';
import { updateTroops } from '../src/2003-to-mv/updateTroops.mjs';
import { Troop } from '../types/troop.js';

const fixtureData = fs.readFileSync('./fixtures/RPG_RT.edb', 'utf-8');
const fixtureTroops = JSON.parse(await updateTroops(fixtureData));

const standardData = fs.readFileSync('./standards/Troops.json', 'utf-8');
const standardTroops: Troop[] = JSON.parse(standardData);


describe('Troop Conversion: Array', function () {
  it('First element is null', function () {
    assert.isNull(fixtureTroops[0]);
  });
  it('Second element exists', function () {
    assert.isNotNull(fixtureTroops[1]);
  });
  it('Has a length of 89', function () {
    assert.strictEqual(fixtureTroops.length, 89);
  });
});

describe('Troop Conversion: Content', function () {
  it('First Troop has an id of 1', function () {
    assert.strictEqual(fixtureTroops[1].id, 1);
  });
  it('First Troop has a name of "Grassland 1"', function () {
    assert.strictEqual(fixtureTroops[1].name, "Grassland 1");
  });
   it('First Troop has five members', function () {
     assert.strictEqual(fixtureTroops[1].members.length, 5);
   });
   it('Has all defined properties', function (done) {
     const firstTroop = standardTroops[1];
     const troopKeys = Object.keys(firstTroop);
     for (let i = 0; i < troopKeys.length; i++) {
       assert.isDefined(
         fixtureTroops[1][troopKeys[i]],
         troopKeys[i] + ' is not defined on the first troop'
       );
     }
     done();
   });
});

describe("Troop Conversion: First Troop members", function () {
  it('First Troop member has an enemy id of 1', function () {
    assert.strictEqual(fixtureTroops[1].members[0].enemyId, 1);
  });
  it('First Troop member has an x value of 124', function () {
    assert.strictEqual(fixtureTroops[1].members[0].x, 124);
  });
  it('First Troop member has an y value of 88', function () {
    assert.strictEqual(fixtureTroops[1].members[0].y, 88);
  });
  it('First Troop member has an value of hidden set to false', function () {
    assert.isFalse(fixtureTroops[1].members[0].hidden);
  });
  it('Second Troop member has an enemy id of 1', function () {
    assert.strictEqual(fixtureTroops[1].members[1].enemyId, 1);
  });
  it('Second Troop member has an x value of 148', function () {
    assert.strictEqual(fixtureTroops[1].members[1].x, 148);
  });
  it('Second Troop member has an y value of 120', function () {
    assert.strictEqual(fixtureTroops[1].members[1].y, 120);
  });
  it('Second Troop member has an value of hidden set to false', function () {
    assert.isFalse(fixtureTroops[1].members[1].hidden);
  });
  it('Third Troop member has an enemy id of 1', function () {
    assert.strictEqual(fixtureTroops[1].members[2].enemyId, 1);
  });
  it('Third Troop member has an x value of 80', function () {
    assert.strictEqual(fixtureTroops[1].members[2].x, 80);
  });
  it('Third Troop member has an y value of 124', function () {
    assert.strictEqual(fixtureTroops[1].members[2].y, 124);
  });
  it('Third Troop member has an value of hidden set to false', function () {
    assert.isFalse(fixtureTroops[1].members[2].hidden);
  });
  it('Fourth Troop member has an enemy id of 9', function () {
    assert.strictEqual(fixtureTroops[1].members[3].enemyId, 9);
  });
  it('Fourth Troop member has an x value of 60', function () {
    assert.strictEqual(fixtureTroops[1].members[3].x, 60);
  });
  it('Fourth Troop member has an y value of 60', function () {
    assert.strictEqual(fixtureTroops[1].members[3].y, 60);
  });
  it('Fourth Troop member has an value of hidden set to false', function () {
    assert.isFalse(fixtureTroops[1].members[3].hidden);
  });
  it('Fifth Troop member has an enemy id of 9', function () {
    assert.strictEqual(fixtureTroops[1].members[4].enemyId, 9);
  });
  it('Fifth Troop member has an x value of 28', function () {
    assert.strictEqual(fixtureTroops[1].members[4].x, 28);
  });
  it('Fifth Troop member has an y value of 104', function () {
    assert.strictEqual(fixtureTroops[1].members[4].y, 104);
  });
  it('Fifth Troop member has an value of hidden set to false', function () {
    assert.isFalse(fixtureTroops[1].members[4].hidden);
  });
});