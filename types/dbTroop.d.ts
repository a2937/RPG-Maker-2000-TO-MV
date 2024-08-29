export interface DBTroop {
  name: string;
  members: TroopMemberList[];
  auto_alignment: string;
  terrain_set: string;
  appear_randomly: string;
  pages: DBPage[];
}

export interface TroopMemberList
{
  TroopMember: TroopMemberElement[] 
}

export interface TroopMemberElement {
  enemy_id: string;
  x: string;
  y: string;
  invisible: string;
}

export interface DBPage {
  TroopPage: DBTroopPage[];
}

export interface DBTroopPage {
  condition: Condition[];
  event_commands: EventCommandsClass[];
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


export interface Condition {
  TroopPageCondition: TroopPageCondition[];
}

export interface TroopPageCondition {
  flags: Flags[];
  switch_a_id: string;
  switch_b_id: string;
  variable_id: string;
  variable_value: string;
  turn_a: string;
  turn_b: string;
  fatigue_min: string;
  fatigue_max: string;
  enemy_id: string;
  enemy_hp_min: string;
  enemy_hp_max: string;
  actor_id: string;
  actor_hp_min: string;
  actor_hp_max: string;
  turn_enemy_id: string;
  turn_enemy_a: string;
  turn_enemy_b: string;
  turn_actor_id: string;
  turn_actor_a: string;
  turn_actor_b: string;
  command_actor_id: string;
  command_id: string;
}

export interface Flags {
  TroopPageCondition_Flags: TroopPageConditionFlags[];
}

export interface TroopPageConditionFlags {
  switch_a: string;
  switch_b: string;
  variable: string;
  turn: string;
  fatigue: string;
  enemy_hp: string;
  actor_hp: string;
  turn_enemy: string;
  turn_actor: string;
  command_actor: string;
}
