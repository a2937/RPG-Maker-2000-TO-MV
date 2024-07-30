export interface DBEnemy {
  name: string;
  battler_name: string;
  battler_hue: string;
  max_hp: string;
  max_sp: string;
  attack: string;
  defense: string;
  spirit: string;
  agility: string;
  transparent: string;
  exp: string;
  gold: string;
  drop_id: string;
  drop_prob: string;
  critical_hit: string;
  critical_hit_chance: string;
  miss: string;
  levitate: string;
  state_ranks: string;
  attribute_ranks: string;
  actions: Actions;
  maniac_unarmed_animation: string;
  easyrpg_enemyai: string;
  easyrpg_prevent_critical: string;
  easyrpg_raise_evasion: string;
  easyrpg_immune_to_attribute_downshifts: string;
  easyrpg_ignore_evasion: string;
  easyrpg_hit: string;
  easyrpg_state_set: string;
  easyrpg_state_chance: string;
  easyrpg_attribute_set: string;
  easyrpg_super_guard: string;
  easyrpg_attack_all: string;
}

export interface Actions {
  EnemyAction: EnemyAction;
}

export interface EnemyAction {
  kind: string;
  basic: string;
  skill_id: string;
  enemy_id: string;
  condition_type: string;
  condition_param1: string;
  condition_param2: string;
  switch_id: string;
  switch_on: string;
  switch_on_id: string;
  switch_off: string;
  switch_off_id: string;
  rating: string;
}
