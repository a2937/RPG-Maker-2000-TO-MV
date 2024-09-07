import { convertableToString, parseStringPromise } from 'xml2js';
import { Event, Image, Map, Page, Conditions, Bgm, Bgs } from '../../types/map.js';
import { DBMap, DBEvent,DBPage} from '../../types/dbMap.js';
import { DBMapInfo } from '../../types/dbMapInfos.js';
import { remapMapEventCode } from '../utilities/updateEventCodes.mjs';




function readMapData(map: Map, oldMap: DBMap, oldMapInfo : DBMapInfo) {
  map.tilesetId = parseInt(oldMap.chipset_id);
  map.width = parseInt(oldMap.width);
  map.height = parseInt(oldMap.height);
  map.scrollType = parseInt(oldMap.scroll_type);
  map.parallaxShow = oldMap.parallax_flag[0].trim() == "T";
  map.parallaxName = oldMap.parallax_name[0];
  map.parallaxLoopX = oldMap.parallax_loop_x[0].trim() == "T";
  map.parallaxLoopY = oldMap.parallax_loop_y[0].trim() == "T";
  map.parallaxSx = parseInt(oldMap.parallax_sx);
  map.parallaxSy = parseInt(oldMap.parallax_sy);
  map.autoplayBgm = parseInt(oldMapInfo.music_type[0]) == 1; 
  map.autoplayBgs = parseInt(oldMapInfo.music_type[0]) == 2;



  if (map.autoplayBgs)
  {
      map.bgs= {} as Bgs;
      map.bgs.name = oldMapInfo.music[0].Music[0].name[0];
      map.bgs.pan = parseInt(oldMapInfo.music[0].Music[0].balance);
      map.bgs.volume = parseInt(oldMapInfo.music[0].Music[0].volume);
      map.bgs.pitch = parseInt(oldMapInfo.music[0].Music[0].tempo); 
    
      map.bgm = {} as Bgm;
      map.bgm.name = '';
      map.bgm.pan = 0;
      map.bgm.volume = 0;
      map.bgm.pitch = 0;
  }
  else 
  {
    map.bgs = {} as Bgs;
    map.bgs.name = ""; 
    map.bgs.pan = 0; 
    map.bgs.volume = 0; 
    map.bgs.pitch = 0;
    
    map.bgm = {} as Bgm; 
    map.bgm.name = oldMapInfo.music[0].Music[0].name[0]; 
    map.bgm.pan = parseInt(oldMapInfo.music[0].Music[0].balance); 
    map.bgm.volume = parseInt(oldMapInfo.music[0].Music[0].volume); 
    map.bgm.pitch = parseInt(oldMapInfo.music[0].Music[0].tempo); 
  }

  map.data = [...oldMap.lower_layer[0].split(" ").map(Number), ...oldMap.upper_layer[0].split(" ").map(Number)]
  map.events = []; 
  oldMap.events[0].Event.forEach((oldEvent: DBEvent, eventIndex: number) => { 
    map.events[eventIndex + 1] = {} as Event;
    map.events[eventIndex + 1].note = ""; 
    map.events[eventIndex + 1].id = eventIndex + 1;
    map.events[eventIndex + 1].name = oldEvent.name[0];
    if (map.events[eventIndex + 1].pages == null) {
      map.events[eventIndex + 1].pages = [] as Page[];
    }

    oldEvent.pages[0].EventPage.forEach((oldPage: DBPage, pageIndex: number) => {
      if (map.events[eventIndex + 1].pages[pageIndex] == null) {
        map.events[eventIndex + 1].pages[pageIndex] = {} as Page;
      }
      const newPage = map.events[eventIndex + 1].pages[pageIndex] || [];
      newPage.conditions = {} as Conditions; 

      const oldConditions = oldPage.condition[0].EventPageCondition[0];
      const oldFlags = oldConditions.flags[0].EventPageCondition_Flags[0];

      newPage.conditions.switch1Valid = oldFlags.switch_a == 'T';
      newPage.conditions.switch2Valid = oldFlags.switch_b == 'T';
      newPage.conditions.variableValid = oldFlags.variable == 'T';
      newPage.conditions.actorValid = oldFlags.actor == 'T';
      newPage.conditions.itemValid = oldFlags.item == 'T';

      newPage.conditions.switch1Id = parseInt(oldConditions.switch_a_id);
      newPage.conditions.switch2Id =  parseInt(oldConditions.switch_b_id);
      newPage.conditions.variableId =  parseInt(oldConditions.variable_id);
      newPage.conditions.variableValue = parseInt(oldConditions.variable_value);
      newPage.conditions.itemId = parseInt(oldConditions.item_id);
      newPage.conditions.actorId = parseInt(oldConditions.actor_id);


      map.events[eventIndex + 1].pages[pageIndex].image = {} as Image;

     
      map.events[eventIndex + 1].pages[pageIndex].image.direction = parseInt(oldPage.character_direction);
      map.events[eventIndex + 1].pages[pageIndex].image.pattern = parseInt(oldPage.character_pattern);
      if (oldPage.character_name[0] != "")
      {
        map.events[eventIndex + 1].pages[pageIndex].image.characterName = oldPage.character_name[0];
        // This is a character
        map.events[eventIndex + 1].pages[pageIndex].image.tileId = 0; 
        map.events[eventIndex + 1].pages[pageIndex].image.characterIndex = parseInt(oldPage.character_index);
      }
      else 
      {
        map.events[eventIndex + 1].pages[pageIndex].image.characterName = ""; 
        map.events[eventIndex + 1].pages[pageIndex].image.characterIndex = 0; 
        map.events[eventIndex + 1].pages[pageIndex].image.tileId = parseInt(
             oldPage.character_index
           ); 
      }
      map.events[eventIndex + 1].pages[pageIndex].moveFrequency = parseInt(oldPage.move_frequency);
      
      map.events[eventIndex + 1].pages[pageIndex].moveSpeed = parseInt(
          oldPage.move_speed
      );

      map.events[eventIndex + 1].pages[pageIndex].moveType = parseInt(
        oldPage.move_type
      );

      const oldCommands = oldPage.event_commands[0]; 

      map.events[eventIndex + 1].pages[pageIndex].list = [];
      


      if (oldCommands.EventCommand != null)
      {
        map.events[eventIndex + 1].pages[pageIndex].list =  remapMapEventCode( oldCommands.EventCommand);
      }
    });

    map.events[eventIndex + 1].x = parseInt(oldEvent.x);
    map.events[eventIndex + 1].y = parseInt(oldEvent.y);
  });

  // TODO: Do more research

  map.battleback1Name = ""; 
  map.battleback2Name = ''; 
  map.disableDashing = false; 
  map.displayName = ""; 
  map.encounterList = []; 
  map.encounterStep = 0; 
  map.note = ""; 
  map.specifyBattleback = false; 
}



/**
 * @param {String} oldMapXml
 */
export async function updateMap(
  oldMapXml: string | convertableToString,
  oldMapInfoXml: string | convertableToString, 
  mapId : number
) {
  try {
    const resultMap = await parseStringPromise(oldMapXml);
    const oldMap = resultMap.LMU.Map[0];
    const newMap = {} as Map;

     const MapInfo = await parseStringPromise(oldMapInfoXml);
     const maps = MapInfo.LMT.TreeMap[0].maps[0].MapInfo as DBMapInfo[];

    const oldMapInfo = maps.filter(x => parseInt(x.$.id) == mapId - 1)[0]; 
    

    readMapData(newMap, oldMap, oldMapInfo);
    return JSON.stringify(newMap);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
