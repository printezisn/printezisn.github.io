import '@styles/main.scss';
import './base';
import '@scripts/components/snowfall';

if (document.getElementsByClassName('create-fireplace').length > 0) {
  const Fireplace = (await import('@scripts/components/fireplace')).default;
  customElements.define('fire-place', Fireplace);

  document
    .getElementsByClassName('create-fireplace')[0]
    .addEventListener('click', (e) => {
      e.preventDefault();
      if (document.querySelector('fire-place')) return;

      const fireplace = document.createElement('fire-place');
      fireplace.style.position = 'fixed';
      fireplace.style.insetBlockEnd = '-40px';
      fireplace.style.insetInlineStart = '0';
      fireplace.style.minInlineSize = '1920px';
      fireplace.style.aspectRatio = '16 / 9';
      fireplace.style.pointerEvents = 'none';

      document.body.appendChild(fireplace);
    });
}
