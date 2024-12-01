import { Descendant, Editor, Text, Transforms } from "slate"
import { marked } from "marked"

function isText(node: Descendant): node is Text {
    return !("type" in node)
}

// Every function here is working as expected and mostly stolen from the official slate docs.
// If your editor marks half of the code here as error - idk how to fix it. (mine does)
export function slateToMarkdown(nodes: Descendant[]): string {
    let markdown = ""

    nodes.forEach((node) => {
        if (isText(node)) {
            markdown += serializeText(node); // Handle text nodes directly
        } else if ("children" in node && Array.isArray(node.children)) {
            // moved here cuz linter said no-case-declaration
            const level = node.level || 1;
            const headingText = node.children.map(serializeText).join("")
            switch (node.type) {
                case "heading":
                    markdown += `${"#".repeat(level)} ${headingText}\n`
                    break
                case "paragraph":
                    markdown += `${node.children.map(serializeText).join("")}\n`
                    break
                case "bulleted-list":
                    node.children.forEach((child) => {
                        if ("children" in child) {
                            markdown += `- ${child.children.map(serializeText).join("")}\n`
                        }
                    });
                    markdown += "\n"
                    break
                case "numbered-list":
                    node.children.forEach((child, index) => {
                        if ("children" in child) {
                            markdown += `${index + 1}. ${child.children.map(serializeText).join("")}\n`
                        }
                    });
                    markdown += "\n"
                    break
                default:
                    markdown += `${node.children ? slateToMarkdown(node.children) : ""}\n`
            }
        }
    });

    return markdown.trim()
}

function serializeText(node: Text): string {
    let text = node.text || ""

    if (node.bold) text = `**${text}**`
    if (node.italic) text = `*${text}*`
    if (node.strikethrough) text = `~~${text}~~`

    if (node.h1) text = `# ${text}`;
    else if (node.h2) text = `## ${text}`
    else if (node.h3) text = `### ${text}`

    return text;
}

export function toggleMark(editor, format) {
    const isActive = isMarkActive(editor, format)

    if (["h1", "h2", "h3"].includes(format)) {
        ["h1", "h2", "h3"].forEach((heading) => {
            if (heading !== format && isMarkActive(editor, heading)) {
                Editor.removeMark(editor, heading)
            }
        });
    }

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

export function isMarkActive(editor, format){
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

// Function 90% stolen from off slate docs
export function ClearAllFormatting(editor) {
    if (!editor.selection) return

    const marks = Editor.marks(editor);

    if (marks) {
        Object.keys(marks).forEach((mark) => {
            Editor.removeMark(editor, mark)
        });
    }

    Transforms.setNodes(
        editor,
        { type: "paragraph" },
        { match: (n) => Editor.isBlock(editor, n) }
    );
}

// Some options are implemented for adding new editing options in near future
export function markdownToSlate(markdown: string): Descendant[] {
    const tokens = marked.lexer(markdown); // Parse Markdown into tokens
    return tokensToSlate(tokens);
}

function tokensToSlate(tokens): Descendant[] {
    const slateNodes: Descendant[] = [];

    tokens.forEach((token) => {
        switch (token.type) {
            case "heading":
                slateNodes.push({
                    type: "heading",
                    level: token.depth,
                    children: parseInline(token.text),
                });
                break;

            case "paragraph":
                slateNodes.push({
                    type: "paragraph",
                    children: parseInline(token.text),
                });
                break;

            case "list":
                slateNodes.push({
                    type: token.ordered ? "numbered-list" : "bulleted-list",
                    children: token.items.map((item) => ({
                        type: "list-item",
                        children: parseInline(item.text),
                    })),
                });
                break;

            case "code":
                slateNodes.push({
                    type: "code-block",
                    children: [{ text: token.text }],
                });
                break;

            case "blockquote":
                slateNodes.push({
                    type: "block-quote",
                    children: parseInline(token.text),
                });
                break;

            case "hr":
                slateNodes.push({
                    type: "divider",
                    children: [{ text: "" }],
                });
                break;

            default:
                break;
        }
    });

    return slateNodes;
}

function parseInline(text: string): Descendant[] {
    const inlineLexer = new marked.Lexer();
    const inlineTokens = inlineLexer.inlineTokens(text); // Parse the inline text
    const inlineNodes: Descendant[] = [];

    inlineTokens.forEach((token) => {
        switch (token.type) {
            case "text":
                inlineNodes.push({ text: token.text });
                break;

            case "strong":
                inlineNodes.push(...parseFormattedText(token.text, { bold: true }));
                break;

            case "em":
                inlineNodes.push(...parseFormattedText(token.text, { italic: true }));
                break;

            case "codespan":
                inlineNodes.push({ text: token.text, code: true });
                break;

            default:
                break;
        }
    });

    return inlineNodes;
}

function parseFormattedText(text: string, format: Record<string, boolean>): Descendant[] {
    const inlineLexer = new marked.Lexer();
    const nestedTokens = inlineLexer.inlineTokens(text);
    const formattedNodes: Descendant[] = [];

    nestedTokens.forEach((token) => {
        if (token.type === "text") {
            formattedNodes.push({ text: token.text, ...format });
        } else if (token.type === "strong") {
            formattedNodes.push(...parseFormattedText(token.text, { ...format, bold: true }));
        } else if (token.type === "em") {
            formattedNodes.push(...parseFormattedText(token.text, { ...format, italic: true }));
        } else if (token.type === "codespan") {
            formattedNodes.push({ text: token.text, ...format, code: true });
        }
    });

    return formattedNodes;
}