// This example demonstrates how to use $lookup to join unrelated collections.
// The example uses the following collections:
// students: Contains student information.
db.students.insertMany([
    {
        "_id": 1,
        "student": "Ann Aardvark",
        "sickdays": [
            {
                "$date": "2018-05-01T00:00:00.000Z"
            },
            {
                "$date": "2018-08-23T00:00:00.000Z"
            }
        ]
    }])

// holidays: Contains holiday information.
db.holidays.insertMany([
    {
        "_id": 1,
        "year": 2018,
        "name": "New Years",
        "date": {
            "$date": "2018-01-01T00:00:00.000Z"
        }
    },
    {
        "_id": 2,
        "year": 2018,
        "name": "Ice Cream Day",
        "date": {
            "$date": "2018-07-16T00:00:00.000Z"
        }
    },
    {
        "_id": 3,
        "year": 2017,
        "name": "New Years",
        "date": {
            "$date": "2017-01-01T00:00:00.000Z"
        }
    }])


db.students.aggregate([
    {
        $lookup:
        /**
         * from: The target collection.
         * localField: The local join field.
         * foreignField: The target join field.
         * as: The name for the results.
         * pipeline: Optional pipeline to run on the foreign collection.
         * let: Optional variables to use in the pipeline field stages.
         */
        {
            from: "holidays",
            pipeline: [
                {
                    $match: {
                        year: 2018
                    }
                },
                {
                    $project: {
                        _id: 0,
                        date: {
                            name: "$name",
                            date: "$date"
                        }
                    }
                },
                {
                    $replaceRoot: {
                        newRoot: "$date"
                    }
                }
            ],
            as: "holidays"
        }
    }
])