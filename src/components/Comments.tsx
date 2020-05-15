import React, { useState } from 'react';
import Post from 'classes/Post.class';
import Comment from './Comment';
import { Form, Button } from 'react-bootstrap';
import CommentClass from 'classes/Comment.class';

export interface CommentsProps {
	post: Post;
}

const Comments: React.SFC<CommentsProps> = ({ post }) => {
	const [text, setText] = useState('');

	const handleSubmit = async () => {
		await CommentClass.create({ text, postId: post.id });
	};

	return (
		<div style={{ margin: '1rem' }}>
			{post.comments.map((c) => (
				<Comment comment={c} />
			))}
			<Form>
				<Form.Group>
					<Form.Label>Kommentar</Form.Label>
					<Form.Control
						as="textarea"
						value={text}
						onChange={(e) => setText(e.target.value)}
						rows={3}
						placeholder="Skriv din kommentar"
					/>
				</Form.Group>
				<Form.Group>
					<Button onClick={handleSubmit} variant="secondary">
						Tilføj kommentar
					</Button>
				</Form.Group>
			</Form>
		</div>
	);
};

export default Comments;
