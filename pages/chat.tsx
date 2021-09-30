import { ApolloProvider, useMutation } from "@apollo/client";
import { NextPage } from "next";
import { useState } from "react";
import { Button, Col, Container, FormInput, Row } from "shards-react";
import Messages from "../components/Messages";
import { client } from "../graphql/client/ApolloClient";
import { SEND_MESSAGE } from "../graphql/client/Query";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

const Chat: NextPage = () => {
	const [user, setUser] = useState("");
	const [content, setContent] = useState("");
	const [sendMessage] = useMutation(SEND_MESSAGE);

	const handleChangeUser = event => {
		setUser(event.target.value);
	};

	const handleChangeContent = event => {
		setContent(event.target.value);
	};

	const onSendMessage = () => {
		if (user.length > 0 && content.length > 0) {
			sendMessage({
				variables: {
					user,
					content
				}
			});
			setContent("");
		}
	};

	const handleOnKeyUpContent = event => {
		if (event.keyCode === 13) {
			onSendMessage();
		}
	};

	return (
		<Container>
			<Messages user={user} />
			<Row>
				<Col xs={2}>
					<FormInput label="User" value={user} onChange={handleChangeUser} />
				</Col>
				<Col xs={8}>
					<FormInput
						label="Content"
						value={content}
						onChange={handleChangeContent}
						onKeyUp={handleOnKeyUpContent}
					/>
				</Col>
				<Col xs={2}>
					<Button onClick={onSendMessage}>Send</Button>
				</Col>
			</Row>
			<style jsx global>{`
				body {
					font-family: Arial, Helvetica, sans-serif;
				}
				.container {
					margin: 40px auto;
				}
			`}</style>
		</Container>
	);
};

export default () => {
	return (
		<ApolloProvider client={client}>
			<Chat />
		</ApolloProvider>
	);
};
