const fs = require('fs');

const log = fs.readFileSync('log.txt', 'utf8');

const games = log.split("InitGame: ")
                        .map(game => game.split("\n")
                        .filter(line => !line.includes("------------------------------------------------------------")))

games.shift()

const results = games.map((game, index) => {
    let kills_by_means = {};

    game.forEach(line => {
        if (line.includes("Kill")) { // Kills

            const mean = line.split(" killed ")[1].split(" by ")[1];

            kills_by_means[mean] ? kills_by_means[mean]++ : kills_by_means[mean] = 1;
        }
    });

    return {
        [`game_${index + 1}`]: {
            kills_by_means
        }
    }
})

fs.writeFileSync("report2-grouped_kills_by_means.json", JSON.stringify({ results }, null, 2));