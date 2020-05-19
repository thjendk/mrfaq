import React from 'react';
import styled from 'styled-components';
import marked from 'marked';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { Button } from 'react-bootstrap';
import Admin from 'classes/Admin.class';

const CommentStyle = styled.div`
	border: 1px solid lightgrey;
	border-radius: 5px;
	padding: 15px 15px 0 15px;
	margin: 1rem auto;
`;

export interface CommentComponentProps {
	commentAdmin: Admin;
	onDelete: Function;
	text: string;
	createdAt: string;
}

const CommentComponent: React.FC<CommentComponentProps> = ({ commentAdmin, onDelete, text, createdAt }) => {
	const admin = useSelector((state: ReduxState) => state.combined.admin);

	return (
		<CommentStyle>
			<p style={{ color: 'grey', fontSize: '0.8em', margin: 0 }}>
				{new Date(createdAt).toLocaleString()}{' '}
				{commentAdmin && (
					<span style={{ fontWeight: 'bold', color: 'darkolivegreen' }}>
						- {commentAdmin.fullName} (Medicinerrådet)
					</span>
				)}
			</p>
			<hr style={{ margin: '2px' }} />
			<div dangerouslySetInnerHTML={{ __html: marked(text, { smartypants: true }) }} />
			{admin && (
				<div style={{ margin: '1rem auto' }}>
					<Button variant="outline-danger" onClick={() => onDelete()}>
						Slet
					</Button>
				</div>
			)}
		</CommentStyle>
	);
};

export default CommentComponent;
