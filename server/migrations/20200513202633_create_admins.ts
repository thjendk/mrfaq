import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
	await knex.schema.createTable('admins', (t) => {
		t.increments('admin_id');
		t.string('username').unique().notNullable();
		t.string('full_name').notNullable();
		t.string('password').notNullable();
		t.integer('level', 1).defaultTo(1);
		t.timestamp('last_login');
	});

	await knex('admins').insert({
		username: 'thomas',
		full_name: 'Thomas Jensen',
		password: '$2b$10$WEhhTpKiiYJnZmEPLEuXZ.zBWSiR.sKQU3sBaeIhIvMhgoK1Ux/I2',
		level: 5
	});
}

export async function down(knex: Knex): Promise<any> {
	return knex.schema.dropTableIfExists('admins');
}
