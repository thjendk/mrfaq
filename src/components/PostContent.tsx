import React, { useState } from 'react';
import Post from 'classes/Post.class';
import PostEditor from './PostEditor';
import Comments from './Comments';
import marked from 'marked';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import ConfirmButton from './ConfirmButton';

export interface PostContentProps {
	post: Post;
}

const PostContent: React.SFC<PostContentProps> = ({ post }) => {
	const [isEditing, setIsEditing] = useState(false);
	const admin = useSelector((state: ReduxState) => state.combined.admin);
	const history = useHistory();
	const location = useLocation();

	const handleDeletePost = async () => {
		await Post.remove(post.id);
		history.push('/');
	};

	return (
		<div style={{ padding: '15px' }}>
			{isEditing && <PostEditor post={post} onCancel={() => setIsEditing(false)} />}
			{!isEditing && (
				<div>
					<div dangerouslySetInnerHTML={{ __html: marked(post.text, { smartypants: true }) }} />
					{!location.pathname.includes(post.id.toString()) && (
						<Button variant="outline-secondary" onClick={() => history.push(`/opslag/${post.id}`)}>
							Åben
						</Button>
					)}
					<hr />
					<Comments post={post} />
					{admin && (
						<div>
							<hr />
							<Button variant="outline-secondary" onClick={() => setIsEditing(true)}>
								Rediger
							</Button>
							<ConfirmButton onDelete={handleDeletePost} />
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default PostContent;
