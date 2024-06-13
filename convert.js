const fs = require('fs').promises;
const xml2js = require('xml2js');
const path = require("path");
const parser = require('xml2js').parseStringPromise;

let oldPath = path.resolve("Old");
let oldDatabasePath = path.join(oldPath, "RPG_RT.edb");

let newPath = path.resolve("New");
let actorsPath = path.join(newPath, "Actors.json");
let skillsPath = path.join(newPath, "Skills.json");
let itemsPath = path.join(newPath, "Items.json");
let enemiesPath = path.join(newPath, "Enemies.json");
let troopsPath = path.join(newPath, "Troops.json");
let classesPath = path.join(newPath, "Classes.json");
let statePath = path.join(newPath, "States.json");
let tilesetPath = path.join(newPath, "Tilesets.json");
let genericMapPath = path.join(newPath, "Map_id.json").toString();


/**
 * @param {import("fs").PathLike | fs.FileHandle} oldDatabasePath
 * @param {import("fs").PathLike | fs.FileHandle} actorsPath
 */
async function updateActors(oldDatabasePath, actorsPath) {
  try {
    const data = await fs.readFile(oldDatabasePath);
    const actors = JSON.parse(await fs.readFile(actorsPath, 'utf-8'));
    const result = await parser(data);
    const database = result.LDB.Database[0];

    database.actors.forEach((/** @type {{ Actor: { [x: string]: any; }; }} */ actor, /** @type {number} */ i) => {
      readActorData(actors, i, actor.Actor[i]);
      console.log(actors[i + 1]);
    });

    await fs.writeFile(actorsPath, JSON.stringify(actors), { encoding: "utf-8" });
  } catch (err) {
    console.error(err);
  }
}

/**
 * @param {import("fs").PathLike | fs.FileHandle} oldDatabasePath
 * @param {import("fs").PathLike | fs.FileHandle} skillsPath
 */
async function updateSkills(oldDatabasePath, skillsPath) {
  try {
    const data = await fs.readFile(oldDatabasePath);
    const skills = JSON.parse(await fs.readFile(skillsPath, 'utf-8'));
    const result = await parser(data);
    const database = result.LDB.Database[0];

    database.skills.forEach((/** @type {{ Skill: any[]; }} */ skill, /** @type {number} */ i) => {
      readSkillData(skills, i, skill.Skill[i]);
      console.log(skills[i + 1]);
    });

    await fs.writeFile(skillsPath, JSON.stringify(skills), { encoding: "utf-8" });
  } catch (err) {
    console.error(err);
  }
}

/**
 * @param {import("fs").PathLike | fs.FileHandle} oldDatabasePath
 * @param {import("fs").PathLike | fs.FileHandle} itemsPath
 */
async function updateItems(oldDatabasePath, itemsPath) {
  try {
    const data = await fs.readFile(oldDatabasePath);
    const items = JSON.parse(await fs.readFile(itemsPath, 'utf-8'));
    const result = await parser(data);
    const database = result.LDB.Database[0];

    database.items.forEach((/** @type {{ Item: any[]; }} */ item, /** @type {number} */ i) => {
      readItemData(items, i, item.Item[i]);
      console.log(items[i + 1]);
    });

    await fs.writeFile(itemsPath, JSON.stringify(items), { encoding: "utf-8" });
  } catch (err) {
    console.error(err);
  }
}

/**
 * @param {import("fs").PathLike | fs.FileHandle} oldDatabasePath
 * @param {import("fs").PathLike | fs.FileHandle} enemiesPath
 */
async function updateEnemies(oldDatabasePath, enemiesPath) {
  try {
    const data = await fs.readFile(oldDatabasePath);
    const enemies = JSON.parse(await fs.readFile(enemiesPath, 'utf-8'));
    const result = await parser(data);
    const database = result.LDB.Database[0];

    database.enemies.forEach((/** @type {{ Enemy: any[]; }} */ enemy, /** @type {number} */ i) => {
      readEnemyData(enemies, i, enemy.Enemy[i]);
      console.log(enemies[i + 1]);
    });

    await fs.writeFile(enemiesPath, JSON.stringify(enemies), { encoding: "utf-8" });
  } catch (err) {
    console.error(err);
  }
}

