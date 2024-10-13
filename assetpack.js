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

// eslint-disable-next-line
const game = process.argv[2];

const assetpack = new AssetPack({
  entry: `./src/assets/games/${game}`,
  output: `./public/games/${game}/assets`,
  ignore: ['raw-audio-files'],
  cache: true,
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

assetpack.run();
