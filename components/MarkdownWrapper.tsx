import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlogActions } from "../store/actions";
import { BlogSelectors } from "../store/selectors";
import buttonStyles from "../styles/button.module.css";
import utilsStyle from "../styles/utils.module.css";
import { createBlog } from "../utils/RequestHelper";
import MarkdownEditor from "./MarkdownEditor";
import MarkdownPreview from "./MarkdownPreview";

const MarkdownWrapper: React.FC = () => {
	const title = useSelector(BlogSelectors.title);
	const content = useSelector(BlogSelectors.content);

	const dispatch = useDispatch();
	const [error, setError] = useState("");

	const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
		if (error) {
			setError("");
		}
		dispatch(BlogActions.setTitle(event.target.value));
	};

	const onClickSaveButtonHandler = async () => {
		setError("");
		if (!title) {
			return setError("Empty title!");
		}
		if (!content) {
			return setError("Empty content!");
		}
		await createBlog(title, content);
	};

	return (
		<>
			<div>
				<input
					className={`title ${utilsStyle.borderless}`}
					value={title}
					onChange={onChangeTitle}
					placeholder="Title"
				/>
			</div>
			<div>
				<div className="error">{error}</div>
				<div>
					<MarkdownEditor />
				</div>
				<div>
					<MarkdownPreview />
				</div>
			</div>
			<div className="save-button--wrapper">
				<button
					className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.right}`}
					onClick={onClickSaveButtonHandler}
				>
					Save
				</button>
			</div>
			<style jsx>{`
				input.title {
					width: 100%;
					font-size: 30px;
					font-weight: bold;
					text-align: center;
					margin-bottom: 20px;
				}
				div.width-50 {
					width: 50%;
				}
				div.width-50::first {
					border-left: 1px solid #ccc;
				}
				div.vertical-line {
					width: 1px;
					height: auto;
					border-left: 2px solid #cccccc;
				}
				div.error {
					color: red;
					font-size: 18px;
					font-weight: bold;
				}
				div.save-button--wrapper {
					padding-top: 20px;
				}
			`}</style>
		</>
	);
};

export default MarkdownWrapper;
