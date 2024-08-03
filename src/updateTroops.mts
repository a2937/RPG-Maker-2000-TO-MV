import { convertableToString, parseStringPromise } from 'xml2js';
import {
  Conditions,
  Member,
  Members,
  Page,
  Pages,
  Troop
} from '../types/troop.js';
import {
  DBPage,
  DBTroop,
  TroopMemberElement as DBMember
} from '../types/dbTroop.js';


/**
 * @param {Troop[]} troops
 * @param {number} i
 * @param {DBTroop} dbTroop
 */
function readTroopData(troops: Troop[], i: number, dbTroop: DBTroop) {
  if (troops[i + 1] == null) {
   troops[i + 1] = { } as Troop;
  }
  troops[i + 1].id = i + 1; 
  troops[i + 1].name = dbTroop.name[0];
  troops[i + 1].members = [] as Members; 
  console.log(dbTroop.members); 
  dbTroop.members[0].TroopMember.forEach(
    (member: DBMember, memberIndex: number) => {
      if (troops[i + 1].members[memberIndex] == null) {
        troops[i + 1].members[memberIndex] = {} as Member;
      }
      troops[i + 1].members[memberIndex].enemyId = parseInt(member.enemy_id);
      troops[i + 1].members[memberIndex].x = parseInt(member.x);
      troops[i + 1].members[memberIndex].y = parseInt(member.y);
      troops[i + 1].members[memberIndex].hidden = member.invisible == 'T';
    }
  );

  dbTroop.pages.forEach((oldPage: DBPage, pageIndex: number) => {
    troops[i + 1].pages = [] as Pages;
    if (troops[i + 1].pages[pageIndex] == null) {
      troops[i + 1].pages[pageIndex] = {} as Page;
      troops[i + 1].pages[pageIndex].conditions = {} as Conditions;
    }
  
    const conditions =
      oldPage.TroopPage[0].condition[0].TroopPageCondition[0];
    
    
    troops[i + 1].pages[pageIndex].conditions.actorHp = parseInt(
      conditions.actor_hp_max 
    );


    troops[i + 1].pages[pageIndex].conditions.actorId = parseInt(conditions.turn_actor_id);

    
    troops[i + 1].pages[pageIndex].conditions.actorValid =
       conditions.flags[0].TroopPageCondition_Flags[0].turn_actor == 'T';

    troops[i + 1].pages[pageIndex].conditions.switchId = parseInt(conditions.switch_a_id[0]);
    troops[i + 1].pages[pageIndex].conditions.switchValid = conditions.flags[0].TroopPageCondition_Flags[0].switch_a[0] == 'T';
    
    troops[i + 1].pages[pageIndex].conditions.turnA = parseInt(
      conditions.turn_a
    );
    
   troops[i + 1].pages[pageIndex].conditions.turnB = parseInt(
     conditions.turn_b
   );


    
    // TODO: Add event commands
  });

 
}

/**
 * @param {String} oldDatabaseXml
 */
export async function updateTroops(oldDatabaseXml: string | convertableToString) {
   try {
     const result = await parseStringPromise(oldDatabaseXml);
     const database = result.LDB.Database[0];

     const troops: Troop[] = [];
     database.troops[0].Troop.forEach(
       (Troop: DBTroop, /** @type {number} */ i: number) => {
         readTroopData(troops, i, Troop);
       }
     );
     return JSON.stringify(troops);
   } catch (err) {
     console.error(err);
     throw err;
   }
}


