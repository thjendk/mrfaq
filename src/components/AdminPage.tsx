import React from 'react';
import Admins from './Admins';
import Messages from './Messages';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';

export interface AdminPageProps {}

const AdminPage: React.SFC<AdminPageProps> = () => {
	const admin = useSelector((state: ReduxState) => state.combined.admin);

	if (!admin) return <p>Du har ikke tilladelse til at tilgå denne side.</p>;
	return (
		<div>
			<h1>Admin</h1>
			<hr />
			<Admins />
			<Messages />
		</div>
	);
};

export default AdminPage;
