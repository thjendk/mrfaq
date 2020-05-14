import React, { useEffect } from 'react';
import { Tag } from './Post';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import styled from 'styled-components';
import TagClass from 'classes/Tag.class';
import TagCreator from './TagCreator';
import Post from 'classes/Post.class';

export const TagRow = styled.div`
	padding: 10px;
	border: 1px solid black;
	margin: 0;
	background-color: ${(props) => props.color};
	color: white;
	cursor: pointer;

	:hover {
		border: 3px solid black;
	}
`;

export interface TagDropdownProps {
	postId: number;
}

const TagDropdown: React.SFC<TagDropdownProps> = ({ postId }) => {
	const admin = useSelector((state: ReduxState) => state.combined.admin);
	const post = useSelector((state: ReduxState) => state.combined.posts.find((p) => p.id === postId));
	const tags = useSelector((state: ReduxState) =>
		state.combined.tags.filter((t) => !post.tags.map((t) => t.id).includes(t.id))
	);

	useEffect(() => {
		if (tags.length === 0) {
			TagClass.fetchAll();
		}
	}, [tags.length]);

	const handleAddTagToPost = async (tagId: number) => {
		await Post.addTag({ postId, tagId });
	};

	return (
		<OverlayTrigger
			trigger="click"
			placement="bottom"
			overlay={
				<Popover style={{ width: '300px' }} id="tags-popover">
					<Popover.Content style={{ padding: 0 }}>
						{tags.map((t) => (
							<TagRow onClick={() => handleAddTagToPost(t.id)} color={t.color}>
								<Tag style={{ width: 'fit-content' }}>{t.name}</Tag>
								<p style={{ fontSize: '0.8em', margin: 0 }}>{t.description}</p>
							</TagRow>
						))}
						{admin && <TagCreator />}
					</Popover.Content>
				</Popover>
			}
		>
			<Tag clickable color="#6c757d">
				+ Tilføj
			</Tag>
		</OverlayTrigger>
	);
};

export default TagDropdown;
