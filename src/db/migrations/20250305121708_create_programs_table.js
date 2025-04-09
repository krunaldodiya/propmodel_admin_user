
  export async function up(knex) {
    await knex.schema.createTable("programs", (table) => {
      table.uuid("uuid").primary().defaultTo(knex.raw("gen_random_uuid()"));
      table.string("group_key").defaultTo(null);
      table.enum('stage', ['trial', 'single', 'double','triple','instant']).defaultTo(null);
      table.enum('type', ['standard', 'aggressive']).defaultTo(null);
      table.jsonb('prices').defaultTo(null); 
      table.integer('account_leverage').defaultTo(0);
      table.integer('profit_split').defaultTo(0);
      table.string("profit_target").defaultTo(null);
      table.integer('max_drawdown').defaultTo(0);
      table.integer('daily_drawdown').defaultTo(0);
      table.timestamps(true, true); 
    });
  }

  export async function down(knex) {
    await knex.schema.dropTable("programs");
  }
