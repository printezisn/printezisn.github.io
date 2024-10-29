import { AssetPack } from '@assetpack/core';
import { json } from '@assetpack/core/json';
import { compress } from '@assetpack/core/image';
import { pixiManifest } from '@assetpack/core/manifest';
import { texturePacker } from '@assetpack/core/texture-packer';
import { webfont } from '@assetpack/core/webfont';
import { audio } from '@assetpack/core/ffmpeg';
import { cacheBuster } from '@assetpack/core/cache-buster';
import { texturePackerCacheBuster } from '@assetpack/core/texture-packer';
import { texturePackerCompress } from '@assetpack/core/texture-packer';
import fs from 'fs';

// eslint-disable-next-line
const game = process.env.GAMES_NAME?.trim();
if (!game) {
  console.error('Missing game name');
  // eslint-disable-next-line
  process.exit(1);
}

if (!fs.existsSync(`./src/assets/games/${game}`)) {
  console.error('Invalid game name');
  // eslint-disable-next-line
  process.exit(1);
}

if (!fs.existsSync(`./public/games/${game}/assets`)) {
  console.error('Output directory does not exist');
  // eslint-disable-next-line
  process.exit(1);
}

fs.rmSync(`./public/games/${game}/assets`, { recursive: true });

const assetpack = new AssetPack({
  entry: `./src/assets/games/${game}`,
  output: `./public/games/${game}/assets`,
  ignore: ['raw-audio-files'],
  cache: false,
  pipes: [
    texturePacker(),
    webfont(),
    audio(),
    compress({
      webp: { quality: 100, alphaQuality: 100 },
      avif: { quality: 100, alphaQuality: 100 },
    }),
    texturePackerCompress({
      webp: { quality: 100, alphaQuality: 100 },
      avif: { quality: 100, alphaQuality: 100 },
    }),
    json(),
    cacheBuster(),
    texturePackerCacheBuster(),
    pixiManifest(),
  ],
});

assetpack.run().then(() => {
  fs.renameSync(
    `./public/games/${game}/assets/manifest.json`,
    `./src/scripts/games/${game}/manifest.json`,
  );
});
