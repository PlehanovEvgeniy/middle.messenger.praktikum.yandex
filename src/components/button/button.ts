import "./button.less";
import { Block } from "../../modules";

interface ButtonProps {
  text: string;
  type: "submit" | "button";
  onClick?: () => void;
}

export class Button extends Block {
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
