import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import PostComponent from './Post';
import PostCreator from './PostCreator';
import { Accordion, Form } from 'react-bootstrap';
import Post from 'classes/Post.class';
import styled from 'styled-components';
import TagSearchBar from './TagSearchBar';
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
				p.title.toLowerCase().includes(search.toLowerCase()) ||
				p.text.toLowerCase().includes(search.toLowerCase()) ||
				p.comments.map((c) => c.text.toLowerCase()).some((t) => t.includes(search.toLowerCase())) ||
				p.tags.map((t) => t.name.toLowerCase()).some((t) => t.includes(search.toLowerCase()))
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
			<SearchContext.Provider value={search}>
				<TagSearchBar />
			</SearchContext.Provider>
			<Divider />
			<Accordion>
				<SearchContext.Provider value={search}>
					{posts.map((p) => (
						<PostComponent post={p} />
					))}
				</SearchContext.Provider>
				{admin && <PostCreator />}
			</Accordion>
		</div>
	);
};

export default Posts;
