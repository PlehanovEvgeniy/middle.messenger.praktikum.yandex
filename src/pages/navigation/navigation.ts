import { Block } from "../../modules";

export default class Navigation extends Block {
  constructor() {
    const pages = [
      { url: "404", title: "404" },
      { url: "500", title: "505" },
      { url: "login", title: "Логин" },
      { url: "registration", title: "Регистрация" },
      { url: "profile", title: "Профиль" },
      { url: "changeData", title: "Изменение профиля" },
      { url: "changePassword", title: "Смена пароля" },
      { url: "chat", title: "Чат" },
    ];
    super({
      pages,
    });
  }
  protected render(): string {
    return `
      <div class="navigation">
        <ul class="navigation_list">
            {{#each pages as | page |}}
                <li><a href={{url}}>{{title}}</a></li>
            {{/each}}
        </ul>
      </div>
      `;
  }
}
