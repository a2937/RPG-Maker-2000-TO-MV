
import {EventCommand} from '../../types/map.js';
import { DBEventCommand } from '../../types/dbMap.js';
import { EventCodeTranslator } from '../../types/eventCodeTranslator.js';

/**
 * 
RPG Maker 2003 to RPG Maker MV Event Code Remap:

    ForceFlee (1006)
        MV Equivalent: "Escape" (using event commands) — Trigger an escape attempt using a script call, as there's no direct command.

    EnableCombo (1007)
        MV Equivalent: No direct equivalent — This feature would need to be implemented through plugins or battle system customization.

    ChangeBattleCommands (1009)
        MV Equivalent: Change Actor Command — Customizable via plugins or directly through database setup.

    MessageOptions (10120)
        MV Equivalent: "Message Settings" (in the event commands section) — Set options like window type, position, and more.

    ChangePartyMembers (10330)
        MV Equivalent: "Change Party Member" (Event Command > Actor > Change Party Member).

    ChangeParameters (10430)
        MV Equivalent: "Change Parameters" (via script calls or plugins) — Use script calls to change parameters of actors.

    ChangeSP (10470)
        MV Equivalent: "Change MP" (Event Command > Actor > Change MP).

    ChangeCondition (10480)
        MV Equivalent: "Change State" (Event Command > Actor > Change State).

    FullHeal (10490)
        MV Equivalent: "Recover All" (Event Command > Actor > Recover All).

    SimulatedAttack (10500)
        MV Equivalent: No direct equivalent — Simulate attacks through scripted events or battle processing.

    ChangeHeroTitle (10620)
        MV Equivalent: No direct equivalent — Change titles or similar effects using variables, custom scripts, or plugins.

    ChangeSpriteAssociation (10630)
        MV Equivalent: "Change Actor Images" (Event Command > Actor > Change Actor Images).

    ChangeActorFace (10640)
        MV Equivalent: "Change Actor Images" (Event Command > Actor > Change Actor Images).

    ChangeVehicleGraphic (10650)
        MV Equivalent: "Change Vehicle Image" (Event Command > System Settings > Change Vehicle Image).

    ChangeSystemBGM (10660)
        MV Equivalent: "Change BGM" (Event Command > System Settings > Change BGM).

    ChangeSystemSFX (10670)
        MV Equivalent: "Change SE" (Event Command > System Settings > Change SE).

    ChangeSystemGraphics (10680)
        MV Equivalent: "Change Window Color" or "Change Screen Tone" (Event Command > System Settings).

    ChangeScreenTransitions (10690)
        MV Equivalent: "Fadeout/Fadein Screen" or "Scroll Map" (Event Command > Screen).

    EnemyEncounter (10710)
        MV Equivalent: "Battle Processing" (Event Command > Battle > Battle Processing).

    ShowInn (10730)
        MV Equivalent: No direct equivalent — Create an inn event with recovery options through custom eventing.

    Teleport (10810)
        MV Equivalent: "Transfer Player" (Event Command > Map > Transfer Player).

    MemorizeLocation (10820)
        MV Equivalent: "Set Movement Route" (via script call/variable) — Store current position using variables.

    RecallToLocation (10830)
        MV Equivalent: "Transfer Player" using memorized variables — Use variables to recall position and transfer player.

    SetVehicleLocation (10850)
        MV Equivalent: "Set Vehicle Location" (Event Command > System Settings > Set Vehicle Location).

    ChangeEventLocation (10860)
        MV Equivalent: "Set Event Location" (Event Command > Map > Set Event Location).

    TradeEventLocations (10870)
        MV Equivalent: No direct equivalent — Manually swap event locations through eventing.

    StoreTerrainID (10910)
        MV Equivalent: No direct equivalent — This would require a script call to get terrain tags.

    StoreEventID (10920)
        MV Equivalent: No direct equivalent — This would require a script or plugin to fetch event IDs.

    PanScreen (11060)
        MV Equivalent: "Scroll Map" (Event Command > Screen > Scroll Map).

    WeatherEffects (11070)
        MV Equivalent: "Change Weather" (Event Command > Screen > Change Weather).

    ShowBattleAnimation (11210)
        MV Equivalent: "Show Animation" (Event Command > Battle > Show Animation).

    SpriteTransparency (11310)
        MV Equivalent: "Change Opacity" (Event Command > Movement > Set Move Route > Change Opacity).

    FlashSprite (11320)
        MV Equivalent: "Flash Screen/Character" (Event Command > Screen).

    MoveEvent (11330)
        MV Equivalent: "Set Move Route" (Event Command > Movement > Set Move Route).

    KeyInputProc (11610)
        MV Equivalent: No direct equivalent — Custom input can be handled through scripts or plugins.

    ChangePBG (11720)
        MV Equivalent: No direct equivalent — Could be handled with scripts or plugin for battle graphics.

    ChangeEncounterRate (11740)
        MV Equivalent: "Change Encounter Rate" (Event Command > System Settings > Change Encounter Rate).

    TileSubstitution (11750)
        MV Equivalent: No direct equivalent — Tile substitution would need to be handled via a plugin.

    TeleportTargets (11810)
        MV Equivalent: "Transfer Player" — Define custom targets through variables.

    ChangeTeleportAccess (11820)
        MV Equivalent: "Enable/Disable Transfer" — Control access using switches and conditions.

    EscapeTarget (11830)
        MV Equivalent: "Escape Processing" — Control access to escape using variables or plugins.

    ChangeEscapeAccess (11840)
        MV Equivalent: "Enable/Disable Escape" — Control escape functionality using switches or scripts.

    ChangeSaveAccess (11930)
        MV Equivalent: "Enable/Disable Save" (Event Command > System Settings > Change Save Access).

    ChangeMainMenuAccess (11960)
        MV Equivalent: "Enable/Disable Menu" (Event Command > System Settings > Change Menu Access).

    CallEvent (12330)
        MV Equivalent: "Call Common Event" (Event Command > Event > Call Common Event).

    ChangeMonsterHP (13110)
        MV Equivalent: "Change Enemy HP" (Event Command > Battle > Change Enemy HP).

    ChangeMonsterMP (13120)
        MV Equivalent: "Change Enemy MP" (Event Command > Battle > Change Enemy MP).

    ChangeMonsterCondition (13130)
        MV Equivalent: "Change Enemy State" (Event Command > Battle > Change Enemy State).

    ShowHiddenMonster (13150)
        MV Equivalent: "Reveal/Conceal Enemy" — Custom eventing using conditions and battle events.

    ChangeBattleBG (13210)
        MV Equivalent: "Change Battle Background" (Event Command > Battle > Change Battle Background).

No Argument Commands:

    OpenLoadMenu (5001)
        MV Equivalent: "Open Save/Load Menu" (Event Command > Scene Control).

    ExitGame (5002)
        MV Equivalent: "Exit Game" (Event Command > Scene Control > Game Over or script).

    ToggleAtbMode (5003)
        MV Equivalent: No direct equivalent — Customize battle mode via plugins.

    ToggleFullscreen (5004)
        MV Equivalent: "Toggle Fullscreen" — Custom script call required.

    OpenVideoOptions (5005)
        MV Equivalent: No direct equivalent — This would require a plugin for video options.

    ProceedWithMovement (11340)
        MV Equivalent: "Proceed with Move Route" — Customize via event commands.

    HaltAllMovement (11350)
        MV Equivalent: "Halt Movement" — Manage movement with switches or eventing.

    EnterExitVehicle (10840)
        MV Equivalent: "Enter/Exit Vehicle" — Use event command or custom scripts.

    TerminateBattle (13410)
        MV Equivalent: "Abort Battle" (Event Command > Battle > Abort Battle).

Note:

Some of the commands from RPG Maker 2003 may require scripting or plugin solutions to achieve in RPG Maker MV, as MV has a different event system and lacks some of the old hard-coded event commands. You'll need to utilize JavaScript and plugins for more complex commands that don't have direct event command equivalents.
 */

