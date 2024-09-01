import { TypesafeDBMap } from '../../types/dbMap_typesafe.js';
import { Map } from "../../types/map.js";

export function buildMap(mvMap : Map) {
  const dbMap = { Map: {} } as TypesafeDBMap; 
  dbMap.Map.chipset_id = mvMap.tilesetId; 
  dbMap.Map.width = mvMap.width;
  dbMap.Map.height = mvMap.height;
  dbMap.Map.scroll_type = mvMap.scrollType; 
  dbMap.Map.parallax_flag = mvMap.parallaxName.trim() == "" ? "F" : "T"; 
  dbMap.Map.parallax_name = mvMap.parallaxName; 
  dbMap.Map.parallax_loop_x = mvMap.parallaxLoopX ? "T" : "F"; 
  dbMap.Map.parallax_loop_y = mvMap.parallaxLoopY ? 'T' : 'F'; 
  
  // TODO: Re-examine
  dbMap.Map.parallax_auto_loop_x = mvMap.parallaxLoopX ? 'T' : 'F';
  dbMap.Map.parallax_sx = mvMap.parallaxSx;
  dbMap.Map.parallax_auto_loop_y = mvMap.parallaxLoopY ? 'T' : 'F';
  dbMap.Map.parallax_sy = mvMap.parallaxSy;

  


  return dbMap; 
}
