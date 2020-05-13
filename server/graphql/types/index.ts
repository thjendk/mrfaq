import { gql } from 'apollo-server-express';
import { adminTypeDefs, adminResolvers } from './admin.type';
import { postTypeDefs, postResolvers } from './post.type';
import { tagTypeDefs, tagResolvers } from './tag.type';
import { commentTypeDefs, commentResolvers } from './comment.type';

const rootDefs = gql`
	type Query {
		_empty: Boolean
	}

	type Mutation {
		_empty: Boolean
	}
`;

export const typeDefs = [rootDefs, adminTypeDefs, postTypeDefs, tagTypeDefs, commentTypeDefs];

export const resolvers = [adminResolvers, postResolvers, tagResolvers, commentResolvers];
