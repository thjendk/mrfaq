import React from 'react';
import { Card, Accordion, Button } from 'react-bootstrap';
import Post from 'classes/Post.class';
import PostForm from './PostForm';
import { PostInput } from 'types/generated';

export interface PostCreatorProps {
	post?: Post;
}

const PostCreator: React.SFC<PostCreatorProps> = () => {
	const handleSubmit = async (data: PostInput) => {
		await Post.create(data);
	};

	return (
		<Card>
			<Card.Header style={{ textAlign: 'center' }}>
				<Accordion.Toggle as={Button} variant="outline-secondary" block eventKey="new">
					Opret nyt opslag
				</Accordion.Toggle>
			</Card.Header>
			<Accordion.Collapse eventKey="new">
				<Card.Body>
					<PostForm onSubmit={handleSubmit} />
				</Card.Body>
			</Accordion.Collapse>
		</Card>
	);
};

export default PostCreator;
