import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, Admin, Tag } from 'types/generated';
import { insertOrReplace, removeFromState } from '../utils';
import Message from 'classes/Message.class';

const initialState = {
	posts: [] as Post[],
	admin: null as Admin,
	tags: [] as Tag[],
	admins: [] as Admin[],
	messages: [] as Message[]
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
			removeFromState(state.posts, action.payload);
		},
		addAdmins: (state, action: PayloadAction<Admin | Admin[]>) => {
			insertOrReplace(state.admins, action.payload);
		},
		removeAdmin: (state, action: PayloadAction<number>) => {
			removeFromState(state.admins, action.payload);
		},
		addMessages: (state, action: PayloadAction<Message | Message[]>) => {
			insertOrReplace(state.messages, action.payload);
		},
		removeMessage: (state, action: PayloadAction<number>) => {
			removeFromState(state.messages, action.payload);
		}
	}
});

export default combinedReducer;
