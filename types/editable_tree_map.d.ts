export interface EditableTreeMap {
  TreeMap: TreeMap;
}

export interface TreeMap {
  maps: Maps;
  tree_order: string;
  active_node: number;
  start: Start;
}

export interface Maps {
  MapInfo: DBMapInfo[];
}

export interface DBMapInfo {
  "@": {
    id: string 
  }
  name: string;
  parent_map: number;
  indentation: number;
  type: number;
  scrollbar_x: number;
  scrollbar_y: number;
  expanded_node: string;
  music_type: number;
  music: Music;
  background_type: number;
  background_name: string;
  teleport: number;
  escape: number;
  save: number;
  encounters: string;
  encounter_steps: number;
  area_rect: AreaRect;
}

export interface AreaRect {
  Rect: Rect;
}

export interface Rect {
  l: number;
  t: number;
  r: number;
  b: number;
}

export interface Music {
  Music: MusicClass;
}

export interface MusicClass {
  name: string;
  fadein: number;
  volume: number;
  tempo: number;
  balance: number;
}

export interface Start {
  Start: { [key: string]: number };
}
