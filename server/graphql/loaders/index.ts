import Admin from 'models/admin.model';
import Dataloader from 'dataloader';
import Post from 'models/post.model';
import Tag from 'models/tag.model';
import Comment from 'models/comment.model';

const batchAdmins = async (ids: number[]) => {
	const admins = await Admin.query().findByIds(ids);
	return ids.map((id) => admins.find((admin) => admin.adminId === id));
};
const batchPosts = async (ids: number[]) => {
	const posts = await Post.query().findByIds(ids);
	return ids.map((id) => posts.find((post) => post.postId === id));
};
const batchTags = async (ids: number[]) => {
	const tags = await Tag.query().findByIds(ids);
	return ids.map((id) => tags.find((tag) => tag.tagId === id));
};
const batchComments = async (ids: number[]) => {
	const comments = await Comment.query().findByIds(ids);
	return ids.map((id) => comments.find((c) => c.commentId === id));
};

const generateAdminLoader = () => new Dataloader((ids: number[]) => batchAdmins(ids));
const generatePostLoader = () => new Dataloader((ids: number[]) => batchPosts(ids));
const generateTagLoader = () => new Dataloader((ids: number[]) => batchTags(ids));
const generateCommentLoader = () => new Dataloader((ids: number[]) => batchComments(ids));

export default function generateLoaders() {
	return {
		adminLoader: generateAdminLoader(),
		postLoader: generatePostLoader(),
		tagLoader: generateTagLoader(),
		commentLoader: generateCommentLoader()
	};
}
