import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
	return knex.schema.createTable('tags', (t) => {
		t.increments('tag_id');
		t.string('name').notNullable();
		t.string('color').notNullable();
	});
}

export async function down(knex: Knex): Promise<any> {
	return knex.schema.dropTableIfExists('tags');
}