/**
 * @param {import("fs").PathLike | fs.FileHandle} oldDatabasePath
 * @param {import("fs").PathLike | fs.FileHandle} troopsPath
 */
async function updateTroops(oldDatabasePath, troopsPath) {
  try {
    const data = await fs.readFile(oldDatabasePath);
    const enemies = JSON.parse(await fs.readFile(troopsPath, 'utf-8'));
    const result = await parser(data);
    const database = result.LDB.Database[0];

    database.troops.forEach((/** @type {{ Troop: any[]; }} */ troop, /** @type {number} */ i) => {
      readTroopData(enemies, i, troop.Troop[i]);
      console.log(enemies[i + 1]);
    });

    await fs.writeFile(troopsPath, JSON.stringify(enemies), { encoding: "utf-8" });
  } catch (err) {
    console.error(err);
  }
}



/**
 * @param {import("fs").PathLike | fs.FileHandle} oldDatabasePath
 * @param {import("fs").PathLike | fs.FileHandle} tilesetPath
 */
async function updateTilesets(oldDatabasePath, tilesetPath) {
  try {
    const data = await fs.readFile(oldDatabasePath);
    const tilesets = JSON.parse(await fs.readFile(tilesetPath, 'utf-8'));
    const result = await parser(data);
    const database = result.LDB.Database[0];

    database.chipsets.forEach((/** @type {{Chipset: any[]; }} */ item, /** @type {number} */ i) => {
      readTilesetData(tilesets, i, item.Chipset[i]);
      console.log(tilesets[i + 1]);
    });

    await fs.writeFile(tilesetPath, JSON.stringify(tilesets), { encoding: "utf-8" });
  } catch (err) {
    console.error(err);
  }
}


/**
 * @param {import("fs").PathLike | fs.FileHandle} oldMapPath
 * @param {String} genericMapPath
 * @param {Number} mapId
 */
async function updateMap(oldMapPath, genericMapPath, mapId) {
  try {
    const actualMapPath = genericMapPath.replace("_id", mapId.toString().padStart(3, "0"));
    const data = await fs.readFile(oldMapPath);
    const map = JSON.parse(await fs.readFile(actualMapPath, 'utf-8'));
    const result = await parser(data);
    const oldMap = result;

    readOldMapData(map, oldMap);

    await fs.writeFile(actualMapPath, JSON.stringify(map), { encoding: "utf-8" });
  } catch (err) {
    console.error(err);
  }
}




/**
 * @param {{ [x: string]: any; }} actors
 * @param {number} i
 * @param {*} dbActor
 */
function readActorData(actors, i, dbActor) {
  if (actors[i + 1] == null) {
    actors[i + 1] = {};
    actors[i + 1].equips = [];
  }

  actors[i + 1].id = i + 1;
  actors[i + 1].name = dbActor.name[0];
  if (dbActor.nickname != null) {
    actors[i + 1].nickname = dbActor.nickname[0];
  }
  actors[i + 1].characterName = dbActor.character_name[0];
  actors[i + 1].characterIndex = parseInt(dbActor.character_index);
  actors[i + 1].faceName = dbActor.face_name[0];
  actors[i + 1].faceIndex = parseInt(dbActor.face_index);
  actors[i + 1].initialLevel = parseInt(dbActor.initial_level);
  actors[i + 1].maxLevel = parseInt(dbActor.final_level);
  actors[i + 1].classId = parseInt(dbActor.class_id);


  // database.actors[0].Actor[0].initial_equipment[0].Equipment[0].accessory_id
  // Weapon 
  actors[i + 1].equips[0] = parseInt(dbActor.initial_equipment[0].Equipment[0].weapon_id);

  // Shield
  actors[i + 1].equips[1] = parseInt(dbActor.initial_equipment[0].Equipment[0].shield_id);

  // Helmet
  actors[i + 1].equips[2] = parseInt(dbActor.initial_equipment[0].Equipment[0].helmet_id);

  // Body
  actors[i + 1].equips[3] = parseInt(dbActor.initial_equipment[0].Equipment[0].armor_id);

  // Accessory
  actors[i + 1].equips[4] = parseInt(dbActor.initial_equipment[0].Equipment[0].accessory_id);
}


