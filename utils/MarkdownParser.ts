import MarkdownIt from "markdown-it";
import * as MarkdownItTodoPlugin from "markdown-it-todo";

export default class MarkdownParser {
	static parser: MarkdownIt = new MarkdownIt({ linkify: true, breaks: true, xhtmlOut: true }).use(
		MarkdownItTodoPlugin
	);

	static parse = (markdown: string): string => {
		return MarkdownParser.parser.render(markdown);
	};
}
