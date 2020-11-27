import MarkdownIt from "markdown-it";

declare module "markdown-it-todo" {
	declare const MarkdownItTodo: MarkdownIt.PluginSimple;
	export default MarkdownItTodo;
}
