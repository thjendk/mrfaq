import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import Post from 'classes/Post.class';
import PostForm from './PostForm';
import { PostInput } from 'types/generated';
import { Row, RowHeader, RowExpand } from './Post';

export interface PostCreatorProps {
	post?: Post;
}

const PostCreator: React.SFC<PostCreatorProps> = () => {
	const ref = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	const handleSubmit = async (data: PostInput) => {
		await Post.create(data);
		setIsOpen(false);
	};

	return (
		<Row>
			<RowHeader style={{ textAlign: 'center' }}>
				<Button variant="outline-secondary" block onClick={() => setIsOpen(!isOpen)}>
					Opret nyt opslag
				</Button>
			</RowHeader>
			<RowExpand ref={ref} style={isOpen ? { maxHeight: ref.current?.scrollHeight } : { maxHeight: 0 }}>
				<div style={{ padding: '15px' }}>
					<PostForm onSubmit={handleSubmit} />
				</div>
			</RowExpand>
		</Row>
	);
};

export default PostCreator;
