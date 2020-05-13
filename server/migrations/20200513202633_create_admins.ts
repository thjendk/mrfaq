import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
	return knex.schema.createTable('admins', (t) => {
		t.increments('admin_id');
		t.string('username').unique().notNullable();
		t.string('full_name').notNullable();
		t.string('password').notNullable();
		t.integer('level', 1).defaultTo(1);
		t.timestamp('last_login');
	});
}

export async function down(knex: Knex): Promise<any> {
	return knex.schema.dropTableIfExists('admins');
}
