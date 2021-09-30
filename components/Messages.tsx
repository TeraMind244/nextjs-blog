import { useSubscription } from "@apollo/client";
import clsx from "clsx";
import { GET_MESSAGES } from "../graphql/client/Query";

const Messages = ({ user }) => {
	const { data } = useSubscription(GET_MESSAGES);

	if (!data) {
		return null;
	}

	return (
		<>
			{data.messages.map(({ id, user: messageUser, content }) => {
				const isFromMe = user === messageUser;
				return (
					<>
						<div key={id} className={clsx("message-wrapper", isFromMe && "message-wrapper-me")}>
							{!isFromMe && (
								<div title={messageUser} className="sender-avatar">
									{messageUser.slice(0, 2).toUpperCase()}
								</div>
							)}
							<div className={clsx("message-content", isFromMe && "message-content-me")}>{content}</div>
						</div>
						<style jsx>{`
							.message-wrapper {
								display: flex;
								font-family: Commic Sans MS;
								padding: 1em;
								justify-content: flex-start;
							}
							.message-wrapper.message-wrapper-me {
								justify-content: flex-end;
							}
							.sender-avatar {
								height: 40px;
								width: 40px;
								margin-right: 0.5em;
								border: 2px solid #e5e6ea;
								border-radius: 20px;
								text-align: center;
								font-size: 18pt;
							}
							.message-content {
								background: #e1e1e1;
								color: black;
								padding: 0.5em 1em;
								border-radius: 5px;
								max-width: 60%;
							}
							.message-content.message-content-me {
								background: #4caf50;
								color: white;
							}
						`}</style>
					</>
				);
			})}
		</>
	);
};

export default Messages;
