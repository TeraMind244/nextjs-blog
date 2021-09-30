import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

enum Protocol {
	HTTP = "http",
	WS = "ws"
}

const PORT = 4000;
const DOMAIN = `localhost:${PORT}`;
const SUBPATH = "/graphql";
const graphQlServerPath = `${Protocol.HTTP}://${DOMAIN}${SUBPATH}`;

const wsLink = new WebSocketLink({
	uri: `${Protocol.WS}://${DOMAIN}${SUBPATH}`,
	options: {
		reconnect: true
	}
});

const httpLink = new HttpLink({
	uri: graphQlServerPath,
});

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return definition.kind === "OperationDefinition" && definition.operation === "subscription";
	},
	wsLink,
	httpLink
);

export const client = new ApolloClient({
	link: splitLink,
	uri: graphQlServerPath,
	cache: new InMemoryCache()
});
