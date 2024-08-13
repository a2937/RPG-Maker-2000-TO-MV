
import { convertableToString, parseStringPromise } from 'xml2js';
import { DBTileset} from '../types/dbTileset.js';
import { Tileset } from '../types/tileset.js';

/**
 * @param {Tileset[]} tilesets
 * @param {number} i
 * @param {DBTileset} dbTileset
 */
function readTilesetData(tilesets: Tileset[], i: number, dbTileset: DBTileset) {
   if (tilesets[i + 1] == null) {
     tilesets[i + 1] = {} as Tileset;
     tilesets[i + 1].tilesetNames = [];
     tilesets[i + 1].flags = []; 
  }
  tilesets[i + 1].id = i + 1;
  tilesets[i + 1].name = dbTileset.name[0]; 
  tilesets[i + 1].tilesetNames.push(dbTileset.chipset_name[0]); 

  tilesets[i + 1].note = ""; 
  tilesets[i + 1].flags.push(...dbTileset.terrain_data[0].split(" ").map(Number));
  tilesets[i + 1].flags.push(
    ...dbTileset.passable_data_lower[0].split(' ').map(Number)
  );
   tilesets[i + 1].flags.push(
     ...dbTileset.passable_data_upper[0].split(' ').map(Number)
  );
  tilesets[i + 1].mode = parseInt(dbTileset.animation_type) ; 
}


/**
 * @param {String} oldDatabaseXml
 */
export async function updateTilesets(
  oldDatabaseXml: string | convertableToString
) {
  try {
    const result = await parseStringPromise(oldDatabaseXml);
    const database = result.LDB.Database[0];

    const tilesets: Tileset[] = [];
    database.chipsets[0].Chipset.forEach(
      (Tileset: DBTileset, /** @type {number} */ i: number) => {
        readTilesetData(tilesets, i, Tileset);
      }
    );

    return JSON.stringify(tilesets);
  } catch (err) {
    console.error(err);
    throw err;
  }
}