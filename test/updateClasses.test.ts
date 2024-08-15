import fs from 'fs';
import { assert } from 'chai';
import { Class} from '../types/class.js';
import { updateClasses } from '../src/updateClasses.mjs';

const fixtureData = fs.readFileSync('./fixtures/RPG_RT.edb', 'utf-8');
const fixtureClasses = JSON.parse(await updateClasses(fixtureData));

const standardData = fs.readFileSync('./standards/Classes.json', 'utf-8');
const standardClasses: Class[] = JSON.parse(standardData);




describe('Class Conversion: Array', function () {
  it('First element is null', function () {
    assert.isNull(fixtureClasses[0]);
  });
  it('Second element exists', function () {
    assert.isNotNull(fixtureClasses[1]);
  });
  it('Has a length of 19', function () {
    assert.strictEqual(fixtureClasses.length, 19);
  });
});


describe('Class Conversion: Content', function () {
  it('First Class has an id of 1', function () {
    assert.strictEqual(fixtureClasses[1].id, 1);
  });
  
  it('First Actor has a character name of "Hero A"', function () {
    assert.strictEqual(fixtureClasses[1].name, 'Hero A');
  });
 
  it('Has all defined properties', function (done) {
    const firstClass = standardClasses[1];
    const classKeys = Object.keys(firstClass);
    for (let i = 0; i < classKeys.length; i++) {
      assert.isDefined(
        fixtureClasses[1][classKeys[i]],
        classKeys[i] + ' is not defined on the first class'
      );
    }
    done();
  });
});
