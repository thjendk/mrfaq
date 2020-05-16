import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Admin from 'classes/Admin.class';

export interface AdminInputProps {
	admin?: Admin;
	onCancel?: (value: boolean) => void;
}

const AdminInput: React.SFC<AdminInputProps> = ({ admin, onCancel }) => {
	const [username, setUsername] = useState(admin?.username || '');
	const [fullName, setFullName] = useState(admin?.fullName || '');
	const [password, setPassword] = useState('');

	const handleSubmit = async () => {
		try {
			if (!!admin) {
				console.log('doing it');
				await Admin.edit(admin.id, { username, fullName, password });
				onCancel(false);
			} else {
				await Admin.create({
					username,
					fullName,
					password
				});
			}
			setUsername('');
			setFullName('');
			setPassword('');
		} catch (error) {}
	};

	return (
		<tr>
			<td>#</td>
			<td>
				<Form.Control
					placeholder="Brugernavn"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</td>
			<td>
				<Form.Control
					placeholder="Navn"
					type="text"
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
				/>
			</td>
			<td>
				<Form.Control
					placeholder="Kodeord"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</td>
			<td>
				{!!admin && (
					<Button variant="secondary" onClick={() => onCancel(false)}>
						Annuller
					</Button>
				)}
				<Button onClick={handleSubmit}>{!!admin ? 'Rediger' : 'Opret'}</Button>
			</td>
		</tr>
	);
};

export default AdminInput;
