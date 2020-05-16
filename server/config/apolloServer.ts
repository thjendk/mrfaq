import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from 'graphql/types';
import generateLoaders from 'graphql/loaders';
import express from 'express';
import Admin from 'models/admin.model';

const generateContext = (req: express.Request & { admin?: Admin }, res: express.Response) => ({
	...generateLoaders(),
	res,
	req,
	admin: req.admin
});

export type Context = ReturnType<typeof generateContext>;

export default new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req, res }) => generateContext(req, res)
});
