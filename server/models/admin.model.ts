import { Model } from 'objection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const secret = process.env.SECRET;

interface Admin {
	adminId: number;
	username: string;
	fullName: string;
	password: string;
	level: number;
	lastLogin: Date;
}

class Admin extends Model {
	static tableName = 'admins';
	static idColumn = 'adminId';

	$beforeInsert() {
		this.password = bcrypt.hashSync(this.password, 10);
	}

	verify(password: string) {
		return bcrypt.compare(password, this.password);
	}

	signToken() {
		const { adminId, username } = this;

		return jwt.sign({ adminId, username }, secret);
	}
}

export default Admin;
