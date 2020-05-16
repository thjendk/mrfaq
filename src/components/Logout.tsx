import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Admin from 'classes/Admin.class';

export interface LogoutProps {}

const Logout: React.SFC<LogoutProps> = () => {
	const history = useHistory();

	useEffect(() => {
		const logout = async () => {
			await Admin.logout();
			history.push('/');
		};

		logout();
	}, [history]);

	return null;
};

export default Logout;
