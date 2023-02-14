import Block from "../modules/block";

export function render(query: string, block: Block) {
  const root = document.querySelector(query);
  if (root) {
    root.innerHTML = "";
    root.appendChild(block.getContent());
  }

  return root;
}
