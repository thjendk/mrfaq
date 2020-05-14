import React, { useState } from 'react';
import PostComponent from './Post';
import { Card, Accordion, InputGroup, Button, Form } from 'react-bootstrap';
import { Divider } from './Posts';

export interface PostCreatorProps {}

const PostCreator: React.SFC<PostCreatorProps> = () => {
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');

	return (
		<Card>
			<Card.Header style={{ textAlign: 'center' }}>
				<Accordion.Toggle as={Button} variant="outline-secondary" style={{ width: '100%' }} eventKey="new">
					Opret nyt spørgsmål
				</Accordion.Toggle>
			</Card.Header>
			<Accordion.Collapse eventKey="new">
				<Card.Body>
					<Form>
						<Form.Control
							type="text"
							onChange={(e) => setTitle(e.target.value)}
							value={title}
							placeholder="Titel"
						/>
						<Divider />
						<Form.Control
							as="textarea"
							rows={3}
							onChange={(e) => setText(e.target.value)}
							value={text}
							placeholder="Tekst"
						/>
						<Divider />
						<Button variant="secondary">Opret</Button>
					</Form>
					<Divider />
					{title && (
						<>
							<h5>Preview</h5>
							<PostComponent post={{ text, title }} />
						</>
					)}
				</Card.Body>
			</Accordion.Collapse>
		</Card>
	);
};

export default PostCreator;
