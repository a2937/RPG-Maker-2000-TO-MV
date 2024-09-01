import { convertableToString, parseStringPromise } from 'xml2js';
import { DBClass } from '../../types/dbClass.js';
import { Class } from '../../types/class.js';



/**
 * @param {Class[]} classes
 * @param {number} i
 * @param {DBClass} dbClass
 */
function readClassData(classes: Class[], i: number, dbClass: DBClass) {
  if (classes[i + 1] == null) {
    classes[i + 1] = {} as Class;
    classes[i + 1].learnings = []; 
    classes[i + 1].params = [];
    classes[i + 1].expParams = [];
  }
  classes[i + 1].id = i + 1;
  classes[i + 1].name = dbClass.name[0];

  classes[i + 1].expParams.push(parseInt(dbClass.exp_base));
  classes[i + 1].expParams.push(parseInt(dbClass.exp_inflation));
  classes[i + 1].expParams.push(parseInt(dbClass.exp_correction)); 
  if (dbClass.skills.length == 0) {
    dbClass.skills[0].Learning.forEach(learn => {
      const newLearning = { level: parseInt(learn.level), note: "", skillId: parseInt(learn.skill_id) };
      classes[i + 1].learnings.push(newLearning);
    }
    );
  }

  classes[i + 1].params.push(dbClass.parameters[0].Parameters[0].maxhp[0]
    .split(' ')
    .map(Number));
  
    classes[i + 1].params.push(
      dbClass.parameters[0].Parameters[0].maxsp[0].split(' ').map(Number)
    );
  
  classes[i + 1].params.push(
    dbClass.parameters[0].Parameters[0].attack[0].split(' ').map(Number)
  );

   classes[i + 1].params.push(
     dbClass.parameters[0].Parameters[0].defense[0].split(' ').map(Number)
   );
  
   classes[i + 1].params.push(
     dbClass.parameters[0].Parameters[0].spirit[0].split(' ').map(Number)
   );
  
  classes[i + 1].params.push(
    dbClass.parameters[0].Parameters[0].agility[0].split(' ').map(Number)
  );


  classes[i + 1].note = ""; 

  // TODO: research traits later 
  classes[i + 1].traits = []; 
}



/**
 * @param {String} oldDatabaseXml
 */
export async function updateClasses(
  oldDatabaseXml: string | convertableToString
) {
  try {
    const result = await parseStringPromise(oldDatabaseXml);
    const database = result.LDB.Database[0];

    const classes: Class[] = [];
    database.classes[0].Class.forEach(
      (Class: DBClass, /** @type {number} */ i: number) => {
        readClassData(classes, i, Class);
      }
    );
    
    return JSON.stringify(classes);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
