import React from 'react';
import { Post } from 'types/generated';
import marked from 'marked';
import Collapsible from './Collapsible';

export interface PostProps {
	post: Post;
	isOpen?: boolean;
}

const PostComponent: React.SFC<PostProps> = ({ post, isOpen }) => {
	return (
		<Collapsible title={post.title} isOpen>
			<div dangerouslySetInnerHTML={{ __html: marked(post.text, { sanitize: true, smartypants: true }) }} />
			{/* Admin Buttons */}
		</Collapsible>
	);
};

export default PostComponent;
