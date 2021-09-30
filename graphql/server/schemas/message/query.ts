import { gql } from "apollo-server-micro";

const typeDefs = gql`
	type Query {
		messages: [Message!]
	}
`;

export default typeDefs;
