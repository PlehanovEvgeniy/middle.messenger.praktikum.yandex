import './button.less';
import { Block, BlockProps } from '../../modules';

interface ButtonProps extends BlockProps {
  text: string;
  type: 'submit' | 'button';
  className?: string;
  node?: string;
  onClick?: () => void;
}

export class Button extends Block<ButtonProps> {
  static componentName = 'Button';

  constructor({ onClick, ...props }: ButtonProps) {
    super({
      ...props,
      className: props.className ?? 'button',
      events: { click: onClick },
    });
  }

  protected render(): string {
    return `
      <button type='{{type}}' class="{{className}}">
        {{#if node}}
          {{{node}}}
        {{else}}
          {{text}}
        {{/if}}
      </button>
      `;
  }
}
