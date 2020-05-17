import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
	return knex.schema.alterTable('messages', (t) => {
		t.integer('deleted', 1).defaultTo(0);
	});
}

export async function down(knex: Knex): Promise<any> {
	return knex.schema.alterTable('messages', (t) => {
		t.dropColumn('deleted');
	});
}
