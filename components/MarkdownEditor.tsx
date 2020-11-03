import { ChangeEvent } from "react";

interface IProps {
	value: string;
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const MarkdownEditor = (props: IProps) => {
	return <textarea value={props.value} onChange={props.onChange} rows={30} style={{ width: "100%" }} />;
};

export default MarkdownEditor;
