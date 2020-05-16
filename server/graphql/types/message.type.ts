import { gql } from 'apollo-server-express';
import { Resolvers } from 'types/resolvers-types';
import Message from 'models/message.model';
import { permitAdmin } from 'graphql/utils';
import MessageComment from 'models/messageComment.model';

export const messageTypeDefs = gql`
	extend type Query {
		messages: [Message]
		message(id: Int): Message
	}

	extend type Mutation {
		createMessage(data: MessageInput): Message
		deleteMessage(id: Int): String
	}

	type Message {
		id: Int
		text: String
		email: String
		comments: [MessageComment]
		createdAt: String
	}

	input MessageInput {
		text: String
		email: String
	}

	type MessageComment {
		id: Int
		text: String
		admin: Admin
		createdAt: String
	}
`;

export const messageResolvers: Resolvers = {
	Query: {
		messages: async (root, args, ctx) => {
			permitAdmin(ctx);
			const messages = await Message.query();
			return messages.map((m) => ({ id: m.messageId }));
		},
		message: async (root, { id }, ctx) => {
			const message = await Message.query().findById(id);
			return { id: message.messageId };
		}
	},

	Mutation: {
		createMessage: async (root, { data }) => {
			const message = await Message.query().insertAndFetch(data);
			return { id: message.messageId };
		},
		deleteMessage: async (root, { id }, ctx) => {
			permitAdmin(ctx);

			await Message.query().deleteById(id);
			return `Deleted message with ID ${id}`;
		}
	},

	Message: {
		id: ({ id }) => id,
		text: async ({ id }, args, ctx) => {
			const message = await ctx.messageLoader.load(id);
			return message.text;
		},
		email: async ({ id }, args, ctx) => {
			const message = await ctx.messageLoader.load(id);
			return message.email;
		},
		createdAt: async ({ id }, args, ctx) => {
			const message = await ctx.messageLoader.load(id);
			return message.createdAt.toISOString();
		},
		comments: async ({ id }) => {
			const comments = await MessageComment.query().where({ messageId: id });
			return comments.map((c) => ({ id: c.messageCommentId }));
		}
	},

	MessageComment: {
		id: ({ id }) => id
		// TODO: Lav resten af message comments, også på frontend
	}
};
