import "./profileInput.less";
import { Block, BlockProps } from "../../modules";
import { formValidation } from "../../helpers/validation";

interface ProfileInputProps extends BlockProps {
  name: string;
  label?: string;
  validation?: string;
  type?: "text" | "email" | "password" | "tel" | "file";
  placeholder?: string;
}

export class ProfileInput extends Block<ProfileInputProps> {
  static componentName = "ProfileInput";
  private value: string | undefined = "";

  constructor(props: ProfileInputProps) {
    super({
      ...props,
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
      <div class="profile-form">
        <label class="profile-form__label" for={{name}}>{{label}}</label>
        <div class="profile-form__input_error">
        ${this.errors ? this.errors.toString() : ""}
      </div>
        <input
          class="profile-form__input"
          type={{type}}
          placeholder={{placeholder}}
          name={{name}}
          value="{{value}}"
        />
      </div>
    `;
  }
}
