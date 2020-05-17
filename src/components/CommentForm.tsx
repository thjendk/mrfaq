import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export interface CommentFormProps {
	onSubmit: (text: string) => Promise<void>;
}

const CommentForm: React.SFC<CommentFormProps> = ({ onSubmit }) => {
	const [text, setText] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		setLoading(true);
		await onSubmit(text);
		setText('');
		setLoading(false);
	};

	return (
		<Form>
			<Form.Group>
				<Form.Label>Kommentar</Form.Label>
				<Form.Control
					as="textarea"
					value={text}
					onChange={(e) => setText(e.target.value)}
					rows={3}
					placeholder="Skriv din kommentar"
				/>
			</Form.Group>
			<Form.Group>
				<Button disabled={loading} onClick={handleSubmit} variant="secondary">
					Tilføj kommentar
				</Button>
			</Form.Group>
		</Form>
	);
};

export default CommentForm;
