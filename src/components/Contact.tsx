import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { BsCheck } from 'react-icons/bs';
import Message from 'classes/Message.class';
import { useHistory } from 'react-router-dom';

export interface ContactProps {}

const Contact: React.SFC<ContactProps> = () => {
	const history = useHistory();
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [didSupplyEmail, setDidSupplyEmail] = useState(false);
	const [text, setText] = useState('');
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [message, setMessage] = useState<Message>(null);

	const handleSubmit = async () => {
		try {
			if (!text) return setError('Du skal angive en besked');
			setLoading(true);
			const message = await Message.create({ text, email });
			setIsSubmitted(true);
			setDidSupplyEmail(!!email);
			setText('');
			setEmail('');
			setMessage(message);
		} catch (error) {
			setError(error.message);
		}
		setLoading(false);
	};

	useEffect(() => {
		setError('');
	}, [text]);

	return (
		<div>
			<h1>Kontakt</h1>
			<hr />
			<Form>
				<Form.Group>
					<Form.Label>Besked</Form.Label>
					<Form.Control
						as="textarea"
						placeholder="Skriv din besked"
						rows={5}
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Email</Form.Label>
					<Form.Control
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="text"
						placeholder="Angiv din email (frivilligt)"
					/>
					<div style={{ textAlign: 'center' }}>
						<p style={{ color: 'grey', fontSize: '0.8em' }}>
							Det er frivilligt om du skriver din email, hvis du vil forblive 100% anonym. Vi vil aldrig
							dele din information eller besked med andre, uanset om du angiver din email.
							<br />
							Du kan følge din besked her på siden i det link som oprettes, når du sender beskeden. Vi vil
							uden din mail ikke kunne minde dig om, når vi har svaret dig.
						</p>
					</div>
				</Form.Group>
				<Form.Group>
					<Button
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							handleSubmit();
						}}
						disabled={isSubmitted || loading}
						block
						variant="outline-secondary"
					>
						{isSubmitted ? <BsCheck /> : loading ? <Spinner animation="grow" size="sm" /> : 'Send'}
					</Button>
				</Form.Group>
				{isSubmitted && (
					<Alert variant="success">
						Vi har modtaget din besked, og vil kigge på den hurtigst muligt.{' '}
						{didSupplyEmail &&
							'Da du har angivet din email, vil vi holde dig opdateret og evt. kontakte dig for yderligere information. '}
						<span
							style={{ textDecoration: 'underline', cursor: 'pointer' }}
							onClick={() => history.push(`/besked/${message.id}`)}
						>
							Du kan tilgå din besked her, og se når medicinerrådet har svaret dig. Gem gerne linket til
							senere.
						</span>
					</Alert>
				)}
				{error && <Alert>{error}</Alert>}
			</Form>
			<div style={{ textAlign: 'center' }}>
				<p style={{ color: 'darkolivegreen', fontSize: '0.9em' }}>
					Du kan også henvende dig på{' '}
					<a href="https://www.facebook.com/MedicinerraadAU" target="_blank" rel="noopener noreferrer">
						Facebook
					</a>
				</p>
			</div>
		</div>
	);
};

export default Contact;
