import '@styles/main.scss';
import './base';

document.querySelectorAll('[data-print-cv]').forEach((button) => {
  button.addEventListener('click', () => window.print());
});
