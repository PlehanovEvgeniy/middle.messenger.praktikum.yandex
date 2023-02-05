import { Block, BlockProps } from "../../modules";

interface LinkProps extends BlockProps {
  text: string;
  href: string;
  className?: string;
}

export class Link extends Block<LinkProps> {
  static componentName = "Link";

  constructor({ ...props }: LinkProps) {
    super({
      ...props,
      className: props.className ?? "link",
      events: {
        click: (event: MouseEvent) => {
          event.preventDefault();
          // @ts-ignore
          window.router.go(props.href);
        },
      },
    });
  }

  protected render(): string {
    return `
      <a href="javascript:void(0);" class="{{className}}" click>{{text}}</a>
    `;
  }
}
