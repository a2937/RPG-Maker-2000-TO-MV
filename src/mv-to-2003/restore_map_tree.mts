import { EditableTreeMap, TreeMap,DBMapInfo } from "../../types/editable_tree_map.js"; 
import { MapInfo } from "../../types/mapInfo.js";

export function buildMapTree(mapInfos : MapInfo[])
{
  const fullObject = {} as EditableTreeMap; 
  const oldMapInfos = [] as DBMapInfo[]; 
  fullObject.TreeMap =  {} as TreeMap; 

  let newOrder = "0"; 

  newOrder = buildMapOrder(mapInfos, oldMapInfos);


  fullObject.TreeMap.maps = { MapInfo : oldMapInfos};
  fullObject.TreeMap.tree_order = newOrder.trim();
  return fullObject; 
}

function buildMapOrder(mapInfos: MapInfo[], oldMapInfos: DBMapInfo[]) {
  let newOrder = "0"; 
  mapInfos.forEach(mvMapInfo => {
    if (mvMapInfo == null) {
      const projectMapInfo = {} as DBMapInfo;
      projectMapInfo['@'] = {id:"0000"}; 
      projectMapInfo.name = 'Project Name';
      projectMapInfo.parent_map = 0;
      projectMapInfo.indentation = 0;
      projectMapInfo.expanded_node = "T";
      projectMapInfo.type = 0;
      projectMapInfo.scrollbar_x = 0;
      projectMapInfo.scrollbar_y = 0;
      oldMapInfos.push(projectMapInfo);
    }
    else {
      const newMapInfo = {} as DBMapInfo;
      newMapInfo['@'] = { id: mvMapInfo.id.toString().padStart(4,"0") }; 
      newMapInfo.name = mvMapInfo.name;
      newMapInfo.parent_map = mvMapInfo.parentId;
      newMapInfo.expanded_node = mvMapInfo.expanded ? "T" : "F";
      newMapInfo.scrollbar_x = mvMapInfo.scrollX;
      newMapInfo.scrollbar_y = mvMapInfo.scrollY;
      newOrder = newOrder + " " + mvMapInfo.order.toString();
      oldMapInfos.push(newMapInfo);
    }
  });
  return newOrder;
}
