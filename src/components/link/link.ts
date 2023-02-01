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
        onclick: (event: MouseEvent) => {
          event.preventDefault();
          console.log(props.href);
          // @ts-ignore
          window.router.go(props.href);
        },
      },
    });
  }

  protected render(): string {
    return `
      <a href={{href}} class="{{className}}" click>{{text}}</a>
    `;
  }
}
