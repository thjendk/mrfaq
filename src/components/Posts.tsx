import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import PostComponent from './Post';
import PostCreator from './postCreator';
import { Accordion, Form } from 'react-bootstrap';
import Post from 'classes/Post.class';
import styled from 'styled-components';
export const SearchContext = React.createContext('');

export const Divider = styled.div`
	height: 5px;
	margin: 5px auto;
	width: 100%;
`;

export interface PostsProps {}

const Posts: React.SFC<PostsProps> = () => {
	const [search, setSearch] = useState('');
	const posts = useSelector((state: ReduxState) =>
		state.combined.posts.filter((p) => {
			if (
				p.title.includes(search) ||
				p.text.includes(search) ||
				p.comments.map((c) => c.text).some((t) => t.includes(search))
			) {
				return true;
			}
			return false;
		})
	);
	const admin = useSelector((state: ReduxState) => state.combined.admin);

	useEffect(() => {
		setInterval(() => {
			Post.fetchAll();
		}, 1000 * 60 * 5);

		Post.fetchAll();
	}, []);

	return (
		<div>
			<Form.Control
				onChange={(e) => setSearch(e.target.value)}
				value={search}
				type="text"
				placeholder="Søg..."
				size="lg"
			/>
			<Divider />
			<Accordion>
				<SearchContext.Provider value={search}>
					{posts.map((p) => (
						<PostComponent post={p} />
					))}
				</SearchContext.Provider>
				{<PostCreator />}
			</Accordion>
		</div>
	);
};

export default Posts;
