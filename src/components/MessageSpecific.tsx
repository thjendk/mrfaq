import React, { useEffect, useState } from 'react';
import Message from 'classes/Message.class';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import MessageComments from './MessageComments';
import AnsweredTag from './AnsweredTag';

export interface MessageSpecificProps {}

const MessageSpecific: React.SFC<MessageSpecificProps> = () => {
	const params = useParams<{ messageId: string }>();
	const messageId = Number(params.messageId);
	const message = useSelector((state: ReduxState) => state.combined.messages.find((m) => m.id === messageId));
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		Message.findById(messageId).then(() => {
			setLoading(false);
		});
	});

	if (loading) return <p>Loading...</p>;
	if (!message) return <p>Beskeden blev ikke fundet</p>;
	return (
		<div>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<h1>
					Besked <span style={{ color: 'lightgrey' }}>#{message.id}</span>
				</h1>
				<AnsweredTag answered={message.answered} />
			</div>
			<div style={{ border: '1px solid lightgrey', borderRadius: '7px', padding: '10px' }}>
				<p style={{ margin: 0 }}>
					<b>Besked: </b>
					{message.text}
				</p>
				{message.email && (
					<p style={{ margin: 0 }}>
						<b>Email: </b>
						{message.email}
					</p>
				)}
				<hr />
				<div>
					<h2 style={{ fontSize: '1.2em' }}>Kommentarer</h2>
					<MessageComments message={message} />
				</div>
			</div>
		</div>
	);
};

export default MessageSpecific;
