import React, { useContext } from 'react';
import { Post as PostType } from 'types/generated';
import styled from 'styled-components';
import { SearchContext, Divider } from './Posts';
import Highlighter from 'react-highlighter';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import TagDropdown from './TagDropdown';
import { useHistory } from 'react-router-dom';
import { TagLabel } from './TagLabel';

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

export const Row = styled.div`
	border-bottom: 1px solid lightgrey;
	padding: 15px;
`;

const PostComponent: React.SFC<PostProps> = ({ post }) => {
	const history = useHistory();
	const search = useContext(SearchContext);
	const admin = useSelector((state: ReduxState) => state.combined.admin);

	return (
		<Row>
			<div onClick={() => history.push(`/opslag/${post.id}`)}>
				<PostTitle>
					<Highlighter search={search}>{post.title}</Highlighter>
				</PostTitle>
			</div>
			{(post.tags.length > 0 || admin) && <Divider />}
			<div style={{ display: 'flex' }}>
				{post.tags.length > 0 && post.tags.map((t) => <TagLabel tag={t} post={post} />)}
				{admin && <TagDropdown postId={post.id} />}
			</div>
		</Row>
	);
};

export default PostComponent;
