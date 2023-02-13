import { Block, BlockProps } from "../../modules";

import * as camera from "../../assets/images/camera-white.png";
import * as defaultAvatar from "../../assets/images/pepe.png";

interface ProfileAvatarProps extends BlockProps {
  src?: string;
  isEditable?: boolean;
}

export class ProfileAvatar extends Block<ProfileAvatarProps> {
  static componentName = "ProfileAvatar";
  constructor(props: ProfileAvatarProps) {
    super({
      ...props,
    });
  }

  protected render(): string {
    return `
    <div class="profile__container_avatar">
      <label>
        {{#if isEditable}}
          <input type="file" id="avatar" name="avatar" />
        {{/if}}
        <figure class="profile__container_avatar-figure">
          <img {{#if src}} src="https://ya-praktikum.tech/api/v2/resources{{src}}" {{else}} src="${defaultAvatar}" {{/if}}  alt="Аватар" class="profile__container_avatar-img">
          {{#if isEditable}}
            <figcaption class="profile__container_avatar-figcaption">
              <img src="${camera}" >
            </figcaption>
          {{/if}}
        </figure>
      </label>
    </div>
    `;
  }
}
