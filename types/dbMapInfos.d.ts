export interface DBMapInfo {
  $: ID; 
  name: string;
  parent_map: string;
  indentation: string;
  type: string;
  scrollbar_x: string;
  scrollbar_y: string;
  expanded_node: string;
  music_type: string;
  music: Music[];
  background_type: string;
  background_name: string;
  teleport: string;
  escape: string;
  save: string;
  encounters: string;
  encounter_steps: string;
  area_rect: AreaRect;
}

export interface ID
{
  id: string 
}
export interface AreaRect {
  Rect: Rect;
}

export interface Rect {
  l: string;
  t: string;
  r: string;
  b: string;
}

export interface Music {
  Music: MusicClass[];
}

export interface MusicClass {
  name: string;
  fadein: string;
  volume: string;
  tempo: string;
  balance: string;
}
