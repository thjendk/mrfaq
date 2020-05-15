import { Comment as CommentType, CommentInput } from 'types/generated';
import { gql } from '@apollo/client';
import Apollo from './Apollo.class';
import Post from './Post.class';
import { store } from 'index';
import combinedReducer from 'redux/reducers/combined.reducer';

interface Comment extends CommentType {}

class Comment {
	static create = async (data: CommentInput) => {
		const mutation = gql`
			mutation CreateComment($data: CommentInput) {
				createComment(data: $data) {
					...Post
				}
			}
			${Post.fragment}
		`;

		const post = await Apollo.mutate<Post>('createComment', mutation, { data });
		return store.dispatch(combinedReducer.actions.addPosts(post));
	};

	static remove = async (id: number) => {
		const mutation = gql`
			mutation DeleteComment($id: Int) {
				deleteComment(id: $id) {
					...Post
				}
			}
			${Post.fragment}
		`;

		const post = await Apollo.mutate('deleteComment', mutation, { id });
		return store.dispatch(combinedReducer.actions.addPosts(post));
	};
}

export default Comment;
