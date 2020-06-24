import React from 'react';
import PostForm from './PostForm';
import Post from 'classes/Post.class';

export interface PostEditorProps {
	post: Post;
	onCancel: Function;
}

const PostEditor: React.SFC<PostEditorProps> = ({ post, onCancel }) => {
	return <PostForm onCancel={onCancel} post={post} />;
};

export default PostEditor;
