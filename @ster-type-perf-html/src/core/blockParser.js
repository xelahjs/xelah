export default function blockParser(content) {
  const div = document.createElement("div");
  div.innerHTML = content;
  const blocks = Array.from(div.children, (block) => block.outerHTML);
  return blocks;
}