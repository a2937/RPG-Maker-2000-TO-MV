export interface Class {
  id: number;
  expParams: number[];
  traits: Trait[];
  learnings: Learning[];
  name: string;
  note: string;
  params: number[][];
}

export interface Trait {
  code: number;
  dataId: number;
  value: number;
}

export interface Learning {
  level: number;
  note: string;
  skillId: number;
}
