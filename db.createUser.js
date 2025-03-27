db.createUser({
  user: "billing-user",
  pwd: "billing-password",
  roles: [{ role: "Billing", db: "admin" }],
});

db.createUser({
  user: "provider-user",
  pwd: "provider-password",
  roles: [{ role: "Provider", db: "admin" }],
});
