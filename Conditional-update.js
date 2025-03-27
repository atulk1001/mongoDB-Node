db.contacts.updateOne({ email: "Mariana94@hotmail.com" }, [
  {
    $set: {
      work: {
        $cond: {
          if: { $eq: ["$schemaVersion", 1] },
          then: "999-999-9999",
          else: null,
        },
      },
      "contactInfo.work": {
        $cond: {
          if: { $eq: ["$schemaVersion", 2] },
          then: "999-999-9999",
          else: null,
        },
      },
    },
  },
]);
