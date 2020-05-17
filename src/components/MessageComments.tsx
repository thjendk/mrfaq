import React from 'react';
import Message from 'classes/Message.class';
import CommentComponent from './Comment';
import MessageComment from 'classes/MessageComment.class';
import CommentForm from './CommentForm';

export interface MessageCommentsProps {
	message: Message;
}

const MessageComments: React.SFC<MessageCommentsProps> = ({ message }) => {
	const handleDelete = async (id: number) => {
		await MessageComment.delete(id);
	};

	const handleSubmit = async (text: string) => {
		await MessageComment.create({ text, messageId: message.id });
	};

	return (
		<div>
			{message.comments.map((c) => (
				<CommentComponent
					commentAdmin={c.admin}
					onDelete={() => handleDelete(c.id)}
					text={c.text}
					createdAt={c.createdAt}
				/>
			))}
			<CommentForm onSubmit={(text) => handleSubmit(text)} />
		</div>
	);
};

export default MessageComments;
