import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from 'graphql/types';
import generateLoaders from 'graphql/loaders';
import jwt from 'jsonwebtoken';
import express from 'express';
import User from 'models/user.model';
const secret = process.env.SECRET || '';

const getUserFromCookie = (req: express.Request, res: express.Response) => {
	const token = req.cookies?.user;

	if (token) {
		try {
			return jwt.verify(token, secret) as User;
		} catch (error) {
			res.cookie('user', {}, { expires: new Date(0) });
			return null;
		}
	}

	// If no user is logged in, user is null
	return null;
};

const generateContext = (req: express.Request, res: express.Response) => ({
	...generateLoaders(),
	user: getUserFromCookie(req, res),
	res,
	req
});

export type Context = ReturnType<typeof generateContext>;

export default new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req, res }) => generateContext(req, res)
});
