import { gql } from "apollo-server-micro";

const typeDefs = gql`
	type Subscription {
		messages: [Message!]
	}
`;

export default typeDefs;
