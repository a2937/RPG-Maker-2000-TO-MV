export interface DBMap {
  chipset_id: string;
  width: string;
  height: string;
  scroll_type: string;
  parallax_flag: RPGBool;
  parallax_name: string;
  parallax_loop_x: RPGBool;
  parallax_loop_y: RPGBool;
  parallax_auto_loop_x: RPGBool;
  parallax_sx: string;
  parallax_auto_loop_y: RPGBool;
  parallax_sy: string;
  generator_flag: RPGBool;
  generator_mode: string;
  top_level: RPGBool;
  generator_tiles: string;
  generator_width: string;
  generator_height: string;
  generator_surround: RPGBool;
  generator_upper_wall: RPGBool;
  generator_floor_b: RPGBool;
  generator_floor_c: RPGBool;
  generator_extra_b: RPGBool;
  generator_extra_c: RPGBool;
  generator_x: string;
  generator_y: string;
  generator_tile_ids: string;
  lower_layer: string;
  upper_layer: string;
  events: Events[];
  save_count_2k3e: string;
  save_count: string;
}



export interface Events {
  Event: DBEvent[];
}

export interface DBEvent {
  name: string;
  x: string;
  y: string;
  pages: Pages[];
}

export interface Pages {
  EventPage: DBPage[];
}

export interface DBPage {
  condition: Condition[];
  character_name: string;
  character_index: string;
  character_direction: string;
  character_pattern: string;
  translucent: RPGBool;
  move_type: string;
  move_frequency: string;
  trigger: string;
  layer: string;
  overlap_forbidden: RPGBool;
  animation_type: string;
  move_speed: string;
  move_route: MoveRoute;
  event_commands: EventCommandsClass[];
}


export interface Condition {
  EventPageCondition: EventPageCondition[];
}

export interface EventPageCondition {
  flags: Flags[];
  switch_a_id: string;
  switch_b_id: string;
  variable_id: string;
  variable_value: string;
  item_id: string;
  actor_id: string;
  timer_sec: string;
  timer2_sec: string;
  compare_operator: string;
}

export interface Flags {
  EventPageCondition_Flags: EventPageConditionFlags[];
}

export interface EventPageConditionFlags {
  switch_a: RPGBool;
  switch_b: RPGBool;
  variable: RPGBool;
  item: RPGBool;
  actor: RPGBool;
  timer: RPGBool;
  timer2: RPGBool;
}

export enum RPGBool {
  F = 'F',
  T = 'T'
}

export interface EventCommandsClass {
  EventCommand: DBEventCommand[];
}

export interface DBEventCommand {
  code: string;
  indent: string;
  string: string;
  parameters: string;
}

export interface MoveRoute {
  MoveRoute: MoveRouteClass;
}

export interface MoveRouteClass {
  move_commands: string;
  repeat: RPGBool;
  skippable: RPGBool;
}
