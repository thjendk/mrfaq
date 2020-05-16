import React from 'react';
import { MenuBar, MenuItem } from 'components/Header';
import { useHistory } from 'react-router-dom';

export interface FooterProps {}

const Footer: React.SFC<FooterProps> = () => {
	const history = useHistory();

	return (
		<MenuBar style={{ justifyContent: 'center' }}>
			<MenuItem onClick={() => history.push('/kontakt')}>
				Har du spørgsmål du ikke finder svar på herinde, eller ønsker du at kontakte medicinerrådet anonymt?
				Tryk her
			</MenuItem>
		</MenuBar>
	);
};

export default Footer;
