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

		createMessageComment(data: MessageCommentInput): Message
		deleteMessageComment(id: Int): Message
	}

	type Message {
		id: Int
		text: String
		email: String
		comments: [MessageComment]
		createdAt: String
		answered: Boolean
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

	input MessageCommentInput {
		text: String
		messageId: Int
	}
`;

export const messageResolvers: Resolvers = {
	Query: {
		messages: async (root, args, ctx) => {
			permitAdmin(ctx);
			const messages = await Message.query().where({ deleted: 0 });
			return messages.map((m) => ({ id: m.messageId }));
		},
		message: async (root, { id }, ctx) => {
			const message = await Message.query().findById(id).where({ deleted: 0 });
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

			await Message.query().findById(id).update({ deleted: 1 });
			return `Deleted message with ID ${id}`;
		},
		createMessageComment: async (root, { data }, ctx) => {
			const comment = await MessageComment.query().insertAndFetch({ ...data, adminId: ctx.admin.adminId });
			return { id: comment.messageId };
		},
		deleteMessageComment: async (root, { id }, ctx) => {
			permitAdmin(ctx);
			const comment = await MessageComment.query().findById(id);
			await comment.$query().delete();
			return { id: comment.messageId };
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
		},
		answered: async ({ id }) => {
			const isAnswered = await MessageComment.query().where({ messageId: id }).whereNotNull('adminId').first();
			return !!isAnswered;
		}
	},

	MessageComment: {
		id: ({ id }) => id,
		text: async ({ id }, args, ctx) => {
			const comment = await ctx.messageCommentLoader.load(id);
			return comment.text;
		},
		admin: async ({ id }, args, ctx) => {
			const comment = await ctx.messageCommentLoader.load(id);
			return { id: comment.adminId };
		},
		createdAt: async ({ id }, args, ctx) => {
			const comment = await ctx.messageCommentLoader.load(id);
			return comment.createdAt.toISOString();
		}
	}
};
