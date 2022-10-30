import Block from "core/Block";
import noAvatar from "assets/no-avatar.png";

import "./avatar.css";

interface AvatarProps {
  imgUrl: string;
  onChange: () => void;
}

export class Avatar extends Block<AvatarProps> {
  static componentName = "Avatar";

  protected render(): string {
    // language=hbs
    return `
      <form class="avatar">
        <label for="avatar-input" title="Изменить аватар">
          <picture class="avatar__image">
              <source srcset="{{imgUrl}}" width="30" height="30">
              <img src="${noAvatar}" alt="avatar" width="30" height="30">
          </picture>  
        </label>
        {{{Input
            type="file"
            placeholder="Выберите аватар"
            name="avatar"
            id="avatar-input"
            accept="image/png, image/jpeg"
            onChange=onChange
        }}}
      </form>
    `;
  }
}
