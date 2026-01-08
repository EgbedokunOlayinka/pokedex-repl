import type {State} from '../state.js';

export async function commandHelp({commands}: State) {
  const commandsText = `${Object.values(commands).map(
    command => `\n${command.name}: ${command.description}`,
  )}`;

  const helpText = 'Welcome to the Pokedex!\nUsage:\n' + commandsText;

  console.log(helpText);
}
