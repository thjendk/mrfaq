import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import Admin from 'classes/Admin.class';
import { Table } from 'react-bootstrap';
import AdminInput from './AdminInput';
import AdminRow from './AdminRow';

export interface AdminsProps {}

const Admins: React.SFC<AdminsProps> = () => {
	const admin = useSelector((state: ReduxState) => state.combined.admin);
	const admins = useSelector((state: ReduxState) => state.combined.admins);

	useEffect(() => {
		if (!admin) return;
		Admin.findAll();
	}, [admin]);

	if (!admin) return <p>Du har ikke tilladelse til at tilgå denne side.</p>;
	return (
		<div>
			<h1>Brugere</h1>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Brugernavn</th>
						<th>Navn</th>
						<th>Kodeord</th>
						<th>Valg</th>
					</tr>
				</thead>
				<tbody>
					{admins.map((a) => (
						<AdminRow admin={a} />
					))}
					<AdminInput />
				</tbody>
			</Table>
		</div>
	);
};

export default Admins;
