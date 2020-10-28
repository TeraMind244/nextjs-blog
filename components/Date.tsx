import { parseISO, format } from "date-fns";
import utilStyles from "../styles/utils.module.css";

const Date = ({ dateString }) => {
	const date = parseISO(dateString);
	return (
		<small className={utilStyles.lightText}>
			<time dateTime={dateString}>{format(date, "LLLL dd, yyyy")}</time>
		</small>
	);
};

export default Date;
