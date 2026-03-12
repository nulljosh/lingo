/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  let collection;

  try {
    collection = app.findCollectionByNameOrId("users");
  } catch (_error) {
    collection = new Collection({
      name: "users",
      type: "auth",
      system: false,
    });
  }

  collection.listRule = null;
  collection.viewRule = "id = @request.auth.id";
  collection.createRule = "";
  collection.updateRule = "id = @request.auth.id";
  collection.deleteRule = "id = @request.auth.id";

  const existingNames = new Set(collection.fields.list().map((field) => field.name));
  const addIfMissing = (field) => {
    if (!existingNames.has(field.name)) {
      collection.fields.add(field);
    }
  };

  addIfMissing(
    new TextField({
      name: "username",
      required: true,
      presentable: true,
      min: 3,
      max: 24,
      pattern: "^[a-zA-Z0-9_]+$",
    }),
  );
  addIfMissing(
    new TextField({
      name: "display_name",
      required: true,
      presentable: true,
      min: 1,
      max: 50,
    }),
  );
  addIfMissing(
    new TextField({
      name: "avatar_id",
      required: true,
      presentable: true,
      max: 24,
    }),
  );
  addIfMissing(
    new NumberField({
      name: "xp",
      required: true,
      min: 0,
      onlyInt: true,
    }),
  );
  addIfMissing(
    new NumberField({
      name: "streak",
      required: true,
      min: 0,
      onlyInt: true,
    }),
  );
  addIfMissing(
    new NumberField({
      name: "hearts",
      required: true,
      min: 0,
      onlyInt: true,
    }),
  );
  addIfMissing(
    new JSONField({
      name: "completed_subjects",
    }),
  );
  addIfMissing(
    new JSONField({
      name: "trophy_ids",
    }),
  );
  addIfMissing(
    new JSONField({
      name: "srs",
    }),
  );
  addIfMissing(
    new DateField({
      name: "last_played",
    }),
  );
  addIfMissing(
    new BoolField({
      name: "imported_legacy",
    }),
  );

  const indexName = "idx_users_username";
  if (!collection.indexes.some((index) => String(index).includes(indexName))) {
    collection.addIndex(indexName, true, "username", "");
  }

  return app.save(collection);
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("users");
    return app.delete(collection);
  } catch (_error) {
    return;
  }
});
