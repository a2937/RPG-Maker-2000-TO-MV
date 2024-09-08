// To parse this data:
//
//   import { Convert, Welcome8 } from "./file";
//
//   const welcome8 = Convert.toWelcome8(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface EditableDB {
  Database: Database;
}

export interface Database {
  actors: Actors;
  skills: Skills;
  items: Items;
  enemies: Enemies;
  troops: Troops;
}

export interface Actors {
  Actor: DBActor[];
}

export interface DBActor {
  '@':
  {
    id: string
  }
  name: string;
  title: string;
  character_name: string;
  character_index: number;
  transparent: 'T' | 'F';
  initial_level: number;
  final_level: number;
  critical_hit: 'T' | 'F';
  critical_hit_chance: number;
  face_name: string;
  face_index: number;
  two_weapon: 'T' | 'F';
  lock_equipment: 'T' | 'F';
  auto_battle: 'T' | 'F';
  super_guard: 'T' | 'F';
  parameters: Parameters;
  exp_base: number;
  exp_inflation: number;
  exp_correction: number;
  initial_equipment: InitialEquipment;
  unarmed_animation: number;
  class_id: number;
  battle_x: number;
  battle_y: number;
  battler_animation: number;
  skills: string;
  rename_skill: 'T' | 'F';
  skill_name: string;
  state_ranks: string;
  attribute_ranks: string;
  battle_commands: string;
}

export interface InitialEquipment {
  Equipment: Equipment;
}

export interface Equipment {
  weapon_id: number;
  shield_id: number;
  armor_id: number;
  helmet_id: number;
  accessory_id: number;
}

export interface Parameters {
  Parameters: ParametersClass;
}

export interface ParametersClass {
  maxhp: string;
  maxsp: string;
  attack: string;
  defense: string;
  spirit: string;
  agility: string;
}

export interface Enemies {
  Enemy: Enemy[];
}

export interface Enemy {
  name: string;
  battler_name: string;
  battler_hue: number;
  max_hp: number;
  max_sp: number;
  attack: number;
  defense: number;
  spirit: number;
  agility: number;
  transparent: 'T' | 'F';
  exp: number;
  gold: number;
  drop_id: number;
  drop_prob: number;
  critical_hit: 'T' | 'F';
  critical_hit_chance: number;
  miss: 'T' | 'F';
  levitate: 'T' | 'F';
  state_ranks: string;
  attribute_ranks: number | string;
  actions: Actions;
  maniac_unarmed_animation: number;
  easyrpg_enemyai: number;
  easyrpg_prevent_critical: 'T' | 'F';
  easyrpg_raise_evasion: 'T' | 'F';
  easyrpg_immune_to_attribute_downshifts: 'T' | 'F';
  easyrpg_ignore_evasion: 'T' | 'F';
  easyrpg_hit: number;
  easyrpg_state_set: string;
  easyrpg_state_chance: number;
  easyrpg_attribute_set: string;
  easyrpg_super_guard: 'T' | 'F';
  easyrpg_attack_all: 'T' | 'F';
}

export interface Actions {
  EnemyAction: EnemyActionElement[] | EnemyActionElement;
}

export interface EnemyActionElement {
  kind: number;
  basic: number;
  skill_id: number;
  enemy_id: number;
  condition_type: number;
  condition_param1: number;
  condition_param2: number;
  switch_id: number;
  switch_on: 'T' | 'F';
  switch_on_id: number;
  switch_off: 'T' | 'F';
  switch_off_id: number;
  rating: number;
}

export interface Items {
  Item: Item[];
}

export interface Item {
  name: string;
  description: string;
  type: number;
  price: number;
  uses: number;
  atk_points1: number;
  def_points1: number;
  spi_points1: number;
  agi_points1: number;
  two_handed: 'T' | 'F';
  sp_cost: number;
  hit: number;
  critical_hit: number;
  animation_id: number;
  preemptive: 'T' | 'F';
  dual_attack: 'T' | 'F';
  attack_all: 'T' | 'F';
  ignore_evasion: 'T' | 'F';
  prevent_critical: 'T' | 'F';
  raise_evasion: 'T' | 'F';
  half_sp_cost: 'T' | 'F';
  no_terrain_damage: 'T' | 'F';
  cursed: 'T' | 'F';
  entire_party: 'T' | 'F';
  recover_hp_rate: number;
  recover_hp: number;
  recover_sp_rate: number;
  recover_sp: number;
  occasion_field1: 'T' | 'F';
  ko_only: 'T' | 'F';
  max_hp_points: number;
  max_sp_points: number;
  atk_points2: number;
  def_points2: number;
  spi_points2: number;
  agi_points2: number;
  using_message: number;
  skill_id: number;
  switch_id: number;
  occasion_field2: 'T' | 'F';
  occasion_battle: 'T' | 'F';
  actor_set: ActorSet;
  state_set: StateSet;
  attribute_set: AttributeSet;
  state_chance: number;
  reverse_state_effect: 'T' | 'F';
  weapon_animation: number;
  animation_data: AnimationData;
  use_skill: 'T' | 'F';
  class_set: string;
  ranged_trajectory: number;
  ranged_target: number;
  easyrpg_using_message: EasyrpgMessage;
  easyrpg_max_count: number;
}

export enum ActorSet {
  Empty = '',
  FFFFFFFFFFFFFF = 'F F F F F F F F F F F F F F',
  FFFFFFFFFFFFFFF = 'F F F F F F F F F F F F F F F',
  TTTTTTTTTTTTTT = 'T T T T T T T T T T T T T T'
}

