db.createRole({
  role: "Billing",
  privileges: [
    {
      resource: { db: "company", collection: "medicalView" },
      actions: ["find"],
    },
  ],
  roles: [],
});

db.createRole({
  role: "Provider",
  privileges: [
    {
      resource: { db: "company", collection: "medicalView" },
      actions: ["find"],
    },
  ],
  roles: [],
});
