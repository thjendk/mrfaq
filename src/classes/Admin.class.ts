import { Admin as AdminType, LoginInput } from 'types/generated';
import Apollo from './Apollo.class';
import { store } from 'index';
import combinedReducer from 'redux/reducers/combined.reducer';
import { gql } from '@apollo/client';

interface Admin extends AdminType {}

class Admin {
	static fragment = gql`
		fragment Admin on Admin {
			id
			username
			level
		}
	`;

	static fetch = async () => {
		const query = gql`
			query Admin {
				admin {
					...Admin
				}
			}
			${Admin.fragment}
		`;

		const admin = await Apollo.query<Admin>('admin', query);
		return store.dispatch(combinedReducer.actions.setAdmin(admin));
	};

	static login = async (data: LoginInput) => {
		const mutation = gql`
			mutation Login($data: LoginInput) {
				login(data: $data)
			}
		`;

		await Apollo.mutate('login', mutation, { data });
		await Admin.fetch();
	};
}

export default Admin;
