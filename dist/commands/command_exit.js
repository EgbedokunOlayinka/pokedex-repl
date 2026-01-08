export async function commandExit({ rl }) {
    console.log('Closing the Pokedex... Goodbye!');
    rl.close();
    process.exit(0);
}
