import audiosprite from 'audiosprite';
import fs from 'fs';

// eslint-disable-next-line
const game = process.argv[2];

audiosprite(
  [`./src/assets/games/${game}/raw-audio-files/*`],
  {
    output: `./src/assets/games/${game}/audio/sounds`,
  },
  (err, result) => {
    if (err) {
      console.log(err);
      // eslint-disable-next-line
      process.exit(1);
    }

    fs.writeFileSync(
      `./src/assets/games/${game}/audio/sounds.json`,
      JSON.stringify(result.spritemap),
    );
    fs.unlinkSync(`./src/assets/games/${game}/audio/sounds.ac3`);
    fs.unlinkSync(`./src/assets/games/${game}/audio/sounds.m4a`);
    fs.unlinkSync(`./src/assets/games/${game}/audio/sounds.ogg`);
  },
);
