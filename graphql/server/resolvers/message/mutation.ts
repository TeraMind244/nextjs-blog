import { IMessage, IResolver } from "../../../../interfaces";
import { messages, notifySubscribers } from "../../data";

const resolver: IResolver = {
	Mutation: {
		postMessage: (parent, { user, content }: IMessage): number => {
			const id = messages.length;
			messages.push({
				id,
				user,
				content
			});
			notifySubscribers();
			return id;
		}
	}
};

export default resolver;
