import "../../assets/styles/error.less";
import { Block } from "../../modules";

export default class ServerError extends Block {
  protected render(): string {
    return `
      <div class="error">
        <h1 class="error__title">500</h1>
        <h3 class="error__subtitle">Мы уже фиксим</h3>

        {{{ NavLink href="./chat.hbs" text="Назад к чатам" }}}
      </div>    
    `;
  }
}
