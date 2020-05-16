import { Model } from 'objection';

interface MessageComment {
	messageCommentId: number;
	text: string;
	messageId: number;
	adminId: number;
	createdAt: Date;
}

class MessageComment extends Model {
	static tableName = 'messageComments';
	static idColumn = 'messageCommentId';

	$beforeInsert() {
		this.createdAt = new Date();
	}
}

export default MessageComment;
