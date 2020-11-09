import { ChangeEvent } from "react";
import editorStyles from "../styles/markdown-editor.module.css";

interface IProps {
	value: string;
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const MarkdownEditor: React.FC<IProps> = ({ value, onChange }) => {
	return <textarea value={value} onChange={onChange} rows={30} className={editorStyles["editor-textarea"]} />;
};

export default MarkdownEditor;
