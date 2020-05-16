import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { useHistory } from 'react-router-dom';
import { BsHouseDoor } from 'react-icons/bs';

export const MenuBar = styled.header`
	display: flex;
	margin: 0;
	background-color: darkolivegreen;
	color: white;
	justify-content: space-between;
`;

export const MenuItem = styled.div`
	display: flex;
	align-items: center;
	margin: 0;
	padding: 5px 10px;
	cursor: pointer;

	:hover {
		background-color: #4a5e2a;
	}
`;

export interface HeaderProps {}

const Header: React.SFC<HeaderProps> = () => {
	const admin = useSelector((state: ReduxState) => state.combined.admin);
	const history = useHistory();

	return (
		<MenuBar>
			<MenuItem onClick={() => history.push('/')}>
				<BsHouseDoor />{' '}
			</MenuItem>
			{admin && <MenuItem onClick={() => history.push('/admin')}>Admin</MenuItem>}
			<h1 style={{ margin: '0 auto', fontSize: '1.5rem', padding: '5px' }}>Medicinerrådet, Aarhus Universitet</h1>
			{admin && <MenuItem onClick={() => history.push('/logout')}>Log ud</MenuItem>}
		</MenuBar>
	);
};

export default Header;
