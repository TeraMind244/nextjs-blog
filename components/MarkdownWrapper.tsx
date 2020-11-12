import { ChangeEvent, useState } from "react";
import buttonStyles from "../styles/button.module.css";
import utilsStyle from "../styles/utils.module.css";
import { createBlog } from "../utils/RequestHelper";
import MarkdownEditor from "./MarkdownEditor";
import MarkdownPreview from "./MarkdownPreview";

const MarkdownWrapper: React.FC = () => {
	const [markdown, setMarkdown] = useState("");
	const [title, setTitle] = useState("");
	const [error, setError] = useState("");

	const onChangeMarkdown = (event: ChangeEvent<HTMLTextAreaElement>) => {
		if (error) {
			setError("");
		}
		setMarkdown(event.target.value);
	};

	const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
		if (error) {
			setError("");
		}
		setTitle(event.target.value);
	};

	const onClickSaveButtonHandler = async () => {
		setError("");
		if (!title) {
			return setError("Empty title!");
		}
		if (!markdown) {
			return setError("Empty content!");
		}
		await createBlog(title, markdown);
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
					<MarkdownEditor value={markdown} onChange={onChangeMarkdown} />
				</div>
				<div>
					<MarkdownPreview markdown={markdown || "&nbsp;"} />
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
