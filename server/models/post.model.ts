import { Model } from 'objection';

interface Post {
	postId: number;
	title: string;
	text: string;
	adminId: number;
	deleted: 1 | 0;
	createdAt: Date;
	updatedAt: Date;
}

class Post extends Model {
	static tableName = 'posts';
	static idColumn = 'postId';

	$beforeInsert() {
		this.createdAt = new Date();
	}

	$beforeUpdate() {
		this.updatedAt = new Date();
	}
}

export default Post;
