import fs from 'fs';
import { assert } from 'chai';
import { updateSystem } from '../src/2003-to-mv/updateSystem.mjs';
import { System } from '../types/system.js';

const fixtureDatabase = fs.readFileSync('./fixtures/RPG_RT.edb', 'utf-8');
const fixtureTreeMap = fs.readFileSync('./fixtures/RPG_RT.emt', 'utf-8');

const fixtureSystem = JSON.parse(
  await updateSystem(fixtureDatabase, fixtureTreeMap)
);

const standardData = fs.readFileSync('./standards/System.json', 'utf-8');
const standardSystem: System = JSON.parse(standardData);


describe('System Conversion: Content', function () {
  it("The starting map is set to 2", function () {
    assert.strictEqual(fixtureSystem.startMapId, 2);
  });
  it('The starting x is set to 10', function () {
    assert.strictEqual(fixtureSystem.startX, 10);
  });
  it('The starting y is set to 6', function () {
    assert.strictEqual(fixtureSystem.startY, 6);
  });
  it('Has all defined properties', function (done) {
    const systemKeys = Object.keys(standardSystem);
    for (let i = 0; i < systemKeys.length; i++) {
      assert.isDefined(
        fixtureSystem[systemKeys[i]],
        systemKeys[i] + ' is not defined on the system object'
      );
    }
    done();
  });
});
