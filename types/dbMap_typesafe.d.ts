export interface TypesafeDBMap {
  Map: DBMap;
}

export interface DBMap {
  chipset_id: number;
  width: number;
  height: number;
  scroll_type: number;
  parallax_flag: "T" | "F";
  parallax_name: string;
  parallax_loop_x: "T" | "F";
  parallax_loop_y: "T" | "F";
  parallax_auto_loop_x: "T" | "F";
  parallax_sx: number;
  parallax_auto_loop_y: "T" | "F";
  parallax_sy: number;
  generator_flag: "T" | "F";
  generator_mode: number;
  top_level: "T" | "F";
  generator_tiles: number;
  generator_width: number;
  generator_height: number;
  generator_surround: "T" | "F";
  generator_upper_wall: "T" | "F";
  generator_floor_b: "T" | "F";
  generator_floor_c: "T" | "F";
  generator_extra_b: "T" | "F";
  generator_extra_c: "T" | "F";
  generator_x: string;
  generator_y: string;
  generator_tile_ids: string;
  lower_layer: string;
  upper_layer: string;
  events: Events;
  save_count_2k3e: number;
  save_count: number;
}

export interface Events {
  Event: Event[];
}

export interface Event {
  '@':
  {
    id: string
  }
  name: string;
  x: number;
  y: number;
  pages: Pages;
}

export interface Pages {
  EventPage: EventPage[];
}

export interface EventPage {
  condition: Condition;
  character_name: string;
  character_index: number;
  character_direction: number;
  character_pattern: number;
  translucent: "T" | "F";
  move_type: number;
  move_frequency: number;
  trigger: number;
  layer: number;
  overlap_forbidden: "T" | "F";
  animation_type: number;
  move_speed: number;
  move_route: MoveRoute;
  event_commands: EventCommandsClass | string;
}



export interface Condition {
  EventPageCondition: EventPageCondition;
}

export interface EventPageCondition {
  flags: Flags;
  switch_a_id: number;
  switch_b_id: number;
  variable_id: number;
  variable_value: number;
  item_id: number;
  actor_id: number;
  timer_sec: number;
  timer2_sec: number;
  compare_operator: number;
}

export interface Flags {
  EventPageCondition_Flags: EventPageConditionFlags;
}

export interface EventPageConditionFlags {
  switch_a: "T" | "F";
  switch_b: "T" | "F";
  variable: "T" | "F";
  item: "T" | "F";
  actor: "T" | "F";
  timer: "T" | "F";
  timer2: "T" | "F";
}


export interface EventCommandsClass {
  EventCommand: EventCommand[];
}

export interface EventCommand {
  code: number;
  indent: number;
  string: string;
  parameters: string;
}

export interface MoveRoute {
  MoveRoute: MoveRouteClass;
}

export interface MoveRouteClass {
  move_commands: string;
  repeat: "T" | "F";
  skippable: "T" | "F";
}
