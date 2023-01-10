import "./button.less";
import { Block, BlockProps } from "../../modules";

interface ButtonProps extends BlockProps {
  text: string;
  type: "submit" | "button";
  onClick?: () => void;
}

export class Button extends Block<ButtonProps> {
  static componentName = "Button";

  constructor({ onClick, ...props }: ButtonProps) {
    super({ ...props, events: { click: onClick } });
  }

  protected render(): string {
    return `
    <div id="button">
      <button type={{type}} class="button">{{text}}</button>
    </div>`;
  }
}
