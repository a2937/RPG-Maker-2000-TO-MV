import fs from 'fs';
import { assert } from 'chai';
import { updateItems } from '../src/2003-to-mv/updateItems.mjs';
import { Item } from '../types/item.js';

const fixtureData = fs.readFileSync('./fixtures/RPG_RT.edb', 'utf-8');
const fixtureItems = JSON.parse(await updateItems(fixtureData));

const standardData = fs.readFileSync('./standards/Items.json', 'utf-8');
const standardItems: Item[] = JSON.parse(standardData);

describe('Item Conversion: Array', function () {
  it('First element is null', function () {
    assert.isNull(fixtureItems[0]);
  });
  it('Second element exists', function () {
    assert.isNotNull(fixtureItems[1]);
  });
  it('Has a length of 85', function () {
    assert.strictEqual(fixtureItems.length, 85);
  });
});

describe('Item Conversion: Content', function () {
  it('First Item has an id of 1', function () {
    assert.strictEqual(fixtureItems[1].id, 1);
  });
  it('First Item has an name of "Potion"', function () {
    assert.strictEqual(fixtureItems[1].name, 'Potion');
  });
  it('First Item has an description of "Recovers 50 HP"', function () {
    assert.strictEqual(fixtureItems[1].description, 'Recovers 50 HP');
  });
  it('First Item is consumable', function () {
    assert.isTrue(fixtureItems[1].consumable);
  });
  it('First Item is priced at 40', function () {
    assert.strictEqual(fixtureItems[1].price, 40);
  });
  it('First Item can only be used once', function () {
    assert.strictEqual(fixtureItems[1].repeats, 1);
  });
  it('Has all defined properties', function (done) {
    const firstItem = standardItems[1];
    const itemKeys = Object.keys(firstItem);
    for (let i = 0; i < itemKeys.length; i++) {
      assert.isDefined(
        fixtureItems[1][itemKeys[i]],
        itemKeys[i] + ' is not defined on the first item'
      );
    }
    done();
  });
});
