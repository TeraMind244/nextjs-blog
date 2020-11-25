import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { BlogActions } from "../store/actions";
import { BlogSelectors } from "../store/selectors";
import editorStyles from "../styles/markdown-editor.module.css";
import utilsStyle from "../styles/utils.module.css";

const MarkdownEditor: React.FC = () => {
	const content = useSelector(BlogSelectors.content);
	const dispatch = useDispatch();

	const onChangeTitle = (event: ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(BlogActions.setContent(event.target.value));
	};

	return (
		<TextareaAutosize
			value={content}
			placeholder="Smash your keyboard here"
			onChange={onChangeTitle}
			className={`${editorStyles["editor-textarea"]} ${utilsStyle.borderless}`}
		/>
	);
};

export default MarkdownEditor;
