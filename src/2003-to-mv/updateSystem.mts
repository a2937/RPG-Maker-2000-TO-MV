import { convertableToString, parseStringPromise } from 'xml2js';
import { DBStart, DBSystem } from '../../types/dbSystem.js';
import { Airship, Bgm, Bgm2, Boat, Ship, System, Terms } from '../../types/system.js';

// TODO: Finish eventually 


/**
 * 
 * @param {System} system 
 * @param {DBSystem} dbSystem 
 */
function readDBSystem(system : System, dbSystem : DBSystem)
{


  system.boat.characterName = dbSystem.boat_name[0]; 
  system.boat.characterIndex = parseInt(dbSystem.boat_index); 
  const dbBoatBGM = dbSystem.boat_music[0].Music[0]; 
  const boatBGM = {name: dbBoatBGM.name[0], pan: parseInt(dbBoatBGM.tempo), volume: parseInt(dbBoatBGM.volume) } as Bgm; 
  system.boat.bgm = boatBGM; 


  system.airship.characterName = dbSystem.airship_name[0];
  system.airship.characterIndex = parseInt(dbSystem.airship_index);
  const dbAirBGM = dbSystem.airship_music[0].Music[0];
  const airshipBGM = {
    name: dbAirBGM.name[0],
    pan: parseInt(dbAirBGM.tempo),
    volume: parseInt(dbAirBGM.volume)
  } as Bgm;
  system.airship.bgm = airshipBGM; 


    system.ship.characterName = dbSystem.ship_name[0];
    system.airship.characterIndex = parseInt(dbSystem.ship_index);
    const dbShipBGM = dbSystem.ship_music[0].Music[0];
    const shipBGM = {
      name: dbShipBGM.name[0],
      pan: parseInt(dbShipBGM.tempo),
      volume: parseInt(dbShipBGM.volume)
    } as Bgm;
    system.ship.bgm = shipBGM; 


  system.gameTitle = dbSystem.title_name[0]; 
  system.title1Name = dbSystem.system_name[0];
  system.title2Name = dbSystem.system2_name[0]; 

  const dbTitleBGM = dbSystem.title_music[0].Music[0];
  const titleBGM = {
    name: dbTitleBGM.name[0],
    pan: parseInt(dbTitleBGM.tempo),
    volume: parseInt(dbTitleBGM.volume)
  } as Bgm;

  system.titleBgm = titleBGM; 

  const dbGameOver = dbSystem.gameover_music[0].Music[0];
  const gameOverMe = {
    name: dbGameOver.name[0],
    pan: parseInt(dbGameOver.tempo),
    volume: parseInt(dbGameOver.volume)
  } as Bgm;


  system.gameoverMe = gameOverMe; 

  // TODO: verify 
  system.defeatMe = gameOverMe; 

  const dbBattleMusic = dbSystem.battle_music[0].Music[0]; 

  const battleMusic = {
    name: dbBattleMusic.name[0],
    pan: parseInt(dbBattleMusic.tempo),
    volume: parseInt(dbBattleMusic.volume)
  } as Bgm;

    system.battleBgm =battleMusic; 

  system.partyMembers = dbSystem.party[0].split(" ").map(Number); 

}

function readTreeMap(system: System, dbStart: DBStart)
{
  system.boat.startMapId = parseInt(dbStart.boat_map_id);
  system.boat.startX = parseInt(dbStart.boat_x);
  system.boat.startY = parseInt(dbStart.boat_y);

  system.airship.startMapId = parseInt(dbStart.airship_map_id);
  system.airship.startX = parseInt(dbStart.airship_x);
  system.airship.startY = parseInt(dbStart.airship_y);

   system.ship.startMapId = parseInt(dbStart.ship_map_id);
  system.ship.startX = parseInt(dbStart.ship_x);
  system.ship.startY = parseInt(dbStart.ship_y);

  system.startMapId = parseInt(dbStart.party_map_id);
  system.startX = parseInt(dbStart.party_x);
  system.startY = parseInt(dbStart.party_y);
}

/**
 * @param {String} oldDatabaseXml
 */
export async function updateSystem(
  oldDatabaseXml: string | convertableToString,
  oldMapTreeXML: string | convertableToString
) {
  try {
    const resultDB = await parseStringPromise(oldDatabaseXml);
    const database = resultDB.LDB.Database[0];
    const terms = database.terms[0].Terms[0]; 

    const resultTree = await parseStringPromise(oldMapTreeXML);
    const treeMap = resultTree.LMT.TreeMap[0];
    const startInfo = treeMap.start[0].Start[0]; 
   

  

    const system: System = {} as System ; 

    system.airship = {} as Airship;
    system.boat = {} as Boat;
    system.ship = {} as Ship;
    system.switches = []; 
    system.variables = [];
    system.skillTypes = []; 
    system.sounds = []; 
    system.terms = {} as Terms; 
 
    system.optSideView = false; 

    // TODO: Research further
    system.armorTypes = []; 
    system.attackMotions = []; 
    system.battleback1Name = ""; 
    system.battleback2Name = ""; 
    system.battlerHue = 0; 
    system.battlerName = "";
    system.elements = []; 
    system.equipTypes = [];
    system.weaponTypes = [];
    system.magicSkills = []; 
    system.menuCommands = []; 
    system.optDisplayTp = true; 
    system.optDrawTitle = true; 
    system.optExtraExp = true; 
    system.optFloorDeath = false; 
    system.optFollowers = true; 
    system.optSlipDeath = false; 
    system.optTransparent = false; 
    system.locale = "en";
    system.testBattlers = []; 
    system.testTroopId = -1; 
    system.versionId = 29374065;
    system.victoryMe = {} as Bgm2; 
    system.windowTone = []; 

    readDBSystem(system, database.system[0].System[0]);

    readTreeMap(system, startInfo); 

    system.editMapId = treeMap.active_node[0];
    // TODO: add in rest of terms 
    system.currencyUnit = terms.gold; 

    database.switches[0].Switch.forEach((switchElement: { name: string[]; }) => {
      system.switches.push(switchElement.name[0]); 
    });

     database.variables[0].Variable.forEach((variablesElement: { name: string[]; }) => {
       system.variables.push(variablesElement.name[0]);
     });
    
    return JSON.stringify(system);
  } catch (err) {
    console.error(err);
    throw err;
  }
}