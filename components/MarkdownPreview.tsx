import { connect, MapStateToProps } from "react-redux";
import { IStateProps } from "../store/reducers";
import { BlogSelectors } from "../store/selectors";
import MarkdownParser from "../utils/MarkdownParser";

interface IOwnProps {
	content: string;
}

const MarkdownPreview: React.FC<IOwnProps> = ({ content }) => {
	return <div dangerouslySetInnerHTML={{ __html: MarkdownParser.parse(content) }}></div>;
};

const mapStateToProps: MapStateToProps<IOwnProps, {}, IStateProps> = state => {
	return {
		content: BlogSelectors.content(state)
	};
};

export default connect(mapStateToProps)(MarkdownPreview);
