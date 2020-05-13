import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
	return knex.schema.createTable('posts', (t) => {
		t.increments('post_id');
		t.string('title').notNullable();
		t.text('text');
		t.integer('admin_id').unsigned().references('admins.admin_id').onDelete('SET NULL').onUpdate('cascade');
		t.integer('deleted', 1).notNullable().defaultTo(0);
		t.timestamps(true);
	});
}

export async function down(knex: Knex): Promise<any> {
	return knex.schema.dropTableIfExists('posts');
}
