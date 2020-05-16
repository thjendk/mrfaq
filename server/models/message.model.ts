import { Model } from 'objection';

const randBetween = (min: number, max: number) => {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
};

interface Message {
	messageId: number;
	text: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
}

class Message extends Model {
	static tableName = 'messages';
	static idColumn = 'messageId';

	$beforeInsert() {
		this.createdAt = new Date();
		this.messageId = randBetween(1, 999999);
	}

	$beforeUpdate() {
		this.updatedAt = new Date();
	}
}

export default Message;
