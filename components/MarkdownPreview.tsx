import MarkdownParser from "../utils/MarkdownParser";

interface IProps {
	markdown: string;
}

const MarkdownPreview = ({ markdown }: IProps) => {
	return <div dangerouslySetInnerHTML={{ __html: MarkdownParser.parse(markdown) }}></div>;
};

export default MarkdownPreview;
