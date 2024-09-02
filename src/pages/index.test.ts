import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import IndexPage from './index.astro';

describe('index page', () => {
  it('renders successfully', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(IndexPage);

    expect(result).toContain('<body');
  });
});
