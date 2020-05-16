import { gql } from 'apollo-server-express';
import Admin from 'models/admin.model';
import { Resolvers } from 'types/resolvers-types';
import { permitAdmin } from 'graphql/utils';

export const adminTypeDefs = gql`
	extend type Query {
		admin: Admin
		admins: [Admin]
	}

	extend type Mutation {
		login(data: LoginInput): String
		logout: String
		createAdmin(data: AdminInput): Admin
		editAdmin(id: Int, data: AdminInput): Admin
		deleteAdmin(id: Int): String
	}

	type Admin {
		id: Int
		username: String
		fullName: String
		level: Int
	}

	input LoginInput {
		username: String
		password: String
	}

	input AdminInput {
		username: String
		password: String
		fullName: String
	}
`;

export const adminResolvers: Resolvers = {
	Query: {
		admin: async (obj, args, ctx, info) => {
			if (!ctx.admin) return null;

			const admin = await Admin.query().findById(ctx.admin.adminId);
			if (!admin) return null;
			return { id: admin.adminId };
		},
		admins: async (obj, args, ctx, info) => {
			permitAdmin(ctx);
			const admins = await Admin.query();
			return admins.filter((a) => a.level <= ctx.admin.level).map((a) => ({ id: a.adminId }));
		}
	},

	Mutation: {
		login: async (root, { data: { username, password } }, ctx) => {
			const admin = await Admin.query().findOne({ username });
			if (!admin) throw new Error('Incorrect password or username');
			const isValid = admin.verify(password);
			if (!isValid) throw new Error('Incorrect password or username');
			await admin.$query().update({ lastLogin: new Date() });
			const token = admin.signToken();
			ctx.res.cookie('user', token, { expires: new Date(253402300000000) });
			return 'Logged in';
		},
		logout: async (root, args, ctx) => {
			ctx.res.cookie('user', {}, { expires: new Date(0) });
			return 'Logged out';
		},
		createAdmin: async (root, { data: { username, password, fullName } }, ctx) => {
			permitAdmin(ctx);
			const admin = await Admin.query().insertAndFetch({ username, password, fullName });
			return { id: admin.adminId };
		},
		editAdmin: async (root, { id, data }, ctx) => {
			let admin = await Admin.query().findById(id);
			permitAdmin(ctx, admin.level);
			admin = await admin.$query().updateAndFetch(data).skipUndefined();
			return { id: admin.adminId };
		},
		deleteAdmin: async (root, { id }, ctx) => {
			let admin = await Admin.query().findById(id);
			permitAdmin(ctx, admin.level);
			await admin.$query().delete();
			return 'Admin has been deleted';
		}
	},

	Admin: {
		id: ({ id }) => id,
		username: async ({ id }, args, ctx) => {
			const admin = await ctx.adminLoader.load(id);
			return admin.username;
		},
		fullName: async ({ id }, args, ctx) => {
			const admin = await ctx.adminLoader.load(id);
			return admin.fullName;
		},
		level: async ({ id }, args, ctx) => {
			const admin = await ctx.adminLoader.load(id);
			return admin.level;
		}
	}
};
