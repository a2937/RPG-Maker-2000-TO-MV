interface EventCodeEntry {
  code: number;
  remap: number;
}

export interface EventCodeTranslator {
  [key: string]: EventCodeEntry;
}