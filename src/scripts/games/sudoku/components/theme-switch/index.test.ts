import { beforeEach, describe, expect, it } from 'vitest';
import ThemeSwitch from '.';

customElements.define('app-theme-switch', ThemeSwitch);

describe('ThemeSwitch', () => {
  beforeEach(() => {
    localStorage.removeItem('theme');
    document.body.innerHTML = '<app-theme-switch />';
  });

  it('is initially unchecked', () => {
    const themeSwitch = document.querySelector('button') as HTMLButtonElement;
    expect(themeSwitch.ariaChecked).toEqual('false');
  });

  it('gets checked if clicked', () => {
    const themeSwitch = document.querySelector('button') as HTMLButtonElement;
    themeSwitch.click();

    expect(themeSwitch.ariaChecked).toEqual('true');
  });

  it('saves theme in local storage and document element if changed', () => {
    const themeSwitch = document.querySelector('button') as HTMLButtonElement;
    themeSwitch.click();

    expect(localStorage.getItem('theme')).toEqual('dark');
    expect(document.documentElement.getAttribute('data-theme')).toEqual('dark');
  });
});
