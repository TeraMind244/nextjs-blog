// *Disclaimer:* This file is existed to prove that we can use custom server setup with Next and TS

import { ApolloServer, PubSub } from "apollo-server-express";
import express from "express";
import http from "http";
import next from "next";
import resolvers from "../graphql/server/resolvers";
import typeDefs from "../graphql/server/schemas";

const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const subPath = "/graphql";

const app = express();
const httpServer = http.createServer(app);

const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
	app.get("*", (req, res) => {
		return nextHandler(req, res);
	});

	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
		context: {
			pubsub: new PubSub()
		},
		subscriptions: {
			onConnect: () => console.log("Connected to websocket")
		}
	});
	apolloServer.applyMiddleware({ app, path: subPath });
	apolloServer.installSubscriptionHandlers(httpServer);

	httpServer.listen(port, () => {
		console.log(`Apollo Server on http://localhost:${port}${subPath}`);
	});
});
