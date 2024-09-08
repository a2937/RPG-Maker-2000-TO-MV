import path from 'path';
import { updateActors } from './2003-to-mv/updateActors.mjs';
import { updateClasses } from './2003-to-mv/updateClasses.mjs';
import { updateCommonEvents } from './2003-to-mv/updateCommonEvents.mjs';
import { updateSkills } from './2003-to-mv/updateSkills.mjs';
import fs from 'fs/promises';
import { Command } from 'commander';
import { PathLike } from 'fs';
import { updateEnemies } from './2003-to-mv/updateEnemies.mjs';
import { updateTroops } from './2003-to-mv/updateTroops.mjs';
import { updateStates } from './2003-to-mv/updateStates.mjs';
import { updateMapInfos } from './2003-to-mv/updateMapInfos.mjs';
import { updateMap } from './2003-to-mv/updateMaps.mjs';
import { updateTilesets} from './2003-to-mv/updateTilesets.mjs';
import { updateSystem } from './2003-to-mv/updateSystem.mjs';

import { buildMapTree } from './mv-to-2003/restore_map_tree.mjs';

import { parse } from 'js2xmlparser';
import { buildMap } from './mv-to-2003/restore_map.mjs';
import { buildDatabase } from './mv-to-2003/restore_database.mjs';


const program = new Command();

program
  .option('-o, --old-path <path>', 'path to old database directory')
  .option('-n, --new-path <path>', 'path to new database directory')
  .option('-r, --reverse', 'reverses the default behavior and loads MV data into 2003');

program.parse(process.argv);

const options = program.opts();

let oldPath = options.oldPath ? path.resolve(options.oldPath) : 'fixtures';

let mvPath = options.newPath ? path.resolve(options.newPath) : 'output';

if (options.reverse)
{
  oldPath = options.newPath ? path.resolve(options.newPath) : 'output';

  mvPath = options.oldPath ? path.resolve(options.oldPath) : 'standards';
}
  
  
  
const oldDatabasePath = path.join(oldPath, 'RPG_RT.edb');
const oldMapTreePath = path.join(oldPath, 'RPG_RT.emt');
const actorsPath = path.join(mvPath, 'Actors.json');
const classesPath = path.join(mvPath, 'Classes.json');
const commonEventsPath = path.join(mvPath, 'CommonEvents.json');
const skillsPath = path.join(mvPath, 'Skills.json');
const enemiesPath = path.join(mvPath, 'Enemies.json');
const troopsPath = path.join(mvPath, 'Troops.json');
const statesPath = path.join(mvPath, 'States.json');
const mapInfosPath = path.join(mvPath, 'MapInfos.json');
const tilesetsPath = path.join(mvPath, 'Tilesets.json');
const systemPath = path.join(mvPath, 'System.json');

const oldMapPattern = /^Map(\d{4})\.emu$/;
const newMapPattern = /^Map(\d{3})\.json$/;

/**
 * 
 * @param f {String | Buffer | URL}
 * @returns If the file exists
 */
async function exists(f: PathLike) {
  try {
    await fs.stat(f);
    return true;
  } catch {
    return false;
  }
}


