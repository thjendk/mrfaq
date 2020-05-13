import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
	return knex.schema.createTable('posts_tags', (t) => {
		t.integer('post_id')
			.unsigned()
			.references('posts.post_id')
			.onDelete('cascade')
			.onUpdate('cascade')
			.notNullable();
		t.integer('tag_id').unsigned().references('tags.tag_id').onDelete('cascade').onUpdate('cascade').notNullable();
		t.primary(['post_id', 'tag_id']);
	});
}

export async function down(knex: Knex): Promise<any> {
	return knex.schema.dropTableIfExists('posts_tags');
}
