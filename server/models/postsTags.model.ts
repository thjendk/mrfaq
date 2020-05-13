import { Model } from 'objection';

interface PostTag {
	postId: number;
	tagId: number;
}

class PostTag extends Model {
	static tableName = 'postsTags';
	static idColumn = ['postId', 'tagId'];
}

export default PostTag;
