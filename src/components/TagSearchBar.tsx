import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { Tag } from './Post';

export interface TagSearchBarProps {}

const TagSearchBar: React.SFC<TagSearchBarProps> = () => {
	const tags = useSelector((state: ReduxState) => state.combined.tags);

	return (
		<div style={{ display: 'flex' }}>
			{tags.map((t) => (
				<Tag color={t.color}>{t.name}</Tag>
			))}
		</div>
	);
};

export default TagSearchBar;
