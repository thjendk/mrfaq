import React from 'react';
import TagType from 'classes/Tag.class';
import { BsX } from 'react-icons/bs';
import Post from 'classes/Post.class';
import { ReduxState } from 'redux/reducers';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

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

interface TagLabelProps {
	tag: TagType;
	post: Post;
}

export const TagLabel = ({ tag: t, post }: TagLabelProps) => {
	const admin = useSelector((state: ReduxState) => state.combined.admin);

	const handleRemoveTag = async (tagId: number) => {
		await Post.removeTag({ tagId, postId: post.id });
	};

	return (
		<Tag color={t.color}>
			{t.name} {admin && <BsX style={{ cursor: 'pointer' }} onClick={() => handleRemoveTag(t.id)} />}
		</Tag>
	);
};
