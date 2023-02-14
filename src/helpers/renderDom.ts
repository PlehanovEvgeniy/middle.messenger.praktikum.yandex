import Block from '../modules/block';

export default function renderDOM(selector: string, BlockPage: typeof Block) {
  const block = new BlockPage();

  const root = document.querySelector(selector);
  if (!root) throw new Error('Элемент не найден');
  root.innerHTML = '';
  root.appendChild(block.getContent());
}
