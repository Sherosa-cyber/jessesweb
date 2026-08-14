// Converts between the admin's plain-text article format and the
// structured content blocks the site renders.
//
// Plain text format (what Jesse types in the admin):
//   Paragraphs are separated by a blank line.
//   "## Heading"        → section heading
//   "### Sub-heading"   → sub heading
//   "> Quote text"      → pull quote
//   "> — Source name"   → quote attribution (line starting with "> —")
//   "![Caption](images/photo.jpg)" → image with caption
//   "- item"            → bullet list (consecutive lines)
//   Everything else     → paragraph

export function blocksToText(blocks) {
  const lines = [];
  for (const block of blocks) {
    switch (block.type) {
      case "h2":
        lines.push(`## ${block.text}`, "");
        break;
      case "h3":
        lines.push(`### ${block.text}`, "");
        break;
      case "quote":
        lines.push(`> ${block.text}`);
        if (block.cite) lines.push(`> — ${block.cite}`);
        lines.push("");
        break;
      case "img":
        lines.push(`![${block.caption || ""}](${block.src})`, "");
        break;
      case "list":
        for (const item of block.items) lines.push(`- ${item}`);
        lines.push("");
        break;
      default:
        lines.push(block.text, "");
    }
  }
  return lines.join("\n").trim();
}

export function textToBlocks(text) {
  const rawLines = (text || "").split("\n");
  const blocks = [];
  let i = 0;

  const pushParagraph = (lines) => {
    const text = lines.join(" ").trim();
    if (text) blocks.push({ type: "p", text });
  };

  while (i < rawLines.length) {
    const line = rawLines[i];

    // Blank line → skip
    if (!line.trim()) {
      i++;
      continue;
    }

    // Heading
    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3).trim() });
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4).trim() });
      i++;
      continue;
    }

    // Image: ![caption](src)
    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      blocks.push({
        type: "img",
        src: imgMatch[2].trim(),
        caption: imgMatch[1].trim() || undefined,
      });
      i++;
      continue;
    }

    // Quote
    if (line.startsWith("> ")) {
      const quoteLines = [];
      while (i < rawLines.length && rawLines[i].startsWith("> ")) {
        quoteLines.push(rawLines[i].slice(2));
        i++;
      }
      const quoteText = quoteLines[0] || "";
      const citeMatch = quoteLines.find((l) => l.startsWith("— "));
      blocks.push({
        type: "quote",
        text: quoteText,
        cite: citeMatch ? citeMatch.slice(2).trim() : undefined,
      });
      continue;
    }

    // Bullet list
    if (line.startsWith("- ")) {
      const items = [];
      while (i < rawLines.length && rawLines[i].startsWith("- ")) {
        items.push(rawLines[i].slice(2).trim());
        i++;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    // Paragraph (collect until blank line or a structural line)
    const para = [];
    while (
      i < rawLines.length &&
      rawLines[i].trim() &&
      !rawLines[i].startsWith("## ") &&
      !rawLines[i].startsWith("### ") &&
      !rawLines[i].startsWith("> ") &&
      !rawLines[i].startsWith("- ") &&
      !rawLines[i].startsWith("![")
    ) {
      para.push(rawLines[i].trim());
      i++;
    }
    pushParagraph(para);
  }

  return blocks;
}