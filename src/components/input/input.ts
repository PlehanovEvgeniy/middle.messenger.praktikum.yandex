import "./input.less";
import { Block, BlockProps } from "../../modules";
import { formValidation } from "../../helpers/validation";

interface InputProps extends BlockProps {
  name: string;
  label?: string;
  type?: "text" | "email" | "password" | "tel" | "file";
  placeholder?: string;
  validation?: string;
  className?: string;
  fullWidth?: boolean;
}

export class Input extends Block<InputProps> {
  static componentName = "Input";
  private value: string | undefined = "";

  constructor(props: InputProps) {
    super({
      ...props,
      className: props.className ? props.className : "form__input",
      events: {
        change: (e: Event) => {
          this.value = (e.target as HTMLInputElement).value;
          this.setProps({
            value: this.value,
          });
        },
        focus: () => {
          this.errors = "";
        },
        blur: () => {
          if (props.validation) {
            this.errors = formValidation[props.validation](this.value);
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
          }
        },
      },
    });
  }

  protected render(): string {
    return `
      <div class="form {{#if fullWidth}} fullWidth {{/if}}">
        <label class="form__label" for={{name}}>{{label}}</label>
        <input
          class="{{className}}"
          type={{type}}
          placeholder={{placeholder}}
          name={{name}}
          value="{{value}}"
        />

        <div class="form__input_error">
          ${this.errors ? this.errors.toString() : ""}
        </div>
      </div>
    `;
  }
}
