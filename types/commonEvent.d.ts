export interface CommonEvent {
  id: number;
  list: EventList[];
  name: string;
  switchId: number;
  trigger: number;
}

export interface EventList {
  code: number;
  indent: number;
  parameters: string|number[];
}
