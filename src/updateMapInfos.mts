import { convertableToString, parseStringPromise } from 'xml2js';
import { MapInfo } from '../types/mapInfo.js';
import { DBMapInfo } from '../types/dbMapInfos.js';

function readMapInfoData(mapInfos: MapInfo[], i: number, dbMapInfo: DBMapInfo,mapOrder : string[]) {
  if (mapInfos[i + 1] == null) {
    mapInfos[i + 1] = {} as MapInfo;
  }
  mapInfos[i + 1].id = i + 1;
  mapInfos[i + 1].name = dbMapInfo.name[0]; 
  mapInfos[i + 1].parentId = parseInt(dbMapInfo.parent_map); 
  mapInfos[i + 1].expanded = dbMapInfo.expanded_node[0] === "T"; 
  mapInfos[i + 1].scrollX = parseInt(dbMapInfo.scrollbar_x); 
  mapInfos[i + 1].scrollY = parseInt(dbMapInfo.scrollbar_y); 
  mapInfos[i + 1].order = parseInt(mapOrder[i]); 
}



/**
 * @param {String} oldDatabaseXml
 */
export async function updateMapInfos(
  oldDatabaseXml: string | convertableToString
) {
  try {
    const result = await parseStringPromise(oldDatabaseXml);
    const database = result.LMT.TreeMap[0];
    const mapOrder = database.tree_order[0].trim().split(' ');
    mapOrder.shift();// NOTE: Map 000 doesn't count
    const mapInfos: MapInfo[] = [];
    const oldMapData = database.maps[0].MapInfo;
    oldMapData.shift()  /// Map000 is the title 
    oldMapData.forEach(
      (MapInfo: DBMapInfo, /** @type {number} */ i: number) => {
        readMapInfoData(mapInfos, i, MapInfo, mapOrder);
      }
    );

    return JSON.stringify(mapInfos);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