/**
 * @param {{ [x: string]: any; }} skills
 * @param {number} i
 * @param {*} dbSkill
 */
function readSkillData(skills, i, dbSkill) {
  // TODO: Learn more about how skills work
  if (skills[i + 1] == null) {
    skills[i + 1] = {};
  }
  skills[i + 1].id = i + 1;
  skills[i + 1].animationId = dbSkill.animation_id;
  skills[i + 1].name = dbSkill.name[0];
  skills[i + 1].description = dbSkill.description[0];
  skills[i + 1].note = dbSkill.note[0];
  skills[i + 1].message1 = dbSkill.using_message1[0];
  skills[i + 1].message2 = dbSkill.using_message2[0];
}


/**
 * @param {{ [x: string]: any; }} items
 * @param {number} i
 * @param {*} dbItem
 */
function readItemData(items, i, dbItem) {
  // TODO: Learn more about how items work
  if (items[i + 1] == null) {
    items[i + 1] = {};
  }
  items[i + 1].id = i + 1;

  items[i + 1].name = dbItem.name[0];

  items[i + 1].description = dbItem.description[0];

  items[i + 1].price = dbItem.price;

  items[i + 1].repeats = dbItem.uses;

  items[i + 1].animationId = dbItem.animation_id;
}

/**
 * @param {{ [x: string]: any; }} enemies
 * @param {number} i
 * @param {*} dbEnemy
 */
function readEnemyData(enemies, i, dbEnemy) {
  // TODO: Learn more about how enemies work
  if (enemies[i + 1] == null) {
    enemies[i + 1] = {};
  }
  enemies[i + 1].id = i + 1;

  enemies[i + 1].name = dbEnemy.name[0];

  enemies[i + 1].battlerName = dbEnemy.battler_name[0];

  enemies[i + 1].gold = dbEnemy.gold;

  enemies[i + 1].battlerHue = dbEnemy.battler_hue;

  enemies[i + 1].exp = dbEnemy.exp;
}

/**
 * @param {{ [x: string]: any; }} troops
 * @param {number} i
 * @param {*} dbTroop
 */
function readTroopData(troops, i, dbTroop) {
  if (troops[i + 1] == null) {
    troops[i + 1] = { members: [], pages: [] };
  }
  troops[i + 1].name = dbTroop.name;
  dbTroop.members.forEach((member, memberIndex) => {
    if (troops[i + 1].members[memberIndex] == null) {
      troops[i + 1].members[memberIndex] = {};
    }
    troops[i + 1].members[memberIndex].enemyId = member.enemy_id;
    troops[i + 1].members[memberIndex].x = member.x;
    troops[i + 1].members[memberIndex].y = member.y;
    troops[i + 1].members[memberIndex].hidden = member.invisible == "T";
  }
  );

  dbTroop.pages.forEach((oldPage, pageIndex) => {
    if (troops[i + 1].pages[pageIndex] == null) {
      troops[i + 1].pages[pageIndex] = { conditions: {} };
    }
    let oldFlags = oldPage.TroopPageCondition.flags.TroopPageCondition_Flags;
    troops[i + 1].pages[pageIndex].conditions.actorId = oldPage.turn_actor_id;
    troops[i + 1].pages[pageIndex].conditions.actorValid = oldFlags.turn_actor == 'T';

    troops[i + 1].pages[pageIndex].conditions.switchId = oldPage.switch_a_id;
    troops[i + 1].pages[pageIndex].conditions.switchValid = oldFlags.switch_a == 'T';

    // TODO: Finish up pages 
  });


}

/**
 * @param {{ [x: string]: any; }} tilesets
 * @param {number} i
 * @param {*} dbTile
 */
function readTilesetData(tilesets, i, dbTile) {
  // TODO: Learn more about how enemies work
  if (tilesets[i + 1] == null) {
    tilesets[i + 1] = {};
  }
  tilesets[i + 1].id = i + 1;

  tilesets[i + 1].name = dbTile.name[0];


}

