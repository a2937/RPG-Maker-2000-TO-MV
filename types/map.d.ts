export interface Map {
  autoplayBgm: boolean;
  autoplayBgs: boolean;
  battleback1Name: string;
  battleback2Name: string;
  bgm: Bgm;
  bgs: Bgs;
  disableDashing: boolean;
  displayName: string;
  encounterList: unknown[];
  encounterStep: number;
  height: number;
  note: string;
  parallaxLoopX: boolean;
  parallaxLoopY: boolean;
  parallaxName: string;
  parallaxShow: boolean;
  parallaxSx: number;
  parallaxSy: number;
  scrollType: number;
  specifyBattleback: boolean;
  tilesetId: number;
  width: number;
  data: number[];
  events: Event[];
}

export interface Bgm {
  name: string;
  pan: number;
  pitch: number;
  volume: number;
}

export interface Bgs {
  name: string;
  pan: number;
  pitch: number;
  volume: number;
}

export interface Event {
  id: number;
  name: string;
  note: string;
  pages: Page[];
  x: number;
  y: number;
}

export interface Page {
  conditions: Conditions;
  directionFix: boolean;
  image: Image;
  list: EventCommand[];
  moveFrequency: number;
  moveRoute: MoveRoute;
  moveSpeed: number;
  moveType: number;
  priorityType: number;
  stepAnime: boolean;
  through: boolean;
  trigger: number;
  walkAnime: boolean;
}

export interface Conditions {
  actorId: number;
  actorValid: boolean;
  itemId: number;
  itemValid: boolean;
  selfSwitchCh: string;
  selfSwitchValid: boolean;
  switch1Id: number;
  switch1Valid: boolean;
  switch2Id: number;
  switch2Valid: boolean;
  variableId: number;
  variableValid: boolean;
  variableValue: number;
}

export interface Image {
  tileId: number;
  characterName: string;
  direction: number;
  pattern: number;
  characterIndex: number;
}

export interface EventCommand {
  code: number;
  indent: number;
  parameters: unknown[];
}

export interface MoveRoute {
  list: MoveCommands[];
  repeat: boolean;
  skippable: boolean;
  wait: boolean;
}

export interface MoveCommands {
  code: number;
  parameters: unknown[];
}
