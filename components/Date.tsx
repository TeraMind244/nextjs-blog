import utilStyles from "../styles/utils.module.css";
import { formatDate } from "../utils/DateTimeHelper";

interface IProps {
	dateString: string;
}

const Date = ({ dateString }: IProps) => {
	return (
		<small className={utilStyles.lightText}>
			<time dateTime={dateString}>{formatDate(dateString)}</time>
		</small>
	);
};

export default Date;
