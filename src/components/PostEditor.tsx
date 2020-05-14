import React from 'react';
import PostForm from './PostForm';
import Post from 'classes/Post.class';
import { PostInput } from 'types/generated';

export interface PostEditorProps {
	post: Post;
	onCancel: Function;
}

const PostEditor: React.SFC<PostEditorProps> = ({ post, onCancel }) => {
	const handleEdit = async (data: PostInput) => {
		await Post.edit(post.id, data);
		onCancel();
	};

	return <PostForm onCancel={onCancel} post={post} onSubmit={handleEdit} />;
};

export default PostEditor;
