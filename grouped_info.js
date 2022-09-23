const fs = require('fs');

const log = fs.readFileSync('log.txt', 'utf8');

const games = log.split("InitGame: ")
                        .map(game => game.split("\n")
                        .filter(line => !line.includes("------------------------------------------------------------")))

games.shift()

const results = games.map((game, index) => {
    let totalKills = 0;
    let players = [];
    let kills = {};

    game.forEach(line => {
        if (line.includes("ClientUserinfoChanged")) {
            const newPlayer = line.split("n\\")[1].split("\\")[0];

            if (!players.some(player => player == newPlayer)) { // Insertion of new players
                players.push(newPlayer);
                kills[newPlayer] = 0;
            }
        } else if (line.includes("Kill")) { // Kills
            totalKills += 1;

            const murder = line.split(" killed ");
            const murderer = murder[0].split(": ")[2];
            const murdered = murder[1].split(" by ")[0];

            if (murderer != murdered) {
                murderer != "<world>" ? kills[murderer] += 1 : kills[murdered] -= 1;
            }
            
        }
    });

    return {
        [`game_${index + 1}`]: {
            totalKills,
            players,
            kills
        }
    }
})

fs.writeFileSync("report1-grouped_information.json", JSON.stringify({ results }, null, 2));