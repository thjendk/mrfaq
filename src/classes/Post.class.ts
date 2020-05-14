import { Post as PostType } from 'types/generated';
import { gql } from '@apollo/client';
import Apollo from './Apollo.class';
import { store } from 'index';
import combinedReducer from 'redux/reducers/combined.reducer';

interface Post extends PostType {}

class Post {
	static fetchAll = async () => {
		const query = gql`
			query Posts {
				posts {
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
						}
						createdAt
						updatedAt
					}
					createdAt
					updatedAt
				}
			}
		`;

		const posts = await Apollo.query<Post[]>('posts', query);
		return store.dispatch(combinedReducer.actions.addPosts(posts));
	};
}

export default Post;
