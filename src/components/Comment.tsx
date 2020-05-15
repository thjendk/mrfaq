import React from 'react';
import styled from 'styled-components';
import { Comment as CommentType } from 'types/generated';
import marked from 'marked';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { Button } from 'react-bootstrap';
import Comment from 'classes/Comment.class';

const CommentStyle = styled.div`
	border: 1px solid lightgrey;
	border-radius: 5px;
	padding: 15px 15px 0 15px;
	margin: 1rem auto;
`;

export interface CommentComponentProps {
	comment: CommentType;
}

const CommentComponent: React.FC<CommentComponentProps> = ({ comment }) => {
	const admin = useSelector((state: ReduxState) => state.combined.admin);

	const handleRemove = async () => {
		await Comment.remove(comment.id);
	};

	return (
		<CommentStyle>
			<p style={{ color: 'grey', fontSize: '0.8em', margin: 0 }}>
				{new Date(comment.createdAt).toLocaleString()} -{' '}
				{comment.admin && <span>{comment.admin.fullName}</span>}
			</p>
			<hr style={{ margin: '2px' }} />
			<div dangerouslySetInnerHTML={{ __html: marked(comment.text, { smartypants: true }) }} />
			{admin && (
				<div style={{ margin: '1rem auto' }}>
					<Button variant="outline-danger" onClick={handleRemove}>
						Slet
					</Button>
				</div>
			)}
		</CommentStyle>
	);
};

export default CommentComponent;
