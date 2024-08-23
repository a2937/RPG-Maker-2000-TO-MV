import path from 'path';
import { updateActors } from './updateActors.mjs';
import { updateClasses } from './updateClasses.mjs';
import { updateCommonEvents } from './updateCommonEvents.mjs';
import { updateSkills } from './updateSkills.mjs';
import fs from 'fs/promises';
import { Command } from 'commander';
import { PathLike } from 'fs';
import { updateEnemies } from './updateEnemies.mjs';
import { updateTroops } from './updateTroops.mjs';
import { updateStates } from './updateStates.mjs';
import { updateMapInfos } from './updateMapInfos.mjs';
import { updateMap } from './updateMaps.mjs';
import { updateTilesets} from './updateTilesets.mjs';
import { updateSystem } from './updateSystem.mjs';

const program = new Command();

program
  .option('-o, --old-path <path>', 'path to old database directory')
  .option('-n, --new-path <path>', 'path to new database directory');

program.parse(process.argv);

const options = program.opts();

const oldPath = options.oldPath ? path.resolve(options.oldPath) : 'fixtures';

const newPath = options.newPath ? path.resolve(options.newPath) : 'output';

const oldDatabasePath = path.join(oldPath, 'RPG_RT.edb');
const oldMapTreePath = path.join(oldPath, 'RPG_RT.emt');
const actorsPath = path.join(newPath, 'Actors.json');
const classesPath = path.join(newPath, 'Classes.json');
const commonEventsPath = path.join(newPath, 'CommonEvents.json');
const skillsPath = path.join(newPath, 'Skills.json');
const enemiesPath = path.join(newPath, 'Enemies.json');
const troopsPath = path.join(newPath, 'Troops.json');
const statesPath = path.join(newPath, 'States.json');
const mapInfosPath = path.join(newPath, 'MapInfos.json');
const tilesetsPath = path.join(newPath, 'Tilesets.json');
const systemPath = path.join(newPath, 'System.json');

const mapPattern = /^Map(\d{4})\.emu$/;


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

async function main() {
  try {
    const oldDBExists = await exists(oldDatabasePath); 
    const oldMapTreeExists = await exists(oldMapTreePath);
    const newPathExists = await exists(newPath); 
    if (oldDBExists  && oldMapTreeExists) {
      if (!newPathExists) {
        await fs.mkdir(newPath, { recursive: true });
      }
      console.log('Updating actors');
      const oldDatabaseXml = await fs.readFile(oldDatabasePath, 'utf-8');
      const oldMapTreeXML = await fs.readFile(oldMapTreePath, 'utf-8');
      const updatedActorsJson = await updateActors(oldDatabaseXml);
      await fs.writeFile(actorsPath, updatedActorsJson, { encoding: 'utf-8' });
      console.log('Wrote: ' + actorsPath);

      console.log('Updating classes');
      const updatedClassesJson = await updateClasses(oldDatabaseXml);
      await fs.writeFile(classesPath, updatedClassesJson, {
        encoding: 'utf-8'
      });
      console.log('Wrote: ' + classesPath);
      

      console.log('Updating skills');
      const updatedSkillsJson = await updateSkills(oldDatabaseXml);
      await fs.writeFile(skillsPath, updatedSkillsJson, { encoding: 'utf-8' });
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
       const updatedTilesetJson = await updateTilesets(oldMapTreeXML);
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
      const matchedFiles = files.filter((file) => mapPattern.test(file));

      matchedFiles.forEach(async (file) => {
        const filePath = path.join(oldPath, file);
        console.log('Reading file:', filePath);
        const mapData = await fs.readFile(filePath, 'utf-8');
        const match = file.match(mapPattern);
        if (match) {
          const number = parseInt(match[1]);
          const newMapData = await updateMap(mapData, oldMapTreeXML, number);
          const newMapPath = path.join(newPath, "Map" + number.toString().padStart(3, "0") + ".json"); 
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
      const updatedSystemJson = await updateSystem(oldDatabaseXml, oldMapTreeXML);
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

main();

