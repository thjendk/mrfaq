import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Posts from 'components/Posts';
import styled from 'styled-components';
import Header from 'components/Header';

const Layout = styled.div`
	display: flex;
	flex-direction: column;

	max-width: 1200px;
	margin: 5px auto;
`;

function App() {
	return (
		<div>
			<Header />
			<Layout>
				<Switch>
					<Route path="/" component={Posts} />
				</Switch>
			</Layout>
		</div>
	);
}

export default App;
