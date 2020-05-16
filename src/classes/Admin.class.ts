import { Admin as AdminType, LoginInput, AdminInput } from 'types/generated';
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
			fullName
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
		if (!admin) return store.dispatch(combinedReducer.actions.setAdmin(null));
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

	static logout = async () => {
		const mutation = gql`
			mutation Logout {
				logout
			}
		`;

		await Apollo.mutate('logout', mutation);
		await Admin.fetch();
	};

	static create = async (data: AdminInput) => {
		const mutation = gql`
			mutation CreateAdmin($data: AdminInput) {
				createAdmin(data: $data) {
					...Admin
				}
			}
			${Admin.fragment}
		`;

		const admin = await Apollo.mutate<Admin>('createAdmin', mutation, { data });
		return store.dispatch(combinedReducer.actions.addAdmins(admin));
	};

	static findAll = async () => {
		const query = gql`
			query Admins {
				admins {
					...Admin
				}
			}
			${Admin.fragment}
		`;

		const admins = await Apollo.query<Admin[]>('admins', query);
		return store.dispatch(combinedReducer.actions.addAdmins(admins));
	};

	static edit = async (id: number, data: AdminInput) => {
		const mutation = gql`
			mutation EditAdmin($id: Int, $data: AdminInput) {
				editAdmin(id: $id, data: $data) {
					...Admin
				}
			}
			${Admin.fragment}
		`;

		const admin = await Apollo.mutate<Admin>('editAdmin', mutation, { id, data });
		return store.dispatch(combinedReducer.actions.addAdmins(admin));
	};

	static delete = async (id: number) => {
		const mutation = gql`
			mutation DeleteAdmin($id: Int) {
				deleteAdmin(id: $id)
			}
		`;

		await Apollo.mutate<string>('deleteAdmin', mutation, { id });
		return store.dispatch(combinedReducer.actions.removeAdmin(id));
	};
}

export default Admin;
