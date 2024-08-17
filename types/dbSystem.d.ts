export interface DBStart {
  party_map_id: string;
  party_x: string;
  party_y: string;
  boat_map_id: string;
  boat_x: string;
  boat_y: string;
  ship_map_id: string;
  ship_x: string;
  ship_y: string;
  airship_map_id: string;
  airship_x: string;
  airship_y: string;
}


export interface DBSystem {
    ldb_id:                            string;
    boat_name:                         string[];
    ship_name:                         string[];
    airship_name:                      string[];
    boat_index:                        string;
    ship_index:                        string;
    airship_index:                     string;
    title_name:                        string[];
    gameover_name:                     string[];
    system_name:                       string[];
    system2_name:                      string[];
    party:                             string[];
    menu_commands:                     string[];
    title_music:                       DBMusic[];
    battle_music:                      DBMusic[];
    battle_end_music:                  DBMusic[];
    inn_music:                         DBMusic[];
    boat_music:                        DBMusic[];
    ship_music:                        DBMusic[];
    airship_music:                     DBMusic[];
    gameover_music:                    DBMusic[];
    cursor_se:                         SE;
    decision_se:                       SE;
    cancel_se:                         SE;
    buzzer_se:                         SE;
    battle_se:                         SE;
    escape_se:                         SE;
    enemy_attack_se:                   SE;
    enemy_damaged_se:                  SE;
    actor_damaged_se:                  SE;
    dodge_se:                          SE;
    enemy_death_se:                    SE;
    item_se:                           SE;
    transition_out:                    string;
    transition_in:                     string;
    battle_start_fadeout:              string;
    battle_start_fadein:               string;
    battle_end_fadeout:                string;
    battle_end_fadein:                 string;
    message_stretch:                   string;
    font_id:                           string;
    selected_condition:                string;
    selected_hero:                     string;
    battletest_background:             string[];
    battletest_data:                   DBBattletestData;
    save_count:                        string;
    battletest_terrain:                string;
    battletest_formation:              string;
    battletest_condition:              string;
    equipment_setting:                 string;
    battletest_alt_terrain:            string;
    show_frame:                        string[];
    frame_name:                        string[];
    invert_animations:                 string[];
    show_title:                        string[];
    easyrpg_alternative_exp:           string;
    easyrpg_battle_options:            string[];
    easyrpg_max_actor_hp:              string;
    easyrpg_max_enemy_hp:              string;
    easyrpg_max_damage:                string;
    easyrpg_max_exp:                   string;
    easyrpg_max_level:                 string;
    easyrpg_max_savefiles:             string;
    easyrpg_max_item_count:            string;
    easyrpg_variable_min_value:        string;
    easyrpg_variable_max_value:        string;
    easyrpg_max_actor_sp:              string;
    easyrpg_max_enemy_sp:              string;
    easyrpg_max_stat_base_value:       string;
    easyrpg_max_stat_battle_value:     string;
  easyrpg_use_rpg2k_battle_system: string[];
}

export interface SE {
    Sound: DBSound;
}

export interface DBSound {
    name:    string[];
    volume:  string;
    tempo:   string;
    balance: string;
    fadein?: string;
}

export interface DBMusic {
    Music: DBSound[];
}

export interface DBBattletestData {
    TestBattler: DBTestBattler;
}

export interface DBTestBattler {
    actor_id:     string;
    level:        string;
    weapon_id:    string;
    shield_id:    string;
    armor_id:     string;
    helmet_id:    string;
    accessory_id: string;
}
