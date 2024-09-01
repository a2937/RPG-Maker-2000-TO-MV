import fs from 'fs';
import { assert } from 'chai';
import { updateMap } from '../src/2003-to-mv/updateMaps.mjs';
import { Map } from '../types/map.js';

const fixtureMapInfoData = fs.readFileSync('./fixtures/RPG_RT.emt', 'utf-8');
 
const fixtureData = fs.readFileSync('./fixtures/Map0001.emu', 'utf-8');
const fixtureMap = JSON.parse(
  await updateMap(fixtureData, fixtureMapInfoData, 1)
);

const standardData = fs.readFileSync('./standards/Map001.json', 'utf-8');
const standardMap: Map[] = JSON.parse(standardData);


describe('Map Conversion: General Map Content', function ()
{
   it('First Map has an width of "20"', function () {
     assert.strictEqual(fixtureMap.width,20);
   });
  it('First Map has an height of "15"', function () {
    assert.strictEqual(fixtureMap.height, 15);
  });
  it('First Map has an tileset of "4"', function () {
    assert.strictEqual(fixtureMap.tilesetId, 4);
  });
  it('First Map does not have an parallax name', function () {
    assert.isEmpty(fixtureMap.parallaxName);
  });
  it('First Map does not use a parallax', function () {
    assert.isFalse(fixtureMap.parallaxShow);
  });
  it('First Map has a scroll type of "0" ', function () {
    assert.strictEqual(fixtureMap.scrollType, 0);
  });
   it('First Map is not set to loop the parallax over the X axis ', function () {
     assert.isFalse(fixtureMap.parallaxLoopX);
   });
  it('First Map is not set to loop the parallax over the Y axis ', function () {
    assert.isFalse(fixtureMap.parallaxLoopY);
  });
  it('Has all defined properties', function (done) {
    const firstMap = standardMap;
    const mapKeys = Object.keys(firstMap);
    for (let i = 0; i < mapKeys.length; i++) {
      assert.isDefined(
        fixtureMap[mapKeys[i]],
        mapKeys[i] + ' is not defined on the first map'
      );
    }
    done();
  });
}); 


describe('Map Conversion: Event Content on First Map', function ()
{
  it("First event name is 'EV0001'", function ()
  {
       assert.strictEqual(fixtureMap.events[1].name, "EV0001");
  });
  it("First event X is 5", function () {
    assert.strictEqual(fixtureMap.events[1].x, 5);
  });
  it('First event Y is 5', function () {
    assert.strictEqual(fixtureMap.events[1].y, 10);
  });
  it('First event has an empty character name', function () {
   assert.isEmpty(fixtureMap.events[1].pages[0].image.characterName);
  });
  it('Fifth event has a  first page tile id of 127', function ()
  {
    assert.strictEqual(fixtureMap.events[5].pages[0].image.tileId,127);
  });
  it('Tenth event has a first page character name of "People2"', function () {
    assert.strictEqual(fixtureMap.events[10].pages[0].image.characterName, "People2");
  });
   it('Tenth event has a  first page character index of 7', function () {
     assert.strictEqual(fixtureMap.events[10].pages[0].image.characterIndex, 7);
   });
   it('Tenth event has a  first page tile id of 0', function () {
     assert.strictEqual(fixtureMap.events[10].pages[0].image.tileId,0);
   });
  it("Tenth event has a command list on the first page", function ()
  {
       assert.isNotNull(fixtureMap.events[10].pages[0].list);
  })
}); 