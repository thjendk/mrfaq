import { MessageCommentInput, MessageComment as MessageCommentType } from 'types/generated';
import { gql } from '@apollo/client';
import Apollo from './Apollo.class';
import Message from './Message.class';
import { store } from 'index';
import combinedReducer from 'redux/reducers/combined.reducer';

interface MessageComment extends MessageCommentType {}

class MessageComment {
	static create = async (data: MessageCommentInput) => {
		const mutation = gql`
			mutation CreateMessageComment($data: MessageCommentInput) {
				createMessageComment(data: $data) {
					...Message
				}
			}
			${Message.fragment}
		`;

		const message = await Apollo.mutate<Message>('createMessageComment', mutation, { data });
		return store.dispatch(combinedReducer.actions.addMessages(message));
	};

	static delete = async (id: number) => {
		const mutation = gql`
			mutation DeleteMessageComment($id: Int) {
				deleteMessageComment(id: $id) {
					...Message
				}
			}
			${Message.fragment}
		`;

		const message = await Apollo.mutate<Message>('deleteMessageComment', mutation, { id });
		return store.dispatch(combinedReducer.actions.addMessages(message));
	};
}

export default MessageComment;
