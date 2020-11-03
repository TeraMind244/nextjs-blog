import { ChangeEvent, useState } from "react";
import { createBlog } from "../utils/RequestHelper";
import MarkdownEditor from "./MarkdownEditor";
import MarkdownPreview from "./MarkdownPreview";

const MarkdownWrapper = () => {
	const [markdown, setMarkdown] = useState("");
	const [title, setTitle] = useState("");

	const onChangeMarkdown = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setMarkdown(event.target.value);
	};

	const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const onClickCreateButtonHandler = async () => {
		await createBlog(title, markdown);
	};

	return (
		<table width="100%">
			<tbody>
				<tr>
					<td>
						<b>Title</b>
					</td>
					<td>
						<input value={title} onChange={onChangeTitle} />
					</td>
				</tr>
				<tr></tr>
				<tr>
					<td width="50%">
						<MarkdownEditor value={markdown} onChange={onChangeMarkdown} />
					</td>
					<td width="50%" style={{ verticalAlign: "top" }}>
						<MarkdownPreview markdown={markdown} />
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td></td>
					<td>
						<button onClick={onClickCreateButtonHandler}>Create</button>
					</td>
				</tr>
			</tfoot>
		</table>
	);
};

export default MarkdownWrapper;
