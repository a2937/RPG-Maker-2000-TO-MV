export interface Enemy {
  id: number;
  actions: Action[];
  battlerHue: number;
  battlerName: string;
  dropItems: DropItem[];
  exp: number;
  traits: Trait[];
  gold: number;
  name: string;
  note: string;
  params: number[];
}

export interface Action {
  conditionParam1: number;
  conditionParam2: number;
  conditionType: number;
  rating: number;
  skillId: number;
}

export interface DropItem {
  dataId: number;
  denominator: number;
  kind: number;
}

export interface Trait {
  code: number;
  dataId: number;
  value: number;
}
