/* eslint-disable */
import dotenv from 'dotenv-flow';
dotenv.config({ default_node_env: 'development' });
import express from 'express';
import path from 'path';
import apollo from 'config/apolloServer';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

import './config/objection';
import Admin from 'models/admin.model';
const app = express();
const port = process.env.PORT || 3001;
const secret = process.env.SECRET || '';

app.use(helmet());
app.use(cookieParser());
app.use(async (req: any, res, next) => {
	const token = req.cookies?.user;

	if (token) {
		try {
			const tokenInfo = jwt.verify(token, secret) as Admin;
			const admin = await Admin.query().findById(tokenInfo.adminId);
			req.admin = admin;
		} catch (error) {
			res.cookie('user', {}, { expires: new Date(0) });
			// If no admin is logged in, admin is null
			req.admin = null;
		}
	}

	next();
});

apollo.applyMiddleware({ app });

// Serve index.js
app.use(express.static(path.join(__dirname, '..')));
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server started on http://localhost:${port}`);
});
