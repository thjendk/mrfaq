import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, Admin } from 'types/generated';
import { insertOrReplace } from '../utils';

const initialState = {
	posts: [] as Post[],
	admin: null as Admin
};

const combinedReducer = createSlice({
	name: 'combined',
	initialState,
	reducers: {
		addPosts: (state, action: PayloadAction<Post[]>) => {
			for (let post of action.payload) {
				insertOrReplace(state.posts, post);
			}
		},
		setAdmin: (state, action: PayloadAction<Admin>) => {
			state.admin = action.payload;
		}
	}
});

export default combinedReducer;
