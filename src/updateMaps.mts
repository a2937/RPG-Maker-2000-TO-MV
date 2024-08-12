import { convertableToString, parseStringPromise } from 'xml2js';
import { Event, Image, Map, Page, Conditions, Bgm, Bgs, EventCommand } from '../types/map.js';
import { DBMap, DBEvent,DBPage, DBEventCommand} from '../types/dbMap.js';
import { DBMapInfo } from '../types/dbMapInfos.js';




/**
 * 
ForceFlee (1006)
EnableCombo (1007)
ChangeClass (1008)
ChangeBattleCommands (1009)
MessageOptions (10120)
ChangeFaceGraphic (10130)
ChangePartyMembers (10330)
ChangeExp (10410)
ChangeLevel (10420)
ChangeParameters (10430)
ChangeSkills (10440)
ChangeEquipment (10450)
ChangeSP (10470)
ChangeCondition (10480)
FullHeal (10490)
SimulatedAttack (10500)
ChangeHeroTitle (10620)
ChangeSpriteAssociation (10630)
ChangeActorFace (10640)
ChangeVehicleGraphic (10650)
ChangeSystemBGM (10660)
ChangeSystemSFX (10670)
ChangeSystemGraphics (10680)
ChangeScreenTransitions (10690)
EnemyEncounter (10710)
ShowInn (10730)
Teleport (10810)
MemorizeLocation (10820)
RecallToLocation (10830)
SetVehicleLocation (10850)
ChangeEventLocation (10860)
TradeEventLocations (10870)
StoreTerrainID (10910)
StoreEventID (10920)
PanScreen (11060)
WeatherEffects (11070)
ShowBattleAnimation (11210)
SpriteTransparency (11310)
FlashSprite (11320)
MoveEvent (11330)
KeyInputProc (11610)
ChangePBG (11720)
ChangeEncounterRate (11740)
TileSubstitution (11750)
TeleportTargets (11810)
ChangeTeleportAccess (11820)
EscapeTarget (11830)
ChangeEscapeAccess (11840)
ChangeSaveAccess (11930)
ChangeMainMenuAccess (11960)
CallEvent (12330)
ChangeMonsterHP (13110)
ChangeMonsterMP (13120)
ChangeMonsterCondition (13130)
ShowHiddenMonster (13150)

    ChangeBattleBG (13210)

The following take no arguments:

OpenLoadMenu (5001)
ExitGame (5002)
ToggleAtbMode (5003)
ToggleFullscreen (5004)
OpenVideoOptions (5005)
ProceedWithMovement (11340)
HaltAllMovement (11350)
EnterExitVehicle (10840)
TerminateBattle (13410)
 */

const eventCodeTranslator: { [key: number]: number } = {
  10110: -1, // In 2000/2003 this is the heading to show messages 
  10130: 101, // Set speaker
  11030: 223, // Tint screen
  10810: 201, // Transfer player
  22410: 108, // Comment code
  20110: 401, // Continue talk
  12510: 354, // Return to Title Screen
  12420: 353, // Game Over
  12320: 214, // Erase Event
  12210: 112, // Loop
  12220: 113, // Break Loop
  11910: 352, // Open Save Menu
  11950: 351, // Open Menu
  11530: 243, // Save BGM
  11540: 244, // Resume BGM
  12310: 115, // End event processing 
  1005: 117, // Common event 
  12110: 118, // Label 
  12120: 119, // Jump to label 
  11110: 231, // Show picture
  11120: 232, // Move picture
  11130: 235, // Erase picture
  11510: 241, // Play BGM
  11520: 242, // Fadeout BGM 
  10140: 102, // Show choices
  10150: 103, // Input number
  10210: 121, // Control Switches 
  10220: 122, // Control Variables 
  10230: 124, // Control Timer 
  10310: 125, // Change Gold
  10320: 126, // Change Items
  11410 : 230, // Wait 
  11560: 261, // Play movie
  11550: 250, // Play sound
  10740: 303, // In 2003 this is enter name , in MV it's in all in one
  10610: 303, // In 2003, this is change name, in MV it's in all in one
  11710: 283, // Change tileset 
  12010: 111, // Conditional Branch  
  11040: 224, // Flash screen  
  11010: 221, // Fadeout screen
  11020: 222, // Fadein screen
  11050: 225, // Shake screen
  10460: 311, // Change HP 
  10720 : 302, // Shop Processing 
};


const mvSetSpeakerCode = 101; 

/**
 * 
 * @param {string} input 
 */
function convertToNum(input : string)
{
  if (!Number.isNaN(input))
  {
    return Number.parseInt(input);
  }
  else 
  {
    return input; 
  }
}


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
      
      const oldCommands = oldPage.event_commands[0]; 

      map.events[eventIndex + 1].pages[pageIndex].list = [];
      
      if (oldCommands.EventCommand != null)
      {
        const properCommands = oldCommands.EventCommand as DBEventCommand[];
        let lastSpeechBubble: EventCommand = {} as EventCommand; 
        properCommands.forEach((command) => {
          // TODO: Check for the rest of the commands
          
          const newCode = eventCodeTranslator[parseInt(command.code)] as number;

          if (newCode == -1 && lastSpeechBubble.code != null)
          {
             map.events[eventIndex + 1].pages[pageIndex].list.push(
              lastSpeechBubble
             );
            // Begin New dialog 
          }
          else 
          {
              const newIndent = parseInt(command.indent);
              const parameters: unknown[] = [];
              
              const commandString =
                command.string == null ? '' : command.string + ' ';
              parameters.push(commandString); 
              if (command.parameters[0] != null)
              {

                parameters.push(
                  ...command.parameters[0].split(' ').map(convertToNum)
                ); 
              }
              const eventCommand = {
                code: newCode,
                indent: newIndent,
                parameters: parameters
            }
            if (eventCommand.code == mvSetSpeakerCode) {
              // Set speaker
              lastSpeechBubble = eventCommand;
              // Storing for later
            } else {
              // Adding to list
              map.events[eventIndex + 1].pages[pageIndex].list.push(
                eventCommand
              );
            }
          }

        });
        const emptyCommand = { code: 0, indent: 0, parameters:[]}; 
        map.events[eventIndex + 1].pages[pageIndex].list.push(emptyCommand);
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
