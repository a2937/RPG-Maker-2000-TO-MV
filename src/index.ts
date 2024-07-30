import path from 'path';
import { updateActors } from './updateActors.mjs';
import { updateSkills } from './updateSkills.mjs';
import fs from 'fs/promises';
import { Command } from 'commander';
import { PathLike } from 'fs';

const program = new Command();

program
  .option('-o, --old-path <path>', 'path to old database directory')
  .option('-n, --new-path <path>', 'path to new database directory');

program.parse(process.argv);

const options = program.opts();

const oldPath = options.oldPath ? path.resolve(options.oldPath) : 'Old';

const newPath = options.newPath ? path.resolve(options.newPath) : 'New';

const oldDatabasePath = path.join(oldPath, 'RPG_RT.edb');
const actorsPath = path.join(newPath, 'Actors.json');
const skillsPath = path.join(newPath, 'Skills.json');

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
    if (await exists(oldDatabasePath)) {
      console.log('Updating actors');
      const oldDatabaseXml = await fs.readFile(oldDatabasePath,"utf-8");
      const updatedActorsJson = await updateActors(oldDatabaseXml);
      await fs.writeFile(actorsPath, updatedActorsJson, { encoding: 'utf-8' });
      console.log('Updating skills');
      const updatedSkillsJson = await updateSkills(oldDatabaseXml);
      await fs.writeFile(skillsPath, updatedSkillsJson,{encoding:"utf-8"});
    } else {
      console.error(
        'Error: RPG_RT.edb not found. Please check the provided file path and spelling.'
      );
      process.exit(-1);
    }

    // other update calls
  } catch (ex) {
    console.error('An unexpected error occurred.');
    console.log(ex);
  }
}

main();
