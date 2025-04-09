
export async function up(knex) {
  await knex.schema.createTable("groups", (table) => {
    table.uuid("uuid").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("g_key").unique().index();
    table.string("g_name").unique().index();
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTable("groups");
}
