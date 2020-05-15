import React, { useContext, useState } from 'react';
import { Post as PostType } from 'types/generated';
import marked from 'marked';
import { Accordion, Card, Button } from 'react-bootstrap';
import Comments from './Comments';
import styled from 'styled-components';
import { SearchContext, Divider } from './Posts';
import Highlighter from 'react-highlighter';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import PostEditor from './PostEditor';
import TagDropdown from './TagDropdown';
import { BsX, BsChevronDoubleDown, BsChevronDoubleUp } from 'react-icons/bs';
import Post from 'classes/Post.class';

export interface PostProps {
	post: PostType;
}

const PostTitle = styled.h2`
	margin: 0 auto;
	cursor: pointer;
	font-size: 1.2rem;

	:hover {
		font-weight: bold;
	}
`;

export const Tag = styled.div<{ clickable?: boolean }>`
	display: flex;
	align-items: center;
	border: 1px solid black;
	border-radius: 8px;
	background-color: ${(props) => props.color};
	color: white;
	padding: 2px 8px;
	margin-right: 5px;
	font-size: 0.9em;
	cursor: ${(props) => (props.clickable ? 'pointer' : null)};
`;

const PostComponent: React.SFC<PostProps> = ({ post }) => {
	const [isEditing, setIsEditing] = useState(false);
	const search = useContext(SearchContext);
	const admin = useSelector((state: ReduxState) => state.combined.admin);
	const [isOpen, setIsOpen] = useState(false);

	const handleRemoveTag = async (tagId: number) => {
		await Post.removeTag({ tagId, postId: post.id });
	};

	const handleDeletePost = async () => {};

	return (
		<Card>
			<Card.Header>
				<Accordion.Toggle
					key={post.id.toString()}
					as={PostTitle}
					onClick={() => setIsOpen(!isOpen)}
					eventKey={post.id.toString()}
				>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Highlighter search={search}>{post.title}</Highlighter>
						{isOpen && <BsChevronDoubleUp style={{ fontSize: '1.2em' }} />}
						{!isOpen && <BsChevronDoubleDown style={{ color: 'green', fontSize: '1.2em' }} />}
					</div>
				</Accordion.Toggle>
				{(post.tags.length > 0 || admin) && <Divider />}
				<div style={{ display: 'flex' }}>
					{post.tags.length > 0 &&
						post.tags.map((t) => (
							<Tag color={t.color}>
								{t.name}{' '}
								{admin && <BsX style={{ cursor: 'pointer' }} onClick={() => handleRemoveTag(t.id)} />}
							</Tag>
						))}
					{admin && <TagDropdown postId={post.id} />}
				</div>
			</Card.Header>
			<Accordion.Collapse eventKey={post.id.toString()}>
				<Card.Body>
					{isEditing && <PostEditor post={post} onCancel={() => setIsEditing(false)} />}
					{!isEditing && (
						<div>
							<div dangerouslySetInnerHTML={{ __html: marked(post.text, { smartypants: true }) }} />
							<Comments />
							{admin && (
								<div>
									<Button variant="outline-secondary" onClick={() => setIsEditing(true)}>
										Rediger
									</Button>
									<Button
										style={{ marginLeft: '5px' }}
										variant="outline-danger"
										onClick={handleDeletePost}
									>
										Slet
									</Button>
								</div>
							)}
						</div>
					)}
				</Card.Body>
			</Accordion.Collapse>
		</Card>
	);
};

export default PostComponent;
