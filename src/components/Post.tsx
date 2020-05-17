import React, { useContext, useState, useRef, useEffect } from 'react';
import { Post as PostType } from 'types/generated';
import styled from 'styled-components';
import { SearchContext, Divider } from './Posts';
import Highlighter from 'react-highlighter';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import TagDropdown from './TagDropdown';
import { BsX, BsChevronDoubleDown, BsChevronDoubleUp } from 'react-icons/bs';
import Post from 'classes/Post.class';
import PostContent from './PostContent';

export interface PostProps {
	post: PostType;
}

const PostTitle = styled.h2`
	cursor: pointer;
	font-size: 1.2em;
	width: 100%;
	margin: 0 auto;

	:hover {
		font-weight: bold;
	}

	@media only screen and (max-width: 500px) {
		font-size: 1em;
	}
`;

export const Tag = styled.div`
	display: flex;
	align-items: center;
	border: 1px solid black;
	border-radius: 8px;
	background-color: ${(props) => props.color};
	color: white;
	padding: 2px 8px;
	margin-right: 5px;
	font-size: 0.9em;
	cursor: ${(props) => (props.onClick ? 'pointer' : null)};
`;

export const Row = styled.div``;

export const RowExpand = styled.div`
	padding: 0;
	background-color: white;
	overflow: hidden;
	transition: max-height 0.3s ease-out;
`;

export const RowHeader = styled.div`
	border-bottom: 1px solid lightgrey;
	padding: 15px;
`;

const PostComponent: React.SFC<PostProps> = ({ post }) => {
	const ref = useRef(null);
	const search = useContext(SearchContext);
	const admin = useSelector((state: ReduxState) => state.combined.admin);
	const [isOpen, setIsOpen] = useState(false);
	const [scrollHeight, setScrollHeight] = useState(null);

	const handleRemoveTag = async (tagId: number) => {
		await Post.removeTag({ tagId, postId: post.id });
	};

	useEffect(() => {
		setScrollHeight(ref.current?.scrollHeight);
	}, [post, admin]);

	return (
		<Row>
			<RowHeader>
				<div style={{ display: 'flex', justifyContent: 'space-between' }} onClick={() => setIsOpen(!isOpen)}>
					<PostTitle>
						<Highlighter search={search}>{post.title}</Highlighter>
					</PostTitle>
					{isOpen && <BsChevronDoubleUp style={{ fontSize: '1.2em' }} />}
					{!isOpen && <BsChevronDoubleDown style={{ color: 'green', fontSize: '1.2em' }} />}
				</div>
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
			</RowHeader>
			<RowExpand
				ref={ref}
				style={isOpen ? { maxHeight: scrollHeight, borderBottom: '1px solid lightgrey' } : { maxHeight: 0 }}
			>
				<PostContent post={post} />
			</RowExpand>
		</Row>
	);
};

export default PostComponent;
