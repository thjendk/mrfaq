import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
	return knex.schema.createTable('message_comments', (t) => {
		t.increments('message_comment_id');
		t.integer('message_id').unsigned().references('messages.message_id').onDelete('SET NULL').onUpdate('cascade');
		t.text('text');
		t.integer('admin_id').unsigned().references('admins.admin_id').onDelete('SET NULL').onUpdate('cascade');
		t.timestamps(true);
	});
}

export async function down(knex: Knex): Promise<any> {
	return knex.schema.dropTableIfExists('message_comments');
}