const eventCodeTranslator = {
  11030: 223, // Tint screen
  10810: 201, // Transfer player
  22410: 108 // Comment code
}

function readOldMapData(map, oldMap) {
  map.tilesetId = oldMap.chipset_id;
  map.width = oldMap.width;
  map.height = oldMap.height;
  map.scrollType = oldMap.scroll_type;
  map.showParallax = oldMap.parallax_flag[0].trim() == "T";
  map.parallaxName = oldMap.parallax_name[0];
  map.parallaxLoopX = oldMap.parallax_loop_x[0].trim() == "T";
  map.parallaxLoopY = oldMap.parallax_loop_y[0].trim() == "T";
  map.parallaxSx = oldMap.parallax_sx;
  map.parallaxSy = oldMap.parallax_sy;
  map.data = [...oldMap.lower_layer.split(" "), ...oldMap.upper_layer.split(" ")]

  oldMap.events.forEach((oldEvent, eventIndex) => {
    // Old Code tint screen: 11030  = New Code : 223
    // Old Code transfer player: 10810  = New Code: 201 
    if (map.events[eventIndex + 1] == null) {
      map.events[eventIndex + 1] == {};
    }
    map.events[eventIndex + 1].id = eventIndex + 1;
    map.events[eventIndex + 1].name = oldEvent.name;
    if (map.events[eventIndex + 1].pages == null) {
      map.events[eventIndex + 1].pages = {};

    }

    oldEvent.pages.array.forEach((oldPage, pageIndex) => {
      if (map.events[eventIndex + 1].pages[pageIndex] == null) {
        map.events[eventIndex + 1].pages[pageIndex] = { conditions: {} };
      }
      var newPage = map.events[eventIndex + 1].pages[pageIndex];
      var oldConditions = oldPage.condition.EventPageCondition;
      var oldFlags = oldConditions.EventPageCondition_Flags.flags;

      newPage.conditions.switch1Valid = oldFlags.switch_a == 'T';
      newPage.conditions.switch2Valid = oldFlags.switch_b == 'T';
      newPage.conditions.variableValid = oldFlags.variable == 'T';
      newPage.conditions.actorValid = oldFlags.actor == 'T';
      newPage.conditions.itemValid = oldFlags.item == 'T';

      newPage.conditions.switch1Id = oldConditions.switch_a_id;
      newPage.conditions.switch2Id = oldConditions.switch_b_id;
      newPage.conditions.variableId = oldConditions.variable_id;
      newPage.conditions.variableValue = oldConditions.variable_value;
      newPage.conditions.itemId = oldConditions.item_id;
      newPage.conditions.actorId = oldConditions.actor_id;


      map.events[eventIndex + 1].pages[pageIndex].image = {};
      map.events[eventIndex + 1].pages[pageIndex].image.characterName = oldPage.character_name;
      map.events[eventIndex + 1].pages[pageIndex].image.characterIndex = oldPage.character_index;
      map.events[eventIndex + 1].pages[pageIndex].image.direction = oldPage.character_direction;
      map.events[eventIndex + 1].pages[pageIndex].image.pattern = oldPage.character_pattern;

      map.events[eventIndex + 1].pages[pageIndex].moveFrequency = oldPage.move_frequency;

      // TODO: Add in commands
    });



    map.events[eventIndex + 1].x = oldEvent.x;
    map.events[eventIndex + 1].y = oldEvent.y;

  })
}

try {
  console.log("Updating actors");
  updateActors(oldDatabasePath, actorsPath);
  console.log("Updating skills");
  updateSkills(oldDatabasePath, skillsPath);
  console.log("Updating items");
  updateItems(oldDatabasePath, itemsPath);
  console.log("Updating enemies");
  updateEnemies(oldDatabasePath, enemiesPath);
  console.log("Updating troops");
  updateTroops(oldDatabasePath, troopsPath);
}
catch (ex) {
  console.error("An unexpected error occurred.");
  console.log(ex);
}