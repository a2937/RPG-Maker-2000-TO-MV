import fs from 'fs';
import { assert } from 'chai';
import { updateSkills } from '../src/updateSkills.js';
import { Skill } from '../types/skill.js';

const fixtureData = fs.readFileSync('./fixtures/RPG_RT.edb', 'utf-8');
const fixtureSkills  = JSON.parse(await updateSkills(fixtureData));

const standardData = fs.readFileSync('./standards/Skills.json', 'utf-8');
const standardSkills: Skill[] = JSON.parse(standardData);

  
describe('Skill Conversion: Array', function () {
  it('First element is null', function () {
    assert.isNull(fixtureSkills[0]);
  });
  it('Second element exists', function () {
    assert.isNotNull(fixtureSkills[1]);
  });
  it('Has a length of 135', function () {
    assert.strictEqual(fixtureSkills.length, 135);
  });
});


describe('Skill Conversion: Content', function () {
  it('First Skill has an id of 1', function () {
    assert.strictEqual(fixtureSkills[1].id, 1);
  });
    it('First Skill has an animation id of 56', function () {
      assert.strictEqual(fixtureSkills[1].animationId, 56);
    });
     it('First Skill has an description of "Damages and poisons an enemy"', function () {
       assert.strictEqual(
         fixtureSkills[1].description,
         'Damages and poisons an enemy'
       );
     });
    it('First Skill has an using message of "poisons"', function () {
      assert.equal(fixtureSkills[1].message1.trim(), 'poisons');
    });
    it('First Skill has an mp cost of 0', function () {
      assert.strictEqual(fixtureSkills[1].mpCost, 0);
    });
    it('Has all defined properties', function (done) {
      const firstSkill = standardSkills[1];
      const skillKeys = Object.keys(firstSkill);
      for (let i = 0; i < skillKeys.length; i++) {
        assert.isDefined(
          fixtureSkills[1][skillKeys[i]],
          skillKeys[i] + ' is not defined on the first skill'
        );
      }
      done();
    });
}); 