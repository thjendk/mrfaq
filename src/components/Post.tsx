import React, { useContext } from 'react';
import { Post } from 'types/generated';
import marked from 'marked';
import { Accordion, Card } from 'react-bootstrap';
import Comments from './Comments';
import styled from 'styled-components';
import { SearchContext, Divider } from './Posts';
import Highlighter from 'react-highlighter';

export interface PostProps {
	post: Post;
}

const PostTitle = styled.h2`
	margin: 0 auto;
	cursor: pointer;
	font-size: 1.2rem;
`;

const Tag = styled.div`
	border: 1px solid black;
	border-radius: 8px;
	background-color: ${(props) => props.color};
	color: white;
	padding: 1px 5px;
	margin-right: 5px;
`;

const PostComponent: React.SFC<PostProps> = ({ post }) => {
	const search = useContext(SearchContext);

	return (
		<Card>
			<Card.Header>
				<Accordion.Toggle as={PostTitle} eventKey={post.id.toString()}>
					<Highlighter search={search}> {post.title}</Highlighter>
				</Accordion.Toggle>
				{post.tags.length > 0 && <Divider />}
				<div style={{ display: 'flex' }}>
					{post.tags.map((t) => (
						<Tag color={t.color}>{t.name}</Tag>
					))}
				</div>
			</Card.Header>
			<Accordion.Collapse eventKey={post.id.toString()}>
				<Card.Body>
					<div
						dangerouslySetInnerHTML={{ __html: marked(post.text, { sanitize: true, smartypants: true }) }}
					/>
					<Comments />
					{/* Admin Buttons */}
				</Card.Body>
			</Accordion.Collapse>
		</Card>
	);
};

export default PostComponent;
