import { gql } from "apollo-server-micro";

const typeDefs = gql`
	type Mutation {
		postMessage(user: String!, content: String!): ID!
	}
`;

export default typeDefs;
