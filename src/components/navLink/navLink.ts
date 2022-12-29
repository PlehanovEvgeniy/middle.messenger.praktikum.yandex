import "./navLink.less";
import { Block } from "../../modules";

interface navLinkProps {
  text: string;
  href: string;
}

export class NavLink extends Block {
  constructor({ ...props }: navLinkProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
    <div id="navLink">
      <a href='{{href}}' class='link'>{{text}}</a>
    </div>
    `;
  }
}
