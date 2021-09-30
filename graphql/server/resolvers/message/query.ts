import { IResolver } from "../../../../interfaces";
import { messages } from "../../data";

const resolver: IResolver = {
	Query: {
		messages: () => messages
	}
};

export default resolver;
