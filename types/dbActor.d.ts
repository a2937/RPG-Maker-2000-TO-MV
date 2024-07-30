export interface DBActor {
  name: string;
  title: string;
  character_name: string;
  character_index: string;
  initial_level: string;
  final_level: string;
  face_name: string;
  face_index: string;
  initial_equipment: InitialEquipment;
  class_id: string;
}

export interface InitialEquipment {
  [slot: number]: EquipmentHolder;
}

export interface EquipmentHolder {
  Equipment: EquipmentHold;
}

export interface EquipmentHold {
  [slot: number]: Equipment;
}

export interface Equipment {
  weapon_id: string;
  shield_id: string;
  armor_id: string;
  helmet_id: string;
  accessory_id: string;
}
