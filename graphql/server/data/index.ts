import { IMessage } from "../../../interfaces";

export const messages: IMessage[] = [];
const subscribers: Function[] = [];

export const onMessagesUpdate = (handler: Function) => {
	subscribers.push(handler);
};

export const notifySubscribers = () => {
	subscribers.forEach(fn => fn());
};
