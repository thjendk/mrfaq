import * as React from 'react';
import Popup from 'reactjs-popup';
import { Button, Spinner } from 'react-bootstrap';

export interface ConfirmButtonProps {
	onDelete: Function;
	loading?: boolean;
}

const ConfirmButton: React.SFC<ConfirmButtonProps> = ({ onDelete, children = 'Slet', loading }) => {
	return (
		<Popup
			position="top center"
			trigger={() =>
				loading ? <Spinner size="sm" animation="grow" /> : <Button variant="danger">{children}</Button>
			}
		>
			<div style={{ textAlign: 'center' }}>
				<p>Er du sikker?</p>
				<Button variant="danger" block onClick={() => onDelete()}>
					Ja
				</Button>
			</div>
		</Popup>
	);
};

export default ConfirmButton;
