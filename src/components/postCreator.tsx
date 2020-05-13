import React, { useState } from 'react';
import Collapsible from './Collapsible';
import { Input, Button } from 'reactstrap';
import { Divider } from 'components/Collapsible';
import PostComponent from './Post';

export interface PostCreatorProps {}

const PostCreator: React.SFC<PostCreatorProps> = () => {
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');

	return (
		<Collapsible title="Opret ny">
			<Input onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Titel" />
			<Divider hide />
			<Input onChange={(e) => setText(e.target.value)} value={text} type="textarea" placeholder="Tekst" />
			<Divider hide />
			<Button>Opret</Button>
			<Divider />
			{title && (
				<>
					<h5>Preview</h5>
					<PostComponent post={{ text, title }} isOpen />
				</>
			)}
		</Collapsible>
	);
};

export default PostCreator;
