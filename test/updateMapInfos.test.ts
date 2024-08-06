import fs from 'fs';
import { assert } from 'chai';
import { updateMapInfos } from '../src/updateMapInfos.mjs';
import { MapInfo } from '../types/mapInfo.js';

const fixtureData = fs.readFileSync('./fixtures/RPG_RT.emt', 'utf-8');
const fixtureMapInfo = JSON.parse(await updateMapInfos(fixtureData));

const standardData = fs.readFileSync('./standards/MapInfos.json', 'utf-8');
const standardMapInfo: MapInfo[] = JSON.parse(standardData);




describe('Map Info Conversion: Array', function () {
  it('First element is null', function () {
    assert.isNull(fixtureMapInfo[0]);
  });
  it('Second element exists', function () {
    assert.isNotNull(fixtureMapInfo[1]);
  });
  it('Has a length of five', function () {
    assert.strictEqual(fixtureMapInfo.length, 5);
  });
});

describe("Map Info data conversion", function () {
  it('First Map Info has an id of 1', function () {
    assert.strictEqual(fixtureMapInfo[1].id, 1);
  });
  it('First Map Info has a name of "Picture Tutorial"', function () {
    assert.strictEqual(fixtureMapInfo[1].name, 'Picture Tutorial');
  });
   it('First Map Info is expanded', function () {
     assert.isTrue(fixtureMapInfo[1].expanded); 
   });
   it('First Map Info is ordered as the first map', function () {
     assert.strictEqual(fixtureMapInfo[1].order,1);
   });
  it('Second Map Info has an id of 2', function () {
    assert.strictEqual(fixtureMapInfo[2].id, 2);
  });
  it('Second Map Info has map 4', function () {
    assert.strictEqual(fixtureMapInfo[2].order, 4);
  });
   it('Third Map Info has an id of 3', function () {
     assert.strictEqual(fixtureMapInfo[3].order, 3);
   });
  it('Third Map Info has map 3', function () {
    assert.strictEqual(fixtureMapInfo[3].order, 3);
  });
  it('Fourth Map Info has an id of 4', function () {
    assert.strictEqual(fixtureMapInfo[4].id,4 );
  });
  it('Fourth Map Info has map 2', function () {
    assert.strictEqual(fixtureMapInfo[4].order, 2);
  });
  it('Has all defined properties', function (done) {
    const firstMapInfo = standardMapInfo[1];
    const mapKeys = Object.keys(firstMapInfo);
    for (let i = 0; i < mapKeys.length; i++) {
      assert.isDefined(
        fixtureMapInfo[1][mapKeys[i]],
        mapKeys[i] + ' is not defined on the first map info'
      );
    }
    done();
  });
});