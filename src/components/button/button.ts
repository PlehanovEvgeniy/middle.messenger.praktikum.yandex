import "./button.less";
import { Block } from "../../modules";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export class Button extends Block {
  constructor({ onClick, ...props }: ButtonProps) {
    super({ ...props, events: { click: onClick } });
  }

  protected render(): string {
    return `
    <div id="button">
      <button type="button" class="button">{{text}}</button>
    </div>`;
  }
}
