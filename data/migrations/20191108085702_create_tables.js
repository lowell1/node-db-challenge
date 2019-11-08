
exports.up = function(knex) {
  return knex.schema
  .createTable("projects", table => {
      table.increments();
      table.string("project_name", 128).unique().notNullable();
      table.string("description", 128);
  })
  .createTable("tasks", table => {
      table.increments();
      table.string("task_name", 128).notNullable();
      table.integer("project_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("projects");
  })
  .createTable("resources", table => {
      table.increments();
      table.string("resource_name", 128).unique().notNullable();
  })
  .createTable("resource_projects", table => {
    table.integer("project_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("projects");
      table.integer("resource_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("resources");
  });
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists("resource_projects")
  .dropTableIfExists("resources")
  .dropTableIfExists("tasks")
  .dropTableIfExists("projects");
};
