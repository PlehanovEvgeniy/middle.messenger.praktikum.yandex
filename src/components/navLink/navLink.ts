import './navLink.less';
import { Block, BlockProps } from '../../modules';

interface NavLinkProps extends BlockProps {
  text: string;
  href: string;
}

export class NavLink extends Block<NavLinkProps> {
  static componentName = 'NavLink';

  constructor({ ...props }: NavLinkProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
      <div id="navLink">
        {{{ Link href='{{href}}' class='link' text="{{text}}"  }}} 
      </div>
    `;
  }
}
