import fs from 'fs';
import { assert } from 'chai';
import { Enemy } from '../types/enemy.js';
import { updateEnemies } from '../src/updateEnemies.js';

const fixtureData = fs.readFileSync('./fixtures/RPG_RT.edb', 'utf-8');
const fixtureEnemies = JSON.parse(await updateEnemies(fixtureData));

const standardData = fs.readFileSync('./standards/Enemies.json', 'utf-8');
const standardEnemies: Enemy[] = JSON.parse(standardData);




describe('Enemy Conversion: Array', function () {
  it('First element is null', function () {
    assert.isNull(fixtureEnemies[0]);
  });
  it('Second element exists', function () {
    assert.isNotNull(fixtureEnemies[1]);
  });
  it('Has a length of 116', function () {
    assert.strictEqual(fixtureEnemies.length, 116);
  });
});


describe('Enemy Conversion: Content', function () {
  it('First Enemy has an id of 1', function () {
    assert.strictEqual(fixtureEnemies[1].id, 1);
  });
  it('First Enemy has a name of "Slime"', function () {
    assert.strictEqual(fixtureEnemies[1].name, "Slime");
  });
  it('First Enemy has a battler name of "Slime"', function () {
    assert.strictEqual(fixtureEnemies[1].battlerName, 'Slime');
  });
  it('First Enemy has a battler hue of 0', function () {
    assert.strictEqual(fixtureEnemies[1].battlerHue, 0);
  });
  it('First Enemy drops 5 gold', function () {
    assert.strictEqual(fixtureEnemies[1].gold, 5);
  });
  it('First Enemy is worth 28 exp', function () {
    assert.strictEqual(fixtureEnemies[1].exp, 28);
  });
  it('First Enemy is worth 26 max hp as a parameter', function () {
    assert.strictEqual(fixtureEnemies[1].params[0], 26);
  });
  it('Has all defined properties', function (done) {
    const firstEnemy = standardEnemies[1];
    const EnemyKeys = Object.keys(firstEnemy);
    for (let i = 0; i < EnemyKeys.length; i++) {
      assert.isDefined(
        fixtureEnemies[1][EnemyKeys[i]],
        EnemyKeys[i] + ' is not defined on the first Enemy'
      );
    }
    done();
  });
});
