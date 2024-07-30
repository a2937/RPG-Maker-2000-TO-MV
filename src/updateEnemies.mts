import { convertableToString, parseStringPromise } from 'xml2js';
import { DBEnemy } from '../types/dbEnemy.js';
import { DropItem, Enemy } from '../types/enemy.js';

/**
 * @param {Enemy[]} enemies
 * @param {number} i
 * @param {DBEnemy} dbEnemy
 */
function readEnemyData(enemies: Enemy[], i: number, dbEnemy: DBEnemy) {
  // TODO: Learn more about how enemies work
  if (enemies[i + 1] == null) {
    enemies[i + 1] = {} as Enemy;
  }
  enemies[i + 1].id = i + 1;

  enemies[i + 1].name = dbEnemy.name[0];

  enemies[i + 1].battlerName = dbEnemy.battler_name[0];

  enemies[i + 1].gold = parseInt(dbEnemy.gold);

  enemies[i + 1].battlerHue = parseInt(dbEnemy.battler_hue);

  enemies[i + 1].exp = parseInt(dbEnemy.exp);

  enemies[i + 1].params = [];
  enemies[i + 1].params.push(parseInt(dbEnemy.max_hp));

  // Incomplete match; TODO: Verify
  enemies[i + 1].params.push(parseInt(dbEnemy.max_sp));
  enemies[i + 1].params.push(parseInt(dbEnemy.attack));
  enemies[i + 1].params.push(parseInt(dbEnemy.defense));
  enemies[i + 1].params.push(parseInt(dbEnemy.attack));
  enemies[i + 1].params.push(parseInt(dbEnemy.defense));
  enemies[i + 1].params.push(parseInt(dbEnemy.agility));
  enemies[i + 1].params.push(parseInt(dbEnemy.spirit));

  // Unable to match. TODO: Research further
  enemies[i + 1].note = '';

  enemies[i + 1].actions = [];
  enemies[i + 1].traits = [];

  enemies[i + 1].dropItems = [];
  const dropItem = {} as DropItem;
  dropItem.dataId = parseInt(dbEnemy.drop_id);
  dropItem.denominator = 1;
  dropItem.kind = 0;
  enemies[i + 1].dropItems.push(dropItem);
}

/**
 * @param {String} oldDatabaseXml
 */
export async function updateEnemies(
  oldDatabaseXml: string | convertableToString
) {
  try {
    const result = await parseStringPromise(oldDatabaseXml);
    const database = result.LDB.Database[0];

    const enemies: Enemy[] = [];
    database.enemies[0].Enemy.forEach(
      (Enemy: DBEnemy, /** @type {number} */ i: number) => {
        readEnemyData(enemies, i, Enemy);
      }
    );

    return JSON.stringify(enemies);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
