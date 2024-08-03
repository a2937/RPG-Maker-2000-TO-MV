export interface Member {
  enemyId: number;
  x: number;
  y: number;
  hidden: boolean;
}

export interface Page {
  conditions: Conditions;
  list: List[];
  span: number;
}

interface Members extends Array<Member> { }

interface Pages extends Array<Page> {}


export interface Troop {
  id: number;
  members: Members;
  name: string;
  pages: Pages;
}



export interface Conditions {
  actorHp: number;
  actorId: number;
  actorValid: boolean;
  enemyHp: number;
  enemyIndex: number;
  enemyValid: boolean;
  switchId: number;
  switchValid: boolean;
  turnA: number;
  turnB: number;
  turnEnding: boolean;
  turnValid: boolean;
}

export interface List {
  code: number;
  indent: number;
  parameters: unknown[];
}
