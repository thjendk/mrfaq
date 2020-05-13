import { gql } from 'apollo-server-express';
import { Resolvers } from 'types/resolvers-types';
import Post from 'models/post.model';
import PostTag from 'models/postsTags.model';
import { permitAdmin } from 'graphql/utils';
import Comment from 'models/comment.model';

export const postTypeDefs = gql`
	extend type Query {
		posts: [Post]
		post(id: Int): Post
	}

	extend type Mutation {
		createPost(data: PostInput): Post
		editPost(id: Int, data: PostInput): Post
		deletePost(id: Int): String
		addPostTag(data: PostTagInput): Post
		removePostTag(data: PostTagInput): Post
	}

	type Post {
		id: Int
		title: String
		text: String
		tags: [Tag]
		comments: [Comment]
	}

	input PostInput {
		title: String
		text: String
	}

	input PostTagInput {
		tagId: Int
		postId: Int
	}
`;

export const postResolvers: Resolvers = {
	Query: {
		posts: async () => {
			const posts = await Post.query().where({ deleted: 0 });
			return posts.map((p) => ({ id: p.postId }));
		},
		post: async (root, { id }) => {
			const post = await Post.query().findById(id).where({ deleted: 0 });
			return { id: post.postId };
		}
	},

	Mutation: {
		createPost: async (root, { data: { title, text } }, ctx) => {
			permitAdmin(ctx);
			const post = await Post.query().insertAndFetch({ title, text });
			return { id: post.postId };
		},
		editPost: async (root, { id, data: { title, text } }, ctx) => {
			permitAdmin(ctx);
			const post = await Post.query().updateAndFetchById(id, { title, text });
			return { id: post.postId };
		},
		deletePost: async (root, { id }, ctx) => {
			permitAdmin(ctx);
			await Post.query().updateAndFetchById(id, { deleted: 1 });
			return `Post ${id} has been deleted`;
		},
		addPostTag: async (root, { data: { tagId, postId } }, ctx) => {
			permitAdmin(ctx);
			await PostTag.query().insert({ tagId, postId });
			return { id: postId };
		},
		removePostTag: async (root, { data: { tagId, postId } }, ctx) => {
			permitAdmin(ctx);
			await PostTag.query().where({ tagId, postId }).delete();
			return { id: postId };
		}
	},

	Post: {
		id: ({ id }) => id,
		title: async ({ id }, args, ctx) => {
			const post = await ctx.postLoader.load(id);
			return post.title;
		},
		text: async ({ id }, args, ctx) => {
			const post = await ctx.postLoader.load(id);
			return post.text;
		},
		tags: async ({ id }) => {
			const joins = await PostTag.query().where({ postId: id });
			return joins.map((j) => ({ id: j.tagId }));
		},
		comments: async ({ id }) => {
			const comments = await Comment.query().where({ postId: id });
			return comments.map((c) => ({ id: c.commentId }));
		}
	}
};
