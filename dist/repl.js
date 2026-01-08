export function cleanInput(input) {
    return input
        .trim()
        .toLowerCase()
        .split(' ')
        .filter(i => i);
}
export async function startREPL(state) {
    const { rl, commands } = state;
    rl.prompt();
    rl.on('line', async (line) => {
        try {
            if (!line.trim()) {
                return rl.prompt();
            }
            const cleaned = cleanInput(line);
            if (commands[cleaned[0]]) {
                await commands[cleaned[0]].callback(state);
            }
            else {
                console.log('Unknown command');
            }
            rl.prompt();
        }
        catch (error) {
            console.error(error);
        }
    });
}
