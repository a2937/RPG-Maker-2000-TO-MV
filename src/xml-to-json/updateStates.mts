import { convertableToString, parseStringPromise } from 'xml2js';
import { DBState } from '../../types/dbState.js';
import { State } from '../../types/state.js';

/**
 * @param {State[]} states
 * @param {number} i
 * @param {DBState} dbState
 */
function readStateData(states: State[], i: number, dbState: DBState)
{
  if (states[i + 1] == null) {
    states[i + 1] = {} as State;
  }
  states[i + 1].id = i + 1;
  states[i + 1].name = dbState.name[0];
  states[i + 1].releaseByDamage = dbState.release_by_damage == "0";


  states[i + 1].message1 = dbState.message_actor[0]; 
  states[i + 1].message2 = dbState.message_enemy[0]; 
  states[i + 1].message3 = dbState.message_already[0]; 
  states[i + 1].message4 = dbState.message_recovery[0]; 
  states[i + 1].overlay = parseInt(dbState.color); 
  states[i + 1].priority = parseInt(dbState.priority); 

  states[i + 1].autoRemovalTiming = parseInt(dbState.auto_release_prob); 

  states[i + 1].restriction = parseInt(dbState.restriction); 
  states[i + 1].note = ""; 
 
  // TODO: do more research and fix 

  states[i + 1].chanceByDamage = 0; 
  states[i + 1].iconIndex = 0; 
  states[i + 1].minTurns = 1; 
  states[i + 1].maxTurns = 5; 
  states[i + 1].motion = 0;
  states[i + 1].removeAtBattleEnd = true;
  states[i + 1].removeByDamage = dbState.release_by_damage == '0';
  states[i + 1].removeByRestriction = false;
  states[i + 1].removeByWalking = false;
  states[i + 1].stepsToRemove = 50; 

  // TODO: Fill out traits
  states[i + 1].traits = []; 

 
}


/**
 * @param {String} oldDatabaseXml
 */
export async function updateStates(
  oldDatabaseXml: string | convertableToString
) {
  try {
    const result = await parseStringPromise(oldDatabaseXml);
    const database = result.LDB.Database[0];

    const states: State[] = [];
    database.states[0].State.forEach(
      (State: DBState, /** @type {number} */ i: number) => {
        readStateData(states, i, State);
      }
    );
    return JSON.stringify(states);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
