import { remapMapEventCode } from "../src/utilities/updateEventCodes.mjs";
import { assert } from 'chai';


describe('Event Command Conversion: Content', function ()
{
 
  it('There should be two commands returned when one is provided. One for content, the other for termination.', function () {
    const sampleEventCommands = [
      {
        code: '12410',
        indent: '0',
        string: 'Add something here later',
        parameters: ' '
      }
    ];
    const newCommands = remapMapEventCode(sampleEventCommands);
    assert.lengthOf(newCommands,2);
  });
  it('The comment command (12410) correctly remaps to 108.', function () {
    const sampleEventCommands = [
      { code: '12410', indent: '0', string: 'Add something here later', parameters: ' ' }
    ];
    const newCommands = remapMapEventCode(sampleEventCommands);
    assert.strictEqual(newCommands[0].code, 108);
  });
}); 