import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
	return knex.schema.createTable('tags', (t) => {
		t.increments('tag_id');
		t.string('name').unique().notNullable();
		t.string('color').unique().notNullable();
		t.string('description');
	});
}

export async function down(knex: Knex): Promise<any> {
	return knex.schema.dropTableIfExists('tags');
}
