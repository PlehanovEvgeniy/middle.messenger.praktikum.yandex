import "./button.less";
import { Block, BlockProps } from "../../modules";

interface ButtonProps extends BlockProps {
  text: string;
  type: "submit" | "button";
  className?: string;
  onClick?: () => void;
}

export class Button extends Block<ButtonProps> {
  static componentName = "Button";

  constructor({ onClick, ...props }: ButtonProps) {
    super({
      ...props,
      className: props.className ?? "button",
      events: { click: onClick },
    });
  }

  protected render(): string {
    return `
    <div id="button">
      <button type='{{type}}' class="{{className}}">{{text}}</button>
    </div>`;
  }
}
