import React, { useState } from 'react';
import Admin from 'classes/Admin.class';
import AdminInput from './AdminInput';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import ConfirmButton from './ConfirmButton';

export interface AdminRowProps {
	admin: Admin;
}

const AdminRow: React.SFC<AdminRowProps> = ({ admin }) => {
	const me = useSelector((state: ReduxState) => state.combined.admin);
	const [isEditing, setIsEditing] = useState(false);

	const handleDelete = async () => {
		await Admin.delete(admin.id);
	};

	if (isEditing) return <AdminInput onCancel={setIsEditing} admin={admin} />;
	return (
		<tr>
			<td>{admin.id}</td>
			<td>
				{admin.username}{' '}
				{admin.id === me.id && (
					<>
						<br />
						<span style={{ color: 'darkolivegreen' }}>(mig)</span>
					</>
				)}
			</td>
			<td>{admin.fullName}</td>
			<td>**********</td>
			<td>
				<Button variant="outline-warning" onClick={() => setIsEditing(true)}>
					Rediger
				</Button>
				{me.id !== admin.id && <ConfirmButton onDelete={handleDelete} />}
			</td>
		</tr>
	);
};

export default AdminRow;
