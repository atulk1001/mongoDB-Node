db.employee.aggregate([
  {
    $lookup: {
      from: "employee",
      localField: "manager_id",
      foreignField: "pid",
      as: "manager",
    },
  },
  {
    $project: {
      name: 1,
      "manager.name": 1,
    },
  },
  {
    $group: {
      _id: "$manager.$name",
    },
  },
]);

// with $group

db.employee.aggregate([
  {
    $lookup: {
      from: "employee",
      localField: "manager_id",
      foreignField: "pid",
      as: "manager",
    },
  },
  { $unwind: "$manager" },
  {
    $group: {
      _id: "$manager.name",
      employees: { $push: "$name" },
    },
  },
]);

// More than one self join

db.employee.aggregate([
  {
    $lookup: {
      from: "employee",
      localField: "manager_id",
      foreignField: "pid",
      as: "manager",
    },
  },
  { $unwind: "$manager" },
  {
    $lookup: {
      from: "department",
      localField: "dept_id",
      foreignField: "id",
      as: "dept_name",
    },
  },
  { $unwind: "$dept_name" },
  {
    $project: {
      name: 1,
      "manager.name": 1,
      "dept_name.name": 1,
    },
  },
]);

// joining two collections

db.employee.aggregate([
  {
    $lookup: {
      from: "department",
      localField: "dept_id",
      foreignField: "id",
      as: "dept_name",
    },
  },
  { $unwind: "$dept_name" },
  { $project: { name: 1, manager_id: 1, "dept_name.name": 1 } },
]);

// Join with group
db.employee.aggregate([
  {
    $lookup: {
      from: "employee",
      localField: "manager_id",
      foreignField: "pid",
      as: "manager",
    },
  },
  { $unwind: "$manager" },
  {
    $lookup: {
      from: "department",
      localField: "dept_id",
      foreignField: "id",
      as: "dept_name",
    },
  },
  { $unwind: "$dept_name" },
  {
    $group: {
      _id: "$manager.name",
      dept: "$dept_name.name",
      employees: { $push: { ename: "$name", dept: "$dept_name.name" } },
    },
  },
]);

// lookup with group, project, and unwind

db.employee.aggregate([
  {
    $lookup: {
      from: "employee",
      localField: "manager_id",
      foreignField: "pid",
      as: "manager",
    },
  },
  { $unwind: "$manager" },
  {
    $lookup: {
      from: "department",
      localField: "dept_id",
      foreignField: "id",
      as: "dept_name",
    },
  },
  { $unwind: "$dept_name" },
  {
    $group: {
      _id: "$manager.name",
      dept: { $first: "$manager.dept_id" },
      employees: { $push: { ename: "$name", dept: "$dept_name.name" } },
    },
  },

  {
    $project: {
      dept_name: 1,
      manager: 1,
      employees: 1,
      dept: 1,
    },
  },
]);
