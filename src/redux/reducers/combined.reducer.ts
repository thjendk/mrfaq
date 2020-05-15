import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, Admin, Tag } from 'types/generated';
import { insertOrReplace } from '../utils';

const initialState = {
	posts: [] as Post[],
	admin: null as Admin,
	tags: [] as Tag[]
};

const combinedReducer = createSlice({
	name: 'combined',
	initialState,
	reducers: {
		addPosts: (state, action: PayloadAction<Post | Post[]>) => {
			insertOrReplace(state.posts, action.payload);
		},
		setAdmin: (state, action: PayloadAction<Admin>) => {
			state.admin = action.payload;
		},
		addTags: (state, action: PayloadAction<Tag | Tag[]>) => {
			insertOrReplace(state.tags, action.payload);
		},
		removePost: (state, action: PayloadAction<number>) => {
			const index = state.posts.findIndex((p) => p.id === action.payload);
			state.posts.splice(index, 1);
		}
	}
});

export default combinedReducer;
