import React from 'react';
import { MenuBar, MenuItem } from 'components/Header';
import { useHistory } from 'react-router-dom';
import { BsHeartFill } from 'react-icons/bs';

export interface FooterProps {}

const Footer: React.SFC<FooterProps> = () => {
	const history = useHistory();

	return (
		<MenuBar style={{ justifyContent: 'space-around' }}>
			<div style={{ width: '100%' }}>
				<MenuItem style={{ justifyContent: 'center' }} onClick={() => history.push('/kontakt')}>
					Har du spørgsmål du ikke finder svar på herinde, eller ønsker du at kontakte medicinerrådet anonymt?
					Tryk her
				</MenuItem>
			</div>
			<div style={{ flexGrow: 1 }} />
			<MenuItem style={{ whiteSpace: 'nowrap' }}>
				<BsHeartFill style={{ marginRight: '5px', fontSize: '0.9em' }} />
				Lavet af Thomas Jensen
			</MenuItem>
		</MenuBar>
	);
};

export default Footer;