const eventCodeTranslator : EventCodeTranslator = {
  ChangeClass: { code: 1008, remap: 321 },
  ShowMessage: { code: 10110, remap: -1 },
  SetSpeaker: { code: 10130, remap: 101 },
  TintScreen: { code: 11030, remap: 223 },
  TransferPlayer: { code: 10810, remap: 201 },
  ChangeExp: { code: 10410, remap: 315 },
  ChangeLevel: { code: 10420, remap: 316 },
  CommentCode: { code: 22410, remap: 108 },
  ContinueTalk: { code: 20110, remap: 401 },
  ReturnToTitleScreen: { code: 12510, remap: 354 },
  GameOver: { code: 12420, remap: 353 },
  EraseEvent: { code: 12320, remap: 214 },
  Loop: { code: 12210, remap: 112 },
  BreakLoop: { code: 12220, remap: 113 },
  OpenSaveMenu: { code: 11910, remap: 352 },
  OpenMenu: { code: 11950, remap: 351 },
  SaveBGM: { code: 11530, remap: 243 },
  ResumeBGM: { code: 11540, remap: 244 },
  EndEventProcessing: { code: 12310, remap: 115 },
  CommonEvent: { code: 1005, remap: 117 },
  Label: { code: 12110, remap: 118 },
  JumpToLabel: { code: 12120, remap: 119 },
  ShowPicture: { code: 11110, remap: 231 },
  MovePicture: { code: 11120, remap: 232 },
  ErasePicture: { code: 11130, remap: 235 },
  PlayBGM: { code: 11510, remap: 241 },
  FadeoutBGM: { code: 11520, remap: 242 },
  ShowChoices: { code: 10140, remap: 102 },
  InputNumber: { code: 10150, remap: 103 },
  ControlSwitches: { code: 10210, remap: 121 },
  ControlVariables: { code: 10220, remap: 122 },
  ControlTimer: { code: 10230, remap: 124 },
  ChangeGold: { code: 10310, remap: 125 },
  ChangeItems: { code: 10320, remap: 126 },
  Wait: { code: 11410, remap: 230 },
  PlayMovie: { code: 11560, remap: 261 },
  PlaySound: { code: 11550, remap: 250 },
  EnterName: { code: 10740, remap: 303 }, // 2003
  ChangeName: { code: 10610, remap: 303 }, // 2003
  ChangeTileset: { code: 11710, remap: 283 },
  ConditionalBranch: { code: 12010, remap: 111 },
  FlashScreen: { code: 11040, remap: 224 },
  FadeoutScreen: { code: 11010, remap: 221 },
  FadeinScreen: { code: 11020, remap: 222 },
  ShakeScreen: { code: 11050, remap: 225 },
  ChangeHP: { code: 10460, remap: 311 },
  ShopProcessing: { code: 10720, remap: 302 },
  ChangeSkill: { code: 10440, remap: 318 },
  ChangeEquipment: { code: 10450, remap: 319 }
};

