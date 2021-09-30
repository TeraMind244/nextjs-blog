import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
	mutation($user: String!, $content: String!) {
		postMessage(user: $user, content: $content)
	}
`;

export const GET_MESSAGES = gql`
	subscription {
		messages {
			id
			user
			content
		}
	}
`;
