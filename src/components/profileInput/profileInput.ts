import "./profileInput.less";
import { Block } from "../../modules";

interface ProfileInputProps {}

export class ProfileInput extends Block {
  constructor({ ...props }: ProfileInputProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
      <div class="profile-form">
        <label class="profile-form__label" for={{name}}>{{label}}</label>
        <input
          class="profile-form__input"
          type={{type}}
          placeholder={{placeholder}}
          name={{name}}
        />
      </div>
    `;
  }
}
