import fs from 'fs';
import { assert } from 'chai';
import { updateTilesets } from '../src/2003-to-mv/updateTilesets.mjs';
import { Tileset} from '../types/tileset.js';


const fixtureData = fs.readFileSync('./fixtures/RPG_RT.edb', 'utf-8');
const fixtureTilesets = JSON.parse(await updateTilesets(fixtureData));

const standardData = fs.readFileSync('./standards/Tilesets.json', 'utf-8');
const standardTilesets: Tileset[] = JSON.parse(standardData);

describe('Tileset Conversion: Array', function () {
  it('First element is null', function () {
    assert.isNull(fixtureTilesets[0]);
  });
  it('Second element exists', function () {
    assert.isNotNull(fixtureTilesets[1]);
  });
  it('Has a length of six', function () {
    assert.strictEqual(fixtureTilesets.length, 6);
  });
});


describe('Tileset Conversion: Content', function () {
  it('First Tileset has an id of 1', function () {
    assert.strictEqual(fixtureTilesets[1].id, 1);
  });
  it('First Tileset has an array of lengths that is not empty', function () {
    assert.isNotEmpty(fixtureTilesets[1].flags); 
  });
  it('First Tileset has a name of "Basic"', function () {
      assert.strictEqual(fixtureTilesets[1].name, "Basic");
  });
  it('First Tileset has the "World" tileset image in the `tilesetNames` array ', function () {
    assert.include(fixtureTilesets[1].tilesetNames,"World");
  });
  it('Has all defined properties', function (done) {
    const firstActor = standardTilesets[1];
    const tilesetKeys = Object.keys(firstActor);
    for (let i = 0; i < tilesetKeys.length; i++) {
      assert.isDefined(
        fixtureTilesets[1][tilesetKeys[i]],
        tilesetKeys[i] + ' is not defined on the first tileset'
      );
    }
    done();
  });
});
