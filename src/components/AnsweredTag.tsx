import React from 'react';
import styled from 'styled-components';

export interface AnsweredTagProps {
	answered: boolean;
}

const AnsweredTagStyle = styled.div<{ answered?: boolean }>`
	border: 1px solid black;
	background-color: ${(props) => (props.answered ? 'darkgreen' : 'darkred')};
	border-radius: 5px;
	padding: 2px 8px;
	color: white;
	width: fit-content;
`;

const AnsweredTag: React.SFC<AnsweredTagProps> = ({ answered }) => {
	return <AnsweredTagStyle answered={answered}>{answered ? 'Besvaret' : 'Ikke besvaret'}</AnsweredTagStyle>;
};

export default AnsweredTag;
