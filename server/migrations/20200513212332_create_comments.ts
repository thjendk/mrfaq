import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
	return knex.schema.createTable('comments', (t) => {
		t.increments('comment_id');
		t.text('text').notNullable();
		t.integer('post_id').unsigned().references('posts.post_id').onUpdate('cascade').onDelete('set null');
		t.integer('admin_id').unsigned().references('admins.admin_id').onUpdate('cascade').onDelete('set null');
		t.timestamps(true);
	});
}

export async function down(knex: Knex): Promise<any> {
	return knex.schema.dropTableIfExists('comments');
}
