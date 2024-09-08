import { Actor } from '../../types/actor.js';
import { DBActor, EditableDB } from '../../types/editable_database.js';


export function buildDatabase(actors: Actor[])
{

  const fullObject = {} as EditableDB; 
  
  fullObject.Database.actors = { Actor: [] };
  
  actors.forEach((mvActor) => {

    const oldActor = {} as DBActor;
    oldActor['@'].id = mvActor.id.toString().padStart(4, "0");
    oldActor.name = mvActor.name;
    oldActor.title = mvActor.nickname;
    oldActor.character_name = mvActor.characterName;
    oldActor.character_index = mvActor.characterIndex;
    oldActor.face_name = mvActor.faceName;
    oldActor.face_index = mvActor.faceIndex;
    oldActor.initial_level = mvActor.initialLevel;
    oldActor.final_level = mvActor.maxLevel;
    oldActor.class_id = mvActor.classId;
    oldActor.initial_equipment.Equipment.weapon_id = mvActor.equips[0];
    oldActor.initial_equipment.Equipment.shield_id = mvActor.equips[1];
    oldActor.initial_equipment.Equipment.helmet_id = mvActor.equips[2];
    oldActor.initial_equipment.Equipment.armor_id = mvActor.equips[3];
    oldActor.initial_equipment.Equipment.accessory_id = mvActor.equips[4];
  }
  )


  return fullObject; 
}