async function load2000Data() {
  try {
    const oldDBExists = await exists(oldDatabasePath);
    const oldMapTreeExists = await exists(oldMapTreePath);
    const newPathExists = await exists(mvPath);
    if (oldDBExists && oldMapTreeExists) {
      if (!newPathExists) {
        await fs.mkdir(mvPath, { recursive: true });
      }
      console.log('Updating actors');
      const oldDatabaseXml = await fs.readFile(oldDatabasePath, 'utf-8');
      const oldMapTreeXML = await fs.readFile(oldMapTreePath, 'utf-8');
      const updatedActorsJson = await updateActors(oldDatabaseXml);
      await fs.writeFile(actorsPath, updatedActorsJson, {
        encoding: 'utf-8'
      });
      console.log('Wrote: ' + actorsPath);

      console.log('Updating classes');
      const updatedClassesJson = await updateClasses(oldDatabaseXml);
      await fs.writeFile(classesPath, updatedClassesJson, {
        encoding: 'utf-8'
      });
      console.log('Wrote: ' + classesPath);

      console.log('Updating skills');
      const updatedSkillsJson = await updateSkills(oldDatabaseXml);
      await fs.writeFile(skillsPath, updatedSkillsJson, {
        encoding: 'utf-8'
      });
      console.log('Wrote: ' + skillsPath);
      console.log('Updating enemies');
      const updatedEnemiesJson = await updateEnemies(oldDatabaseXml);
      await fs.writeFile(enemiesPath, updatedEnemiesJson, {
        encoding: 'utf-8'
      });
      console.log('Wrote: ' + enemiesPath);
      console.log('Updating troops');
      const updatedTroopsJson = await updateTroops(oldDatabaseXml);
      await fs.writeFile(troopsPath, updatedTroopsJson, {
        encoding: 'utf-8'
      });
      console.log('Wrote: ' + troopsPath);
      console.log('Updating states');
      const updatedStatesJson = await updateStates(oldDatabaseXml);
      await fs.writeFile(statesPath, updatedStatesJson, {
        encoding: 'utf-8'
      });
      console.log('Wrote: ' + statesPath);
      console.log('Updating tilesets');
      const updatedTilesetJson = await updateTilesets(oldDatabaseXml);
      await fs.writeFile(tilesetsPath, updatedTilesetJson, {
        encoding: 'utf-8'
      });
      console.log('Wrote: ' + tilesetsPath);
      console.log('Updating map infos');
      const updatedMapInfoJson = await updateMapInfos(oldMapTreeXML);
      await fs.writeFile(mapInfosPath, updatedMapInfoJson, {
        encoding: 'utf-8'
      });
      console.log('Wrote: ' + mapInfosPath);
      console.log('Updating maps');

      const files = await fs.readdir(oldPath);
      const matchedFiles = files.filter((file) => oldMapPattern.test(file));

      matchedFiles.forEach(async (file) => {
        const filePath = path.join(oldPath, file);
        console.log('Reading file:', filePath);
        const mapData = await fs.readFile(filePath, 'utf-8');
        const match = file.match(oldMapPattern);
        if (match) {
          const number = parseInt(match[1]);
          const newMapData = await updateMap(mapData, oldMapTreeXML, number);
          const newMapPath = path.join(
            mvPath,
            'Map' + number.toString().padStart(3, '0') + '.json'
          );
          await fs.writeFile(newMapPath, newMapData);
          console.log('Wrote: ' + newMapPath);
        }
      });

      console.log('Updating common events');
      const updatedCommonEventJson = await updateCommonEvents(oldDatabaseXml);
      await fs.writeFile(commonEventsPath, updatedCommonEventJson, {
        encoding: 'utf-8'
      });
      console.log('Wrote: ' + commonEventsPath);

      console.log('Updating system');
      const updatedSystemJson = await updateSystem(
        oldDatabaseXml,
        oldMapTreeXML
      );
      await fs.writeFile(systemPath, updatedSystemJson, {
        encoding: 'utf-8'
      });
      console.log('Wrote: ' + systemPath);
    } else {
      console.error(
        'Error: RPG_RT.edb or RPG_RT.emt not found. Please check the provided file path and spelling.'
      );
      process.exit(-1);
    }
  } catch (ex) {
    console.error('An unexpected error occurred.');
    console.log(ex);
  }
}

async function loadMVData()
{


  try {


    console.log("Reading Actors");
    const actorString = await fs.readFile(actorsPath,{encoding:"utf-8"});
    const actors = JSON.parse(actorString); 
    
    console.log("Restoring database"); 

    const databaseObject = buildDatabase(actors); 

    console.log('Writing database to ' + oldDatabasePath);
    const databaseXML = parse('LDB', databaseObject); 

    await fs.writeFile(oldDatabasePath, databaseXML, {
      encoding: 'utf-8'
    });


    console.log("Reading maps");
    const files = await fs.readdir(oldPath);
    const matchedFiles = files.filter((file) => newMapPattern.test(file));

    console.log("Rebuilding maps"); 
    matchedFiles.forEach(async (file) => {
      const filePath = path.join(oldPath, file);
      console.log('Reading file:', filePath);
      const mapDataString = await fs.readFile(filePath, 'utf-8');
      const mapData = JSON.parse(mapDataString); 
      const match = file.match(newMapPattern);
      if (match) {
        const number = parseInt(match[1]);
        const newMapData = buildMap(mapData);
        const newMapPath = path.join(
          oldPath,
          'Map' + number.toString().padStart(4, '0') + '.emu'
        );
        const newMapXML = parse('LMU', newMapData); 

        await fs.writeFile(newMapPath, newMapXML);
        console.log('Wrote: ' + newMapPath);
      }
    });

    console.log("Reading " + mapInfosPath);
    const mapInfosString = await fs.readFile(mapInfosPath, 'utf-8');
    const mapInfos = JSON.parse(mapInfosString); 
    console.log("Read MapInfos");

    console.log("Rebuilding Map Tree");
    const mapTreeObject = buildMapTree(mapInfos);
    const mapTreeXML = parse('LMT', mapTreeObject); 
    console.log("Writing map tree to " + oldMapTreePath); 
     await fs.writeFile(oldMapTreePath, mapTreeXML, {
       encoding: 'utf-8'
     });
    
  } catch (ex) {
     console.error('An unexpected error occurred.');
     console.log(ex);
  }
}

async function main() {

  if (!options.reverse) {
    await load2000Data();
  }
  else 
  {
    await loadMVData(); 
  }
}

main();