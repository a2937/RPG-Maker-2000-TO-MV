export interface DBEnemy {
  name: string;
  battler_name: string;
  battler_hue: number;
  max_hp: number;
  max_sp: number;
  attack: number;
  defense: number;
  spirit: number;
  agility: number;
  transparent: string;
  exp: number;
  gold: number;
  drop_id: number;
  drop_prob: number;
  critical_hit: string;
  critical_hit_chance: number;
  miss: string;
  levitate: string;
  state_ranks: string;
  attribute_ranks: string;
  actions: Actions;
  maniac_unarmed_animation: number;
  easyrpg_enemyai: number;
  easyrpg_prevent_critical: string;
  easyrpg_raise_evasion: string;
  easyrpg_immune_to_attribute_downshifts: string;
  easyrpg_ignore_evasion: string;
  easyrpg_hit: number;
  easyrpg_state_set: string;
  easyrpg_state_chance: number;
  easyrpg_attribute_set: string;
  easyrpg_super_guard: string;
  easyrpg_attack_all: string;
}

export interface Actions {
  EnemyAction: EnemyAction;
}

export interface EnemyAction {
  kind: number;
  basic: number;
  skill_id: number;
  enemy_id: number;
  condition_type: number;
  condition_param1: number;
  condition_param2: number;
  switch_id: number;
  switch_on: string;
  switch_on_id: number;
  switch_off: string;
  switch_off_id: number;
  rating: number;
}