/*
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



export function remapMapEventCode(
  newCommands: EventCommand[],
  oldCommands: DBEventCommand[]
) {
  const properCommands = oldCommands as DBEventCommand[];
  let lastSpeechBubble: EventCommand = {} as EventCommand;
  properCommands.forEach((command) => {
    // TODO: Check for the rest of the commands

    const translation = Object.values(eventCodeTranslator).find(
      (entry) => entry.code === parseInt(command.code)
    );
    const newCode = translation ? translation.remap : 0;

    if (newCode == -1 && lastSpeechBubble.code != null) {
      newCommands.push(lastSpeechBubble);
      // Begin New dialog
    } else {
      const newIndent = parseInt(command.indent);
      const parameters: unknown[] = [];

      const commandString = command.string == null ? '' : command.string + ' ';
      parameters.push(commandString);
      if (command.parameters[0] != null) {
        parameters.push(...command.parameters[0].split(' ').map(convertToNum));
      }
      const eventCommand = {
        code: newCode,
        indent: newIndent,
        parameters: parameters
      };
      if (eventCommand.code == eventCodeTranslator.SetSpeaker.remap) {
        // Set speaker
        lastSpeechBubble = eventCommand;
        // Storing for later
      } else {
        // Adding to list
        newCommands.push(eventCommand);
      }
    }
  });
  const emptyCommand = { code: 0, indent: 0, parameters: [] };
  newCommands.push(emptyCommand);
}