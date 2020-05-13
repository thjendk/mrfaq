import { Model } from 'objection';

interface Comment {
	commentId: number;
	text: string;
	postId: number;
	adminId: number;
	createdAt: Date;
	updatedAt: Date;
}

class Comment extends Model {
	static tableName = 'comments';
	static idColumn = 'commentId';

	$beforeInsert() {
		this.createdAt = new Date();
	}

	$beforeUpdate() {
		this.updatedAt = new Date();
	}
}

export default Comment;
