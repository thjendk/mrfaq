import { Message as MessageType, MessageInput } from 'types/generated';
import Apollo from './Apollo.class';
import { store } from 'index';
import combinedReducer from 'redux/reducers/combined.reducer';
import { gql } from '@apollo/client';

interface Message extends MessageType {}

class Message {
	static fragment = gql`
		fragment Message on Message {
			id
			text
			email
			createdAt
			answered
			comments {
				id
				text
				admin {
					id
					fullName
				}
				createdAt
			}
		}
	`;

	static create = async (data: MessageInput) => {
		const mutation = gql`
			mutation CreateMessage($data: MessageInput) {
				createMessage(data: $data) {
					...Message
				}
			}
			${Message.fragment}
		`;

		return await Apollo.mutate<Message>('createMessage', mutation, { data });
	};

	static delete = async (id: number) => {
		const mutation = gql`
      DeleteMessage($id: Int) {
       deleteMessage(id: $id)
      }
    `;

		await Apollo.mutate('deleteMessage', mutation, { id });
		return store.dispatch(combinedReducer.actions.removeMessage(id));
	};

	static findAll = async () => {
		const query = gql`
			query Messages {
				messages {
					...Message
				}
			}
			${Message.fragment}
		`;

		const messages = await Apollo.query<Message[]>('messages', query);
		return store.dispatch(combinedReducer.actions.addMessages(messages));
	};

	static findById = async (id: number) => {
		const query = gql`
			query Message($id: Int) {
				message(id: $id) {
					...Message
				}
			}
			${Message.fragment}
		`;

		const message = await Apollo.query<Message>('message', query, { id });
		return store.dispatch(combinedReducer.actions.addMessages(message));
	};
}

export default Message;
