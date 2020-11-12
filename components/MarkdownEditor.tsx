import { ChangeEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";
import editorStyles from "../styles/markdown-editor.module.css";
import utilsStyle from "../styles/utils.module.css";

interface IProps {
	value: string;
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const MarkdownEditor: React.FC<IProps> = ({ value, onChange }) => {
	return (
		<TextareaAutosize
			value={value}
			onChange={onChange}
			className={`${editorStyles["editor-textarea"]} ${utilsStyle.borderless}`}
		/>
	);
};

export default MarkdownEditor;
