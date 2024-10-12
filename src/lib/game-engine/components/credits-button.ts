import config from '../config';
import { fireSignal } from '../signals';
import ButtonComponent from './button';

class CreditsButtonComponent extends ButtonComponent {
  protected async onClick() {
    super.onClick();

    fireSignal(config.signals.showCredits);
  }
}

export default CreditsButtonComponent;
