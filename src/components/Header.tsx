import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';

const StyledHeader = styled.header`
	display: flex;
	margin: 0;
	background-color: darkolivegreen;
	color: white;
	justify-content: space-between;
`;

const HeaderItem = styled.div`
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

	return (
		<StyledHeader>
			{admin && <HeaderItem>Tilføj brugere</HeaderItem>}
			<h1 style={{ margin: '0 auto', fontSize: '1.5rem', padding: '5px' }}>Medicinerrådets FAQ</h1>
			{admin && <HeaderItem>Log ud</HeaderItem>}
		</StyledHeader>
	);
};

export default Header;
