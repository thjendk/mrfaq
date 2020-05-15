import { Post as PostType, PostInput, PostTagInput } from 'types/generated';
import { gql } from '@apollo/client';
import Apollo from './Apollo.class';
import { store } from 'index';
import combinedReducer from 'redux/reducers/combined.reducer';

interface Post extends PostType {}

class Post {
	static fragment = gql`
		fragment Post on Post {
			id
			title
			text
			admin {
				id
			}
			tags {
				id
				name
				color
			}
			comments {
				id
				text
				admin {
					id
					fullName
				}
				createdAt
				updatedAt
			}
			createdAt
			updatedAt
		}
	`;

	static fetchAll = async () => {
		const query = gql`
			query Posts {
				posts {
					...Post
				}
			}
			${Post.fragment}
		`;

		const posts = await Apollo.query<Post[]>('posts', query);
		return store.dispatch(combinedReducer.actions.addPosts(posts));
	};

	static create = async (data: PostInput) => {
		const mutation = gql`
			mutation CreatePost($data: PostInput) {
				createPost(data: $data) {
					...Post
				}
			}
			${Post.fragment}
		`;

		const post = await Apollo.mutate('createPost', mutation, { data });
		return store.dispatch(combinedReducer.actions.addPosts(post));
	};

	static addTag = async (data: PostTagInput) => {
		const mutation = gql`
			mutation AddPostTag($data: PostTagInput) {
				addPostTag(data: $data) {
					...Post
				}
			}
			${Post.fragment}
		`;

		const post = await Apollo.mutate<Post>('addPostTag', mutation, { data });
		return store.dispatch(combinedReducer.actions.addPosts(post));
	};

	static removeTag = async (data: PostTagInput) => {
		const mutation = gql`
			mutation RemovePostTag($data: PostTagInput) {
				removePostTag(data: $data) {
					...Post
				}
			}
			${Post.fragment}
		`;

		const post = await Apollo.mutate('removePostTag', mutation, { data });
		return store.dispatch(combinedReducer.actions.addPosts(post));
	};

	static edit = async (id: number, data: PostInput) => {
		const mutation = gql`
			mutation EditPost($id: Int, $data: PostInput) {
				editPost(id: $id, data: $data) {
					...Post
				}
			}
			${Post.fragment}
		`;

		const post = await Apollo.mutate('editPost', mutation, { id, data });
		return store.dispatch(combinedReducer.actions.addPosts(post));
	};

	static remove = async (id: number) => {
		const mutation = gql`
			mutation DeletePost($id: Int) {
				deletePost(id: $id)
			}
		`;

		await Apollo.mutate('deletePost', mutation, { id });
		return store.dispatch(combinedReducer.actions.removePost(id));
	};
}

export default Post;
