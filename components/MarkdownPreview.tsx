import { useSelector } from "react-redux";
import { BlogSelectors } from "../store/selectors";
import MarkdownParser from "../utils/MarkdownParser";

const MarkdownPreview: React.FC = () => {
	const markdown = useSelector(BlogSelectors.content);

	return <div dangerouslySetInnerHTML={{ __html: MarkdownParser.parse(markdown) }}></div>;
};

export default MarkdownPreview;
