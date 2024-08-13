// In RPG Maker 2000/2003 it is referred to as Chipset. 
export interface DBTileset {
  name: string;
  chipset_name: string[];
  terrain_data: string[];
  passable_data_lower: string[];
  passable_data_upper: string[];
  animation_type: string;
  animation_speed: string;
}
