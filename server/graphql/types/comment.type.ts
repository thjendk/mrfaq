import { gql } from 'apollo-server-express';
import { Resolvers } from 'types/resolvers-types';
import Comment from 'models/comment.model';
import { permitAdmin } from 'graphql/utils';

export const commentTypeDefs = gql`
	extend type Mutation {
		createComment(data: CommentInput): Post
		deleteComment(id: Int): Post
	}

	type Comment {
		id: Int
		text: String
		admin: Admin
		createdAt: String
		updatedAt: String
	}

	input CommentInput {
		text: String
		postId: Int
	}
`;

export const commentResolvers: Resolvers = {
	Mutation: {
		createComment: async (root, { data: { text, postId } }, ctx) => {
			await Comment.query().insert({ text, postId, adminId: ctx.admin?.adminId });
			return { id: postId };
		},
		deleteComment: async (root, { id }, ctx) => {
			permitAdmin(ctx);
			const comment = await Comment.query().findById(id);
			await comment.$query().delete();
			return { id: comment.postId };
		}
	},

	Comment: {
		id: ({ id }) => id,
		text: async ({ id }, args, ctx) => {
			const comment = await ctx.commentLoader.load(id);
			return comment.text;
		},
		admin: async ({ id }, args, ctx) => {
			const comment = await ctx.commentLoader.load(id);
			if (!comment.adminId) return null;
			return { id: comment.adminId };
		},
		createdAt: async ({ id }, args, ctx) => {
			const comment = await ctx.commentLoader.load(id);
			return comment.createdAt?.toISOString();
		},
		updatedAt: async ({ id }, args, ctx) => {
			const comment = await ctx.commentLoader.load(id);
			return comment.updatedAt?.toISOString();
		}
	}
};
