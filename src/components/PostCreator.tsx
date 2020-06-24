import React from 'react';
import { Button } from 'react-bootstrap';
import Post from 'classes/Post.class';
import { Row } from './Post';
import { useHistory } from 'react-router-dom';

export interface PostCreatorProps {
	post?: Post;
}

const PostCreator: React.SFC<PostCreatorProps> = () => {
	const history = useHistory();

	return (
		<Row style={{ textAlign: 'center' }}>
			<Button variant="outline-secondary" block onClick={() => history.push('/new')}>
				Opret nyt opslag
			</Button>
		</Row>
	);
};

export default PostCreator;
