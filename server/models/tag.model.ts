import { Model } from 'objection';

interface Tag {
	tagId: number;
	name: string;
	color: string;
	description: string;
}

class Tag extends Model {
	static tableName = 'tags';
	static idColumn = 'tagId';
}

export default Tag;
