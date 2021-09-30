import { IResolvers } from "apollo-server-micro";
import { PubSub } from "graphql-subscriptions";

export type IResolver = IResolvers<IMessage, IContext>;

export interface IMessage {
	id: number;
	user: string;
	content: string;
}

export interface IContext {
	pubsub: PubSub;
}
