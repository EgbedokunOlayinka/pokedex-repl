import type {CLICommand} from './command.js';

export function commandHelp(commands: Record<string, CLICommand>) {
  const commandsText = `${Object.values(commands).map(
    command => `\n${command.name}: ${command.description}`,
  )}`;

  const helpText = 'Welcome to the Pokedex!\nUsage:\n' + commandsText;

  console.log(helpText);
}
