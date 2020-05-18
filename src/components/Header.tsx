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

	@media screen and (max-width: 600px) {
		flex-wrap: wrap;
	}
`;

export const MenuItem = styled.div`
	display: flex;
	align-items: center;
	margin: 0;
	padding: 5px 10px;
	cursor: ${(props) => (props.onClick ? 'pointer' : null)};

	:hover {
		background-color: ${(props) => (props.onClick ? '#4a5e2a' : null)};
	}

	@media screen and (max-width: 600px) {
		text-align: center;
		font-size: 0.9em;
	}
`;

const PageTitle = styled.h1`
	margin: 0 auto;
	font-size: 1.5em;
	padding: 5px;
	text-align: center;

	@media screen and (max-width: 600px) {
		font-size: 1em;
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
			<PageTitle>Medicinerrådet, Aarhus Universitet</PageTitle>
			{admin && <MenuItem onClick={() => history.push('/logout')}>Log ud</MenuItem>}
		</MenuBar>
	);
};

export default Header;
