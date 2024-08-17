export interface System {
  airship: Airship;
  armorTypes: string[];
  attackMotions: AttackMotion[];
  battleBgm: BattleBgm;
  battleback1Name: string;
  battleback2Name: string;
  battlerHue: number;
  battlerName: string;
  boat: Boat;
  currencyUnit: string;
  defeatMe: DefeatMe;
  editMapId: number;
  elements: string[];
  equipTypes: string[];
  gameTitle: string;
  gameoverMe: GameoverMe;
  locale: string;
  magicSkills: number[];
  menuCommands: boolean[];
  optDisplayTp: boolean;
  optDrawTitle: boolean;
  optExtraExp: boolean;
  optFloorDeath: boolean;
  optFollowers: boolean;
  optSideView: boolean;
  optSlipDeath: boolean;
  optTransparent: boolean;
  partyMembers: number[];
  ship: Ship;
  skillTypes: string[];
  sounds: Sound[];
  startMapId: number;
  startX: number;
  startY: number;
  switches: string[];
  terms: Terms;
  testBattlers: TestBattler[];
  testTroopId: number;
  title1Name: string;
  title2Name: string;
  titleBgm: TitleBgm;
  variables: string[];
  versionId: number;
  victoryMe: VictoryMe;
  weaponTypes: string[];
  windowTone: number[];
}

export interface Airship {
  bgm: Bgm;
  characterIndex: number;
  characterName: string;
  startMapId: number;
  startX: number;
  startY: number;
}

export interface Bgm {
  name: string;
  pan: number;
  pitch: number;
  volume: number;
}

export interface AttackMotion {
  type: number;
  weaponImageId: number;
}

export interface BattleBgm {
  name: string;
  pan: number;
  pitch: number;
  volume: number;
}

export interface Boat {
  bgm: Bgm2;
  characterIndex: number;
  characterName: string;
  startMapId: number;
  startX: number;
  startY: number;
}

export interface Bgm2 {
  name: string;
  pan: number;
  pitch: number;
  volume: number;
}

export interface DefeatMe {
  name: string;
  pan: number;
  pitch: number;
  volume: number;
}

export interface GameoverMe {
  name: string;
  pan: number;
  pitch: number;
  volume: number;
}

export interface Ship {
  bgm: Bgm3;
  characterIndex: number;
  characterName: string;
  startMapId: number;
  startX: number;
  startY: number;
}

export interface Bgm3 {
  name: string;
  pan: number;
  pitch: number;
  volume: number;
}

export interface Sound {
  name: string;
  pan: number;
  pitch: number;
  volume: number;
}

export interface Terms {
  basic: string[];
  commands: string | undefined[];
  params: string[];
  messages: Messages;
}

export interface Messages {
  actionFailure: string;
  actorDamage: string;
  actorDrain: string;
  actorGain: string;
  actorLoss: string;
  actorNoDamage: string;
  actorNoHit: string;
  actorRecovery: string;
  alwaysDash: string;
  bgmVolume: string;
  bgsVolume: string;
  buffAdd: string;
  buffRemove: string;
  commandRemember: string;
  counterAttack: string;
  criticalToActor: string;
  criticalToEnemy: string;
  debuffAdd: string;
  defeat: string;
  emerge: string;
  enemyDamage: string;
  enemyDrain: string;
  enemyGain: string;
  enemyLoss: string;
  enemyNoDamage: string;
  enemyNoHit: string;
  enemyRecovery: string;
  escapeFailure: string;
  escapeStart: string;
  evasion: string;
  expNext: string;
  expTotal: string;
  file: string;
  levelUp: string;
  loadMessage: string;
  magicEvasion: string;
  magicReflection: string;
  meVolume: string;
  obtainExp: string;
  obtainGold: string;
  obtainItem: string;
  obtainSkill: string;
  partyName: string;
  possession: string;
  preemptive: string;
  saveMessage: string;
  seVolume: string;
  substitute: string;
  surprise: string;
  useItem: string;
  victory: string;
}

export interface TestBattler {
  actorId: number;
  equips: number[];
  level: number;
}

export interface TitleBgm {
  name: string;
  pan: number;
  pitch: number;
  volume: number;
}

export interface VictoryMe {
  name: string;
  pan: number;
  pitch: number;
  volume: number;
}
