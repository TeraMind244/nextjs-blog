import { ChangeEvent } from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { BlogActions } from "../store/actions";
import { IStateProps } from "../store/reducers";
import { BlogSelectors } from "../store/selectors";
import editorStyles from "../styles/markdown-editor.module.css";
import utilsStyle from "../styles/utils.module.css";

interface IOwnProps {
	content: string;
}

interface IDispatchProps {
	setContent: (content: string) => void;
}

type IProps = IDispatchProps & IOwnProps;

const MarkdownEditor: React.FC<IProps> = ({ content, setContent }) => {
	const onChangeTitle = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setContent(event.target.value);
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

const mapStateToProps: MapStateToProps<IOwnProps, {}, IStateProps> = state => {
	return {
		content: BlogSelectors.content(state)
	};
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, {}> = dispatch => {
	return {
		setContent: content => dispatch(BlogActions.setContent(content))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MarkdownEditor);
