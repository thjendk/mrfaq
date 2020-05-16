import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
	return knex.schema.createTable('messages', (t) => {
		t.increments('message_id');
		t.text('text');
		t.string('email');
		t.timestamps(true);
	});
}

export async function down(knex: Knex): Promise<any> {
	return knex.schema.dropTableIfExists('messages');
}
