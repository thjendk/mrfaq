import { gql } from 'apollo-server-express';
import Tag from 'models/tag.model';
import { Resolvers } from 'types/resolvers-types';
import { permitAdmin } from 'graphql/utils';

export const tagTypeDefs = gql`
	extend type Query {
		tags: [Tag]
	}

	extend type Mutation {
		createTag(data: TagInput): Tag
		editTag(id: Int, data: TagInput): Tag
		deleteTag(id: Int): String
	}

	type Tag {
		id: Int
		name: String
		color: String
	}

	input TagInput {
		name: String
		color: String
	}
`;

export const tagResolvers: Resolvers = {
	Query: {
		tags: async () => {
			const tags = await Tag.query();
			return tags.map((t) => ({ id: t.tagId }));
		}
	},

	Mutation: {
		createTag: async (root, { data: { name, color } }, ctx) => {
			permitAdmin(ctx);
			const tag = await Tag.query().insertAndFetch({ name, color });
			return { id: tag.tagId };
		},
		editTag: async (root, { id, data: { name, color } }, ctx) => {
			permitAdmin(ctx);
			const tag = await Tag.query().updateAndFetchById(id, { name, color });
			return { id: tag.tagId };
		},
		deleteTag: async (root, { id }, ctx) => {
			permitAdmin(ctx);
			await Tag.query().deleteById(id);
			return `Tag ${id} has been deleted`;
		}
	},

	Tag: {
		id: ({ id }) => id,
		name: async ({ id }, args, ctx) => {
			const tag = await ctx.tagLoader.load(id);
			return tag.name;
		},
		color: async ({ id }, args, ctx) => {
			const tag = await ctx.tagLoader.load(id);
			return tag.color;
		}
	}
};
