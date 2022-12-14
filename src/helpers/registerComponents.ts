import Block from "../modules/block";
import Handlebars, { HelperOptions } from "handlebars";

interface registerComponentProps<Props = any> {
  new (props: Props): Block;
}

export default function registerComponents(
  components: registerComponentProps[]
) {
  components.forEach((component) => {
    Handlebars.registerHelper(
      //@ts-ignore
      component["componentName"] || component.name,

      function ({ hash: { ref, ...hash }, data }: HelperOptions) {
        const { children = {}, refs = {} } = data.root;

        const comp = new component(hash);

        children[comp.id] = comp;

        if (ref) {
          refs[ref] = comp.getContent();
        }

        return `<div data-id="${comp.id}"></div>`;
      }
    );
  });
}
