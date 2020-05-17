import React from 'react';
import Post from 'classes/Post.class';
import Comment from './Comment';
import CommentClass from 'classes/Comment.class';
import CommentForm from './CommentForm';

export interface CommentsProps {
	post: Post;
}

const Comments: React.SFC<CommentsProps> = ({ post }) => {
	const handleSubmit = async (text: string) => {
		await CommentClass.create({ text, postId: post.id });
	};

	const handleDelete = async (id: number) => {
		await CommentClass.remove(id);
	};

	return (
		<div style={{ margin: '1rem' }}>
			{post.comments.map((c) => (
				<Comment
					commentAdmin={c.admin}
					createdAt={c.createdAt}
					onDelete={() => handleDelete(c.id)}
					text={c.text}
					key={c.id}
				/>
			))}
			<CommentForm onSubmit={(text) => handleSubmit(text)} />
		</div>
	);
};

export default Comments;
