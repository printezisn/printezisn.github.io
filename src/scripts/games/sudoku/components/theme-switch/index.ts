import SunIcon from 'feather-icons/dist/icons/sun.svg?raw';
import MoonIcon from 'feather-icons/dist/icons/moon.svg?raw';

class ThemeSwitch extends HTMLElement {
  private switch: HTMLButtonElement | null = null;

  private onSwitchChange = () => {
    if (!this.switch) return;

    this.switch.ariaChecked =
      this.switch.ariaChecked === 'true' ? 'false' : 'true';

    document.documentElement.setAttribute(
      'data-theme',
      this.switch.ariaChecked === 'true' ? 'dark' : 'light',
    );
    localStorage.setItem(
      'theme',
      this.switch.ariaChecked === 'true' ? 'dark' : 'light',
    );
  };

  connectedCallback() {
    let theme = localStorage.getItem('theme');
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    this.switch = document.createElement('button');
    this.switch.type = 'button';
    this.switch.role = 'switch';
    this.switch.ariaLabel = 'Enable dark theme';
    this.switch.ariaChecked = theme === 'dark' ? 'true' : 'false';
    this.switch.innerHTML = `${SunIcon}${MoonIcon}`;

    this.switch.addEventListener('click', this.onSwitchChange);

    this.appendChild(this.switch);
  }

  disconnectedCallback() {
    this.switch?.removeEventListener('click', this.onSwitchChange);
  }
}

export default ThemeSwitch;
