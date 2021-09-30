import { gql } from "apollo-server-micro";

const typeDefs = gql`
	type Message {
		id: ID!
		user: String!
		content: String!
	}
`;

export default typeDefs;
