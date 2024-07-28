export interface DBItem {
  name: string;
  description: string;
  type: string;
  price: string;
  uses: string;
  atk_points1: string;
  def_points1: string;
  spi_points1: string;
  agi_points1: string;
  two_handed: TrueFalse;
  sp_cost: string;
  hit: string;
  critical_hit: string;
  animation_id: string;
  preemptive: TrueFalse;
  dual_attack: TrueFalse;
  attack_all: TrueFalse;
  ignore_evasion: TrueFalse;
  prevent_critical: TrueFalse;
  raise_evasion: TrueFalse;
  half_sp_cost: TrueFalse;
  no_terrain_damage: TrueFalse;
  cursed: TrueFalse;
  entire_party: TrueFalse;
  recover_hp_rate: string;
  recover_hp: string;
  recover_sp_rate: string;
  recover_sp: string;
  occasion_field1: TrueFalse;
  ko_only: TrueFalse;
  max_hp_points: string;
  max_sp_points: string;
  atk_points2: string;
  def_points2: string;
  spi_points2: string;
  agi_points2: string;
  using_message: string;
  skill_id: string;
  switch_id: string;
  occasion_field2: TrueFalse;
  occasion_battle: TrueFalse;
  actor_set: string;
  state_set: string;
  attribute_set: string;
  state_chance: string;
  reverse_state_effect: TrueFalse;
  weapon_animation: string;
  animation_data: AnimationData;
  use_skill: TrueFalse;
  class_set: string;
  ranged_trajectory: string;
  ranged_target: string;
  easyrpg_using_message: string;
  easyrpg_max_count: string;
}

export interface AnimationData {
  BattlerAnimationItemSkill: BattlerAnimationItemSkill[];
}

export interface BattlerAnimationItemSkill {
  unknown02: string;
  type: string;
  weapon_animation_id: string;
  movement: string;
  after_image: string;
  attacks: string;
  ranged: TrueFalse;
  ranged_animation_id: string;
  ranged_speed: string;
  battle_animation_id: string;
  pose: string;
}

export enum TrueFalse {
  F = 'F',
  T = 'T'
}