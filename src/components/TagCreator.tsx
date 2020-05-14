import React, { useState } from 'react';
import { Button, OverlayTrigger, Popover, Form, Spinner, Alert } from 'react-bootstrap';
import { SliderPicker } from 'react-color';
import Tag from 'classes/Tag.class';

export interface TagCreatorProps {}

const TagCreator: React.SFC<TagCreatorProps> = () => {
	const [color, setColor] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			if (!color) return setError('Du mangler at angive en farve');
			if (!name) return setError('Du mangler at angive et navn');
			if (!description) return setError('Du mangler at angive en beskrivelse');

			await Tag.create({ name, description, color });
			setColor('');
			setName('');
			setDescription('');
		} catch (error) {
			setError('Der gik noget galt. Prøv igen.');
		}

		setIsLoading(false);
	};

	return (
		<OverlayTrigger
			trigger="click"
			placement="bottom"
			overlay={
				<Popover id="addtag-popover">
					<Popover.Title>Tilføj tag</Popover.Title>
					<Popover.Content>
						<Form>
							<Form.Group>
								<Form.Label>Navn</Form.Label>
								<Form.Control
									required
									placeholder="Navn"
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Beskrivelse</Form.Label>
								<Form.Control
									placeholder="Beskrivelse"
									type="text"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Farve</Form.Label>
								<SliderPicker color={color} onChangeComplete={(c) => setColor(c.hex)} />
							</Form.Group>
							<Form.Group>
								<Button disabled={isLoading} variant="secondary" block onClick={handleSubmit}>
									{isLoading ? <Spinner animation="grow" size="sm" /> : 'Tilføj'}
								</Button>
							</Form.Group>
						</Form>
					</Popover.Content>
				</Popover>
			}
		>
			<div>
				<Button block variant="outline-secondary">
					Nyt Tag
				</Button>
				{error && <Alert variant="danger">{error}</Alert>}
			</div>
		</OverlayTrigger>
	);
};

export default TagCreator;
