import React, { useState } from 'react';
import styled from 'styled-components';
import { Collapse, Card } from 'reactstrap';

const StyledParent = styled.div`
	cursor: pointer;

	:hover {
		background-color: #e0e0e0;
	}
`;

const StyledTitle = styled.h3`
	margin: 0;
	padding: 10px;
`;

export const Divider = styled.div<{ hide?: boolean }>`
	border-top: ${(props) => !props.hide && '1px solid lightgrey'};
	margin: 10px auto;
	width: 100%;
`;

const StyledChildren = styled.div`
	margin: 1rem;
`;

export interface CollapsibleProps {
	title: string;
	isOpen?: boolean;
}

const Collapsible: React.SFC<CollapsibleProps> = ({ children, title, isOpen }) => {
	const [open, setOpen] = useState(isOpen);

	return (
		<Card style={{ border: '1px solid black' }}>
			<StyledParent onClick={() => setOpen(!open)}>
				<StyledTitle>{title}</StyledTitle>
				{/* tags.map... */}
			</StyledParent>
			<Collapse isOpen={open}>
				<StyledChildren>{children}</StyledChildren>
			</Collapse>
		</Card>
	);
};

export default Collapsible;
