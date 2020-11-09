import MarkdownParser from "../utils/MarkdownParser";

interface IProps {
	markdown: string;
}

const MarkdownPreview: React.FC<IProps> = ({ markdown }) => {
	return <div dangerouslySetInnerHTML={{ __html: MarkdownParser.parse(markdown) }}></div>;
};

export default MarkdownPreview;
