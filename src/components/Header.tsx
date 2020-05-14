import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
	width: 100%;
	margin: 0;
	padding: 5px;
	text-align: center;
	background-color: darkolivegreen;
	color: white;
`;

export interface HeaderProps {}

const Header: React.SFC<HeaderProps> = () => {
	return (
		<StyledHeader>
			<h1 style={{ margin: 0, fontSize: '1.5rem' }}>Medicinerrådets FAQ</h1>
		</StyledHeader>
	);
};

export default Header;
