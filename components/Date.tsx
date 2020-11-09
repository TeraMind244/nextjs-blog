import utilStyles from "../styles/utils.module.css";
import { formatDate, formatHtmlDate } from "../utils/DateTimeHelper";

interface IProps {
	date: number;
}

const Date: React.FC<IProps> = ({ date }) => {
	return (
		<small className={utilStyles.lightText}>
			<time dateTime={formatHtmlDate(date)}>{formatDate(date)}</time>
		</small>
	);
};

export default Date;
