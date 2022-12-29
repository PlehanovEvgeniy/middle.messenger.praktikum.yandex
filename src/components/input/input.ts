import "./input.less";
import { Block } from "../../modules";

interface InputProps {
  name?: string;
  label?: string;
  type?: "text" | "email" | "password" | "tel" | "file";
  placeholder?: string;
  validation: string;
}

export class Input extends Block {
  constructor({ ...props }: InputProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
      <div class="form">
        <label class="form__label" for={{name}}>{{label}}</label>
        <input
          class="form__input"
          type={{type}}
          placeholder={{placeholder}}
          name={{name}}
          validation={{validation}}
        />
      </div>
    `;
  }
}
