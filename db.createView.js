// create view for billing user whocan only see the billing information
// create view for provider user who can only see the medical information
// sample data
/*
{
  "_id": {
    "$oid": "67d6a8288c6dd804a700676b"
  },
  "patientId": "P001",
  "name": "John Doe",
  "dob": {
    "$date": "1980-01-01T00:00:00.000Z"
  },
  "gender": "Male",
  "address": "123 Main St, Anytown, USA",
  "phone": "555-1234",
  "email": "john.doe@example.com",
  "medicalHistory": [
    "Hypertension",
    "Diabetes"
  ],
  "medications": [
    "Metformin",
    "Lisinopril"
  ],
  "allergies": [
    "Penicillin"
  ],
  "emergencyContact": {
    "name": "Jane Doe",
    "relationship": "Spouse",
    "phone": "555-5678"
  },
  "currency": "INR",
  "paymentMode": "Cash",
  "price": 200
}
*/
db.createView("medicalView", "medicalRecords", [
  {
    $set: {
      medicalHistory: {
        $cond: {
          if: { $in: ["Provider", "$$USER_ROLES.role"] },
          then: "$medicalHistory",
          else: "$$REMOVE",
        },
      },
      allergies: {
        $cond: {
          if: { $in: ["Provider", "$$USER_ROLES.role"] },
          then: "$allergies",
          else: "$$REMOVE",
        },
      },
      emergencyContacts: {
        $cond: {
          if: { $in: ["Provider", "$$USER_ROLES.role"] },
          then: "$emergencyContacts",
          else: "$$REMOVE",
        },
      },
      dob: {
        $cond: {
          if: { $in: ["Provider", "$$USER_ROLES.role"] },
          then: "$dob",
          else: "$$REMOVE",
        },
      },
      address: {
        $cond: {
          if: { $in: ["Provider", "$$USER_ROLES.role"] },
          then: "$address",
          else: "$$REMOVE",
        },
      },
      phone: {
        $cond: {
          if: { $in: ["Provider", "$$USER_ROLES.role"] },
          then: "$phone",
          else: "$$REMOVE",
        },
      },
    },
  },
  {
    $set: {
      currency: {
        $cond: {
          if: { $in: ["Billing", "$$USER_ROLES.role"] },
          then: "$currency",
          else: "$$REMOVE",
        },
      },
      paymentMode: {
        $cond: {
          if: { $in: ["Billing", "$$USER_ROLES.role"] },
          then: "$paymentMode",
          else: "$$REMOVE",
        },
      },
      price: {
        $cond: {
          if: { $in: ["Billing", "$$USER_ROLES.role"] },
          then: "$price",
          else: "$$REMOVE",
        },
      },
    },
  },
]);
