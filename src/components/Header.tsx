import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
	width: 100%;
	margin: 0;
	background-color: darkolivegreen;
	color: white;
	justify-content: space-between;
	display: flex;
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
	return (
		<StyledHeader>
			<HeaderItem>Tilføj brugere</HeaderItem>
			<h1 style={{ margin: 0, fontSize: '1.5rem', padding: '5px' }}>Medicinerrådets FAQ</h1>
			<HeaderItem>Log ud</HeaderItem>
		</StyledHeader>
	);
};

export default Header;
