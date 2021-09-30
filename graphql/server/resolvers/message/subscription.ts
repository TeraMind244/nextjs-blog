import { IResolver } from "../../../../interfaces";
import { genId } from "../../../../utils/StringUtils";
import { messages, onMessagesUpdate } from "../../data";

const resolver: IResolver = {
	Subscription: {
		messages: (parent, args, { pubsub }) => {
			const channel = genId();

			onMessagesUpdate(() => pubsub.publish(channel, { messages }));
			setTimeout(() => pubsub.publish(channel, { messages }), 0);

			return pubsub.asyncIterator(channel);
		}
	}
};

export default resolver;
