import { convertableToString, parseStringPromise } from 'xml2js';
import { Damage, Skill } from '../types/skill.js';
import { DBSkill } from '../types/dbSkill.js';

/**
 * @param {Skill[]} skills
 * @param {number} i
 * @param {DBSkill} dbSkill
 */
function readSkillData(
  skills: Skill[],
  i: number,
  dbSkill: DBSkill
) {
  // TODO: Learn more about how skills work

  if (skills[i + 1] == null) {
    skills[i + 1] = {} as Skill;
  }
  skills[i + 1].id = i + 1;
  skills[i + 1].animationId = parseInt(dbSkill.animation_id);
  skills[i + 1].damage = {} as Damage; 

  // Inexact matches. Need to figure out further
  skills[i + 1].damage.critical = parseInt(dbSkill.easyrpg_critical_hit_chance) > 0;  
  skills[i + 1].damage.elementId = parseInt(dbSkill.sp_type); 
    skills[i + 1].mpCost = parseInt(dbSkill.sp_cost); 

  skills[i + 1].damage.type = parseInt(dbSkill.type); 
  skills[i + 1].damage.variance = parseInt(dbSkill.variance); 
    
  skills[i + 1].name = dbSkill.name[0];
  skills[i + 1].description = dbSkill.description[0];
  skills[i + 1].message1 = dbSkill.using_message1[0];
  skills[i + 1].message2 = dbSkill.using_message2[0];
  skills[i + 1].scope = parseInt(dbSkill.scope[0]); 



  // Unable to match TODO: Analyze later 
  skills[i + 1].note = '';
  skills[i + 1].damage.formula = ""; 
  skills[i + 1].effects = [];
  skills[i + 1].speed = 0;
  skills[i + 1].successRate = 100;
  skills[i + 1].hitType = -1;
  skills[i + 1].iconIndex = -1;
  skills[i + 1].occasion = 1;
  skills[i + 1].repeats = 1;
  skills[i + 1].requiredWtypeId1 = 0;
  skills[i + 1].requiredWtypeId2 = 0;
  skills[i + 1].stypeId = 0; 
  skills[i + 1].tpCost = 0; 
  skills[i + 1].tpGain = 0;
}




/**
 * @param {String} oldDatabaseXml
 */
export async function updateSkills(oldDatabaseXml: string | convertableToString) {
 try {
   const result = await parseStringPromise(oldDatabaseXml);
   const database = result.LDB.Database[0];

   const skills: Skill[] = [];
   database.skills[0].Skill.forEach(
     (
        Skill: DBSkill ,
       /** @type {number} */ i: number
     ) => {
       readSkillData(skills, i, Skill);
     }
   );
   return JSON.stringify(skills);
 } catch (err) {
   console.error(err);
   throw err;
 }
}