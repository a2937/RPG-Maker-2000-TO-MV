import { convertableToString, parseStringPromise } from 'xml2js';
import { DBItem } from '../types/dbItem.js';
import { Damage, Effect, Item } from '../types/item.js';

/**
 * @param {Item[]} items
 * @param {number} i
 * @param {DBItem} dbItem
 */
function readItemData(items: Item[], i: number, dbItem: DBItem) {
  // TODO: Learn more about how items work
  if (items[i + 1] == null) {
    items[i + 1] = {} as Item;
  }
  items[i + 1].id = i + 1;

  items[i + 1].name = dbItem.name[0];

  items[i + 1].description = dbItem.description[0];

  items[i + 1].price = parseInt(dbItem.price);

  items[i + 1].consumable = parseInt(dbItem.uses) > 0;

  items[i + 1].repeats = parseInt(dbItem.uses);

  items[i + 1].animationId = parseInt(dbItem.animation_id);

  // Inexact matches

  items[i + 1].damage = {} as Damage;
  items[i + 1].damage.critical = parseInt(dbItem.critical_hit) > 0;

  //Which one is it??
  items[i + 1].itypeId = parseInt(dbItem.type);
  items[i + 1].hitType = parseInt(dbItem.type);

  // Unable to match: TODO: Research further
  items[i + 1].note = '';
  items[i + 1].damage.elementId = 0;
  items[i + 1].damage.formula = '0';
  items[i + 1].damage.type = 0;
  items[i + 1].damage.variance = 0;
  items[i + 1].effects = [] as Effect[];
  items[i + 1].iconIndex = -1;
  items[i + 1].scope = 7;
  items[i + 1].speed = 0;
  items[i + 1].successRate = 100;
  items[i + 1].tpGain = 0;

  // TODO: There are a few possibilities to explore like occasion_field1
  items[i + 1].occasion = 0;
}

/**
 * @param {String} oldDatabaseXml
 */
export async function updateItems(
  oldDatabaseXml: string | convertableToString
) {
  try {
    const result = await parseStringPromise(oldDatabaseXml);
    const database = result.LDB.Database[0];

    const items: Item[] = [];
    database.items[0].Item.forEach(
      (Item: DBItem, /** @type {number} */ i: number) => {
        readItemData(items, i, Item);
      }
    );

    return JSON.stringify(items);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
