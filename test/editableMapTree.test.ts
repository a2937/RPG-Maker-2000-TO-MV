import fs from 'fs';

import { buildMapTree } from '../src/mv-to-2003/restore_map_tree.mjs';

import { assert } from 'chai';

const fixtureMapInfo = fs.readFileSync('./standards/MapInfos.json', 'utf-8');

const mapInfoObject = JSON.parse(fixtureMapInfo); 

const newMapTree = buildMapTree(mapInfoObject);

describe('Editable Map Tree: Structure', function () {
  it("Has an inner object called 'Tree Map'", function () {
    assert.exists(newMapTree.TreeMap);
  });
  it("There are two maps in 'MapInfo'", function ()
  {
    assert.lengthOf(newMapTree.TreeMap.maps.MapInfo, 2);
  });
});

describe("Editable Map Tree: Main Content", function () {
  it("Has a 'tree_order' of '0 1'", function () {
    assert.strictEqual(newMapTree.TreeMap.tree_order, "0 1");
  });
});

describe('Editable Map Tree: Map Info Content', function () {
  it("The Second Map Info has a name of 'MAP001'", function () {
    assert.strictEqual(newMapTree.TreeMap.maps.MapInfo[1].name, "MAP001"); 
  });
  it("The Second Map Info has a parent map of '0'", function () {
    assert.strictEqual(newMapTree.TreeMap.maps.MapInfo[1].parent_map, 0);
  });
});
