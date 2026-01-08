export async function commandHelp({ commands }) {
    const commandsText = `${Object.values(commands).map(command => `\n${command.name}: ${command.description}`)}`;
    const helpText = 'Welcome to the Pokedex!\nUsage:\n' + commandsText;
    console.log(helpText);
}