export interface AnimationData {
  BattlerAnimationItemSkill:
    | BattlerAnimationItemSkillElement[]
    | BattlerAnimationItemSkillElement;
}

export interface BattlerAnimationItemSkillElement {
  unknown02: number;
  type: number;
  weapon_animation_id: number;
  movement: number;
  after_image: number;
  attacks: number;
  ranged: 'T' | 'F';
  ranged_animation_id: number;
  ranged_speed: number;
  battle_animation_id: number;
  pose: number;
}

export enum AttributeSet {
  Empty = '',
  FFFT = 'F F F T',
  FFT = 'F F T',
  FT = 'F T',
  T = 'T',
  TFT = 'T F T',
  TT = 'T T',
  TTT = 'T T T'
}

export enum EasyrpgMessage {
  DefaultMessage = 'default_message'
}

export enum StateSet {
  Empty = '',
  FFFFTT = 'F F F F T T',
  FFFT = 'F F F T',
  FFT = 'F F T',
  FT = 'F T',
  FTTTTTTT = 'F T T T T T T T',
  T = 'T',
  TTTTTTTT = 'T T T T T T T T'
}

export interface Skills {
  Skill: Skill[];
}

export interface Skill {
  name: string;
  description: string;
  using_message1: string;
  using_message2: string;
  failure_message: number;
  type: number;
  sp_type: number;
  sp_percent: number;
  sp_cost: number;
  scope: number;
  switch_id: number;
  animation_id: number;
  sound_effect: SoundEffect;
  occasion_field: 'T' | 'F';
  occasion_battle: 'T' | 'F';
  reverse_state_effect: 'T' | 'F';
  physical_rate: number;
  magical_rate: number;
  variance: number;
  power: number;
  hit: number;
  affect_hp: 'T' | 'F';
  affect_sp: 'T' | 'F';
  affect_attack: 'T' | 'F';
  affect_defense: 'T' | 'F';
  affect_spirit: 'T' | 'F';
  affect_agility: 'T' | 'F';
  absorb_damage: 'T' | 'F';
  ignore_defense: 'T' | 'F';
  state_effects: string;
  attribute_effects: string;
  affect_attr_defence: 'T' | 'F';
  battler_animation: number;
  battler_animation_data: BattlerAnimationData;
  easyrpg_battle2k3_message: EasyrpgMessage;
  easyrpg_ignore_reflect: 'T' | 'F';
  easyrpg_state_hit: number;
  easyrpg_attribute_hit: number;
  easyrpg_ignore_restrict_skill: 'T' | 'F';
  easyrpg_ignore_restrict_magic: 'T' | 'F';
  easyrpg_enable_stat_absorbing: 'T' | 'F';
  easyrpg_affected_by_evade_all_physical_attacks: 'T' | 'F';
  easyrpg_critical_hit_chance: number;
  easyrpg_affected_by_row_modifiers: 'T' | 'F';
  easyrpg_hp_type: number;
  easyrpg_hp_percent: number;
  easyrpg_hp_cost: number;
}

export interface BattlerAnimationData {
  BattlerAnimationItemSkill: BattlerAnimationItemSkillElement[];
}

export interface SoundEffect {
  Sound: Sound;
}

export interface Sound {
  name: Name;
  volume: number;
  tempo: number;
  balance: number;
}

export enum Name {
  Off = '(OFF)',
  Teleport1 = 'Teleport1'
}

export interface Troops {
  Troop: Troop[];
}

export interface Troop {
  name: string;
  members: Members;
  auto_alignment: 'T' | 'F';
  terrain_set: string;
  appear_randomly: 'T' | 'F';
  pages: Pages;
}

export interface Members {
  TroopMember: TroopMemberElement[] | TroopMemberElement;
}

export interface TroopMemberElement {
  enemy_id: number;
  x: number;
  y: number;
  invisible: 'T' | 'F';
}

export interface Pages {
  TroopPage: TroopPage;
}

export interface TroopPage {
  condition: Condition;
  event_commands: string;
}

export interface Condition {
  TroopPageCondition: TroopPageCondition;
}

export interface TroopPageCondition {
  flags: Flags;
  switch_a_id: number;
  switch_b_id: number;
  variable_id: number;
  variable_value: number;
  turn_a: number;
  turn_b: number;
  fatigue_min: number;
  fatigue_max: number;
  enemy_id: number;
  enemy_hp_min: number;
  enemy_hp_max: number;
  actor_id: number;
  actor_hp_min: number;
  actor_hp_max: number;
  turn_enemy_id: number;
  turn_enemy_a: number;
  turn_enemy_b: number;
  turn_actor_id: number;
  turn_actor_a: number;
  turn_actor_b: number;
  command_actor_id: number;
  command_id: number;
}

export interface Flags {
  TroopPageCondition_Flags: TroopPageConditionFlags;
}

export interface TroopPageConditionFlags {
  switch_a: 'T' | 'F';
  switch_b: 'T' | 'F';
  variable: 'T' | 'F';
  turn: 'T' | 'F';
  fatigue: 'T' | 'F';
  enemy_hp: 'T' | 'F';
  actor_hp: 'T' | 'F';
  turn_enemy: 'T' | 'F';
  turn_actor: 'T' | 'F';
  command_actor: 'T' | 'F';
}
