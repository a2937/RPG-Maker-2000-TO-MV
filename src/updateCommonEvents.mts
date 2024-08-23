import { convertableToString, parseStringPromise } from 'xml2js';
import { DBCommonEvent } from '../types/dbCommonEvent.js';
import { CommonEvent } from '../types/commonEvent.js';


/**
 * @param {CommonEvent[]} common_events
 * @param {number} i
 * @param {DBCommonEvent} dbCommonEvent
 */
function readCommonEventData(common_events: CommonEvent[], i: number, dbCommonEvent: DBCommonEvent) {
  if (common_events[i + 1] == null) {
    common_events[i + 1] = {} as CommonEvent;
    common_events[i + 1].list = [];
  }
  common_events[i + 1].id = i + 1;
  if (dbCommonEvent.name != null && dbCommonEvent.name.length != 0) {
    common_events[i + 1].name = dbCommonEvent.name[0];
  } else {
    common_events[i + 1].name = '';
  }
  common_events[i + 1].switchId = parseInt(dbCommonEvent.switch_id);
  common_events[i + 1].trigger = parseInt(dbCommonEvent.trigger);
  // TODO: Add common event commands once map events are done
}

/**
 * @param {String} oldDatabaseXml
 */
export async function updateCommonEvents(
  oldDatabaseXml: string | convertableToString
) {
  try {
    const result = await parseStringPromise(oldDatabaseXml);
    const database = result.LDB.Database[0];

    const common_events: CommonEvent[] = [];
    database.commonevents[0].CommonEvent.forEach(
      (CommonEvent: DBCommonEvent, /** @type {number} */ i: number) => {
        readCommonEventData(common_events, i, CommonEvent);
      }
    );

    return JSON.stringify(common_events);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
