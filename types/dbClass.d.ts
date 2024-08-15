export interface DBClass {
  name: string[];
  two_weapon: string[];
  lock_equipment: string[];
  auto_battle: string[];
  super_guard: string[];
  parameters: DBParameters[];
  exp_base: string;
  exp_inflation: string;
  exp_correction: string;
  battler_animation: string;
  skills: DBSkills[];
  state_ranks: string[];
  attribute_ranks: string[];
  battle_commands: string[];
}

export interface DBParameters {
  Parameters: DBParametersClass[];
}

export interface DBParametersClass {
  maxhp: string[];
  maxsp: string[];
  attack: string[];
  defense: string[];
  spirit: string[];
  agility: string[];
}

export interface DBSkills {
  Learning: DBLearning[];
}

export interface DBLearning {
  level: string;
  skill_id: string;
}
