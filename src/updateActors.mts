import { convertableToString, parseStringPromise } from 'xml2js';
import { DBActor } from '../types/dbActor.js';
import { Actor } from '../types/actor.js';

/**
 * @param {Actor[]} actors
 * @param {number} i
 * @param {DBActor} dbActor
 */
function readActorData(actors: Actor[], i: number, dbActor: DBActor) {
  if (actors[i + 1] == null) {
    actors[i + 1] = {} as Actor;
    actors[i + 1].equips = [];
  }

  actors[i + 1].id = i + 1;
  actors[i + 1].name = dbActor.name[0];
  actors[i + 1].nickname = dbActor.title[0];
  actors[i + 1].characterName = dbActor.character_name[0];
  actors[i + 1].characterIndex = parseInt(dbActor.character_index);
  actors[i + 1].faceName = dbActor.face_name[0];
  actors[i + 1].faceIndex = parseInt(dbActor.face_index);
  actors[i + 1].initialLevel = parseInt(dbActor.initial_level);
  actors[i + 1].maxLevel = parseInt(dbActor.final_level);
  actors[i + 1].classId = parseInt(dbActor.class_id);

  actors[i + 1].equips[0] = parseInt(
    dbActor.initial_equipment[0].Equipment[0].weapon_id
  );
  actors[i + 1].equips[1] = parseInt(
    dbActor.initial_equipment[0].Equipment[0].shield_id
  );
  actors[i + 1].equips[2] = parseInt(
    dbActor.initial_equipment[0].Equipment[0].helmet_id
  );
  actors[i + 1].equips[3] = parseInt(
    dbActor.initial_equipment[0].Equipment[0].armor_id
  );
  actors[i + 1].equips[4] = parseInt(
    dbActor.initial_equipment[0].Equipment[0].accessory_id
  );

  // Unable to match: TODO: Research further
  actors[i + 1].battlerName = '';
  actors[i + 1].note = '';
  actors[i + 1].profile = '';
  actors[i + 1].traits = [];
}

/**
 * @param {String} oldDatabaseXml
 */
export async function updateActors(
  oldDatabaseXml: string | convertableToString
) {
  try {
    const result = await parseStringPromise(oldDatabaseXml);
    const database = result.LDB.Database[0];

    const actors: Actor[] = [];
    database.actors[0].Actor.forEach(
      (Actor: DBActor, /** @type {number} */ i: number) => {
        readActorData(actors, i, Actor);
      }
    );

    return JSON.stringify(actors);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
