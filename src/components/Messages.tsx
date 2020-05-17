import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Message from 'classes/Message.class';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import ConfirmButton from './ConfirmButton';
import { useHistory } from 'react-router-dom';
import AnsweredTag from './AnsweredTag';

export interface MessagesProps {}

const Messages: React.SFC<MessagesProps> = () => {
	const messages = useSelector((state: ReduxState) => state.combined.messages);
	const history = useHistory();

	useEffect(() => {
		Message.findAll();
	}, []);

	const handleDelete = async (id: number) => {
		await Message.delete(id);
	};

	return (
		<div>
			<h2>Beskeder</h2>
			<Table bordered striped hover>
				<thead>
					<th>Dato</th>
					<th>Besked</th>
					<th>Email</th>
					<th>Besvaret</th>
					<th>Valg</th>
				</thead>
				<tbody>
					{messages.map((m) => (
						<tr>
							<td>{new Date(m.createdAt).toLocaleString()}</td>
							<td>{m.text}</td>
							<td>{m.email}</td>
							<td>
								<AnsweredTag answered={m.answered} />
							</td>
							<td>
								<Button
									style={{ marginRight: '5px' }}
									variant="outline-secondary"
									onClick={() => history.push(`/besked/${m.id}`)}
								>
									Åben
								</Button>
								<ConfirmButton onDelete={() => handleDelete(m.id)} />
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default Messages;
