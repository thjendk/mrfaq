import React, { useEffect } from 'react';
import Post from 'classes/Post.class';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import PostContent from './PostContent';
import { Button } from 'react-bootstrap';
import { Divider } from './Posts';

export interface SpecificPostProps {}

const SpecificPost: React.SFC<SpecificPostProps> = () => {
	const params = useParams<{ postId: string }>();
	const postId = Number(params.postId);
	const post = useSelector((state: ReduxState) => state.combined.posts.find((p) => p.id === postId));

	useEffect(() => {
		Post.findById(postId);
	}, [postId]);

	if (!post) return <p>Loading...</p>;
	return (
		<div style={{ margin: '5px' }}>
			<h1>{post.title}</h1>
			<Divider />
			<div style={{ border: '1px solid lightgrey' }}>
				<PostContent post={post} />
			</div>
		</div>
	);
};

export default SpecificPost;
