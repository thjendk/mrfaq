import React, { useState } from 'react';
import { Form, Spinner, Button } from 'react-bootstrap';
import Post from 'classes/Post.class';
import { useHistory } from 'react-router-dom';

export interface PostFormProps {
	post?: Post;
	onCancel?: Function;
}

const PostForm: React.SFC<PostFormProps> = ({ post, onCancel }) => {
	const history = useHistory();
	const [title, setTitle] = useState(post?.title || '');
	const [text, setText] = useState(post?.text || '');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async () => {
		try {
			setIsLoading(true);
			if (!!post) {
				await Post.edit(post.id, { title, text });
				history.push(`/opslag/${post.id}`);
				onCancel();
			} else {
				await Post.create({ title, text });
				history.push('/');
			}
			setText('');
			setTitle('');
		} catch (error) {}
		setIsLoading(false);
	};

	return (
		<Form>
			<Form.Group>
				<Form.Label>Titel</Form.Label>
				<Form.Control
					type="text"
					onChange={(e) => setTitle(e.target.value)}
					value={title}
					placeholder="Titel"
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Tekst</Form.Label>
				<Form.Control
					as="textarea"
					rows={3}
					onChange={(e) => setText(e.target.value)}
					value={text}
					placeholder="Tekst"
				/>
			</Form.Group>
			<Form.Group>
				<Button onClick={handleSubmit} disabled={isLoading} variant="secondary">
					{isLoading ? <Spinner size="sm" animation="border" /> : 'Opret'}
				</Button>
				{post && (
					<Button onClick={() => onCancel()} variant="outline-secondary">
						Annuller
					</Button>
				)}
			</Form.Group>
		</Form>
	);
};

export default PostForm;
