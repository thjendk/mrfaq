import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import PostComponent from './Post';
import PostCreator from './postCreator';

export interface PostsProps {}

const Posts: React.SFC<PostsProps> = () => {
	const posts = useSelector((state: ReduxState) => state.combined.posts);
	const admin = useSelector((state: ReduxState) => state.combined.admin);

	return (
		<div>
			{posts.map((p) => (
				<PostComponent post={p} />
			))}
			{<PostCreator />}
		</div>
	);
};

export default Posts;
