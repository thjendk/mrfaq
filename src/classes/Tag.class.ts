import { Tag as TagType, TagInput } from 'types/generated';
import { gql } from '@apollo/client';
import Apollo from './Apollo.class';
import { store } from 'index';
import combinedReducer from 'redux/reducers/combined.reducer';

interface Tag extends TagType {}

class Tag {
	static fragment = gql`
		fragment Tag on Tag {
			id
			name
			color
			description
		}
	`;

	static fetchAll = async () => {
		const query = gql`
			query Tags {
				tags {
					...Tag
				}
			}
			${Tag.fragment}
		`;

		const tags = await Apollo.query<Tag[]>('tags', query);
		return store.dispatch(combinedReducer.actions.addTags(tags));
	};

	static create = async (data: TagInput) => {
		const mutation = gql`
			mutation CreateTag($data: TagInput) {
				createTag(data: $data) {
					...Tag
				}
			}
			${Tag.fragment}
		`;

		const tag = await Apollo.mutate('createTag', mutation, { data });
		return store.dispatch(combinedReducer.actions.addTags(tag));
	};
}

export default Tag;
