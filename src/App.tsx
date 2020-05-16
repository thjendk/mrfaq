import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Posts from 'components/Posts';
import styled from 'styled-components';
import Header from 'components/Header';
import Admin from 'classes/Admin.class';
import Login from 'components/Login';
import SpecificPost from 'components/SpecificPost';
import Admins from 'components/Admins';
import Logout from 'components/Logout';

const Layout = styled.div`
	display: flex;
	flex-direction: column;

	max-width: 1200px;
	margin: 5px auto;
`;

export interface AppProps {}

const App: React.SFC<AppProps> = () => {
	useEffect(() => {
		Admin.fetch();
	}, []);

	return (
		<div>
			<Header />
			<Layout>
				<Switch>
					<Route path="/post/:postId" component={SpecificPost} />
					<Route path="/users" component={Admins} />
					<Route path="/logout" component={Logout} />
					<Route path="/login" component={Login} />
					<Route path="/" component={Posts} />
				</Switch>
			</Layout>
		</div>
	);
};

export default App;
