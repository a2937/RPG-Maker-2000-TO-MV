export interface DBCommonEvent {
  name: string[];
  trigger: string;
  switch_flag: string[];
  switch_id: string;
  event_commands: DBEventCommands[];
}

export interface DBEventCommands {
  EventCommand: DBEventCommand[];
}

export interface DBEventCommand {
  code: string;
  indent: string;
  string: string;
  parameters: string;
}
