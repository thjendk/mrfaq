import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Admin = {
   __typename?: 'Admin';
  id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['Int']>;
};

export type AdminInput = {
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Comment = {
   __typename?: 'Comment';
  id?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  admin?: Maybe<Admin>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type CommentInput = {
  text?: Maybe<Scalars['String']>;
  postId?: Maybe<Scalars['Int']>;
};

export type LoginInput = {
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  _empty?: Maybe<Scalars['Boolean']>;
  login?: Maybe<Scalars['String']>;
  logout?: Maybe<Scalars['String']>;
  createAdmin?: Maybe<Scalars['String']>;
  createPost?: Maybe<Post>;
  editPost?: Maybe<Post>;
  deletePost?: Maybe<Scalars['String']>;
  addPostTag?: Maybe<Post>;
  removePostTag?: Maybe<Post>;
  createTag?: Maybe<Tag>;
  editTag?: Maybe<Tag>;
  deleteTag?: Maybe<Scalars['String']>;
  createComment?: Maybe<Post>;
  deleteComment?: Maybe<Post>;
};


export type MutationLoginArgs = {
  data?: Maybe<LoginInput>;
};


export type MutationCreateAdminArgs = {
  data?: Maybe<AdminInput>;
};


export type MutationCreatePostArgs = {
  data?: Maybe<PostInput>;
};


export type MutationEditPostArgs = {
  id?: Maybe<Scalars['Int']>;
  data?: Maybe<PostInput>;
};


export type MutationDeletePostArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type MutationAddPostTagArgs = {
  data?: Maybe<PostTagInput>;
};


export type MutationRemovePostTagArgs = {
  data?: Maybe<PostTagInput>;
};


export type MutationCreateTagArgs = {
  data?: Maybe<TagInput>;
};


export type MutationEditTagArgs = {
  id?: Maybe<Scalars['Int']>;
  data?: Maybe<TagInput>;
};


export type MutationDeleteTagArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type MutationCreateCommentArgs = {
  data?: Maybe<CommentInput>;
};


export type MutationDeleteCommentArgs = {
  id?: Maybe<Scalars['Int']>;
};

export type Post = {
   __typename?: 'Post';
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  admin?: Maybe<Admin>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type PostInput = {
  title?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type PostTagInput = {
  tagId?: Maybe<Scalars['Int']>;
  postId?: Maybe<Scalars['Int']>;
};

export type Query = {
   __typename?: 'Query';
  _empty?: Maybe<Scalars['Boolean']>;
  admin?: Maybe<Admin>;
  posts?: Maybe<Array<Maybe<Post>>>;
  post?: Maybe<Post>;
  tags?: Maybe<Array<Maybe<Tag>>>;
};


export type QueryPostArgs = {
  id?: Maybe<Scalars['Int']>;
};

export type Tag = {
   __typename?: 'Tag';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
};

export type TagInput = {
  name?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
};



