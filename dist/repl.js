import { createInterface } from 'node:readline';
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
export function getCommands() {
    return {
        exit: {
            name: 'exit',
            description: 'Exits the pokedex',
            callback: commandExit,
        },
        help: {
            name: 'help',
            description: 'Displays a help message',
            callback: commandHelp,
        },
    };
}
export function cleanInput(input) {
    return input
        .trim()
        .toLowerCase()
        .split(' ')
        .filter(i => i);
}
export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Pokedex > ',
    });
    rl.prompt();
    rl.on('line', line => {
        if (!line.trim()) {
            return rl.prompt();
        }
        const cleaned = cleanInput(line);
        const commands = getCommands();
        if (commands[cleaned[0]]) {
            commands[cleaned[0]].callback(commands);
        }
        else {
            console.log('Unknown command');
        }
        rl.prompt();
    });
}
