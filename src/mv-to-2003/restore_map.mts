import {   TypesafeDBMap } from '../../types/dbMap_typesafe.js';
import { Map } from "../../types/map.js";

export function buildMap(mvMap : Map) {
  const dbMap = { Map: {} } as TypesafeDBMap; 
  dbMap.Map.chipset_id = mvMap.tilesetId; 
  dbMap.Map.width = mvMap.width;
  dbMap.Map.height = mvMap.height;
  dbMap.Map.scroll_type = mvMap.scrollType; 
  dbMap.Map.parallax_flag = mvMap.parallaxName.trim() == "" ? "F" : "T"; 
  dbMap.Map.parallax_name = mvMap.parallaxName; 
  dbMap.Map.parallax_loop_x = mvMap.parallaxLoopX ? "T" : "F"; 
  dbMap.Map.parallax_loop_y = mvMap.parallaxLoopY ? 'T' : 'F'; 
  
  // TODO: Re-examine
  dbMap.Map.parallax_auto_loop_x = mvMap.parallaxLoopX ? 'T' : 'F';
  dbMap.Map.parallax_sx = mvMap.parallaxSx;
  dbMap.Map.parallax_auto_loop_y = mvMap.parallaxLoopY ? 'T' : 'F';
  dbMap.Map.parallax_sy = mvMap.parallaxSy;

  const totalMapSize = mvMap.width * mvMap.height;

  const totalMVMapData = mvMap.data.join(","); 
  dbMap.Map.lower_layer = totalMVMapData.slice(0, totalMapSize); 
  dbMap.Map.upper_layer = totalMVMapData.slice((totalMapSize * 3) - 1,(totalMapSize * 5));

  dbMap.Map.events = { Event: [] }; 

  /*
  mvMap.events.forEach((event) => {
    const newEvent = {} as Event;
    newEvent['@'].id = event.id.toString().padStart(4, "0"); 
    newEvent.name = event.name; 
    newEvent.x = event.x;
    newEvent.y = event.y; 
    newEvent.pages = { EventPage: [] }; 
    event.pages.forEach(page => {
      const newPage = {} as EventPage; 
      newPage.character_index = page.image.characterIndex || page.image.tileId; 
      newPage.character_name = page.image.characterName; 
      newPage.character_direction = page.image.direction;
      newPage.move_frequency = page.moveFrequency; 
      newPage.move_speed = page.moveSpeed; 
      newPage.move_type = page.moveType; 
      newPage.condition = { EventPageCondition: {} } as Condition; 
      
      newPage.condition.EventPageCondition.actor_id = page.conditions.actorId; 
      newPage.condition.EventPageCondition.item_id = page.conditions.itemId; 
      newPage.condition.EventPageCondition.switch_a_id = page.conditions.switch1Id; 
      newPage.condition.EventPageCondition.switch_b_id = page.conditions.switch2Id; 




      newEvent.pages.EventPage.push(newPage); 
    }
    );
    dbMap.Map.events.Event.push(newEvent); 
  }); 
  */ 
  return dbMap; 
}
