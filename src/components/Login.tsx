import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Divider } from './Posts';
import { useHistory } from 'react-router-dom';
import Admin from 'classes/Admin.class';

export interface LoginProps {}

const Login: React.SFC<LoginProps> = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();

	useEffect(() => {
		if (error) {
			setError(false);
		}
		// eslint-disable-next-line
	}, [username, password]);

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			await Admin.login({ username, password });
			history.push('/');
		} catch (error) {
			setError(true);
			setIsLoading(false);
		}
	};

	return (
		<Card>
			<Card.Header>Login</Card.Header>
			<Card.Body>
				<Form onSubmit={() => handleSubmit()}>
					<Form.Group>
						<Form.Label>Brugernavn</Form.Label>
						<Form.Control
							onChange={(e) => setUsername(e.target.value)}
							value={username}
							placeholder="Skriv dit brugernavn"
							type="text"
							name="username"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Kodeord</Form.Label>
						<Form.Control
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							placeholder="Skriv dit kodeord"
							type="password"
							name="password"
						/>
					</Form.Group>
					<Button onClick={handleSubmit} disabled={isLoading} variant="secondary">
						{isLoading ? <Spinner size="sm" animation="border" /> : 'Log ind'}
					</Button>
					{error && (
						<>
							<Divider />
							<Alert variant="danger">Brugernavn eller adgangskode er forkert</Alert>
						</>
					)}
				</Form>
			</Card.Body>
		</Card>
	);
};

export default Login;
