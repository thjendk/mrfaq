import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Posts from 'components/Posts';
import styled from 'styled-components';
import Header from 'components/Header';
import Admin from 'classes/Admin.class';
import Login from 'components/Login';
import SpecificPost from 'components/SpecificPost';
import Logout from 'components/Logout';
import Contact from 'components/Contact';
import AdminPage from 'components/AdminPage';
import Footer from 'components/Footer';
import MessageSpecific from 'components/MessageSpecific';
import PostForm from 'components/PostForm';

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	margin: 5px auto;
	width: 100%;
	max-width: 1200px;
`;

export interface AppProps {}

const App: React.SFC<AppProps> = () => {
	useEffect(() => {
		Admin.fetch();
	}, []);

	return (
		<div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
			<Header />
			<Layout>
				<Switch>
					<Route path="/opslag/:postId" component={SpecificPost} />
					<Route path="/besked/:messageId" component={MessageSpecific} />
					<Route path="/kontakt" component={Contact} />
					<Route path="/admin" component={AdminPage} />
					<Route path="/logout" component={Logout} />
					<Route path="/login" component={Login} />
					<Route path="/new" component={PostForm} />
					<Route path="/" component={Posts} />
				</Switch>
			</Layout>
			<div style={{ flexGrow: 1 }} />
			<Footer />
		</div>
	);
};

export default App;
