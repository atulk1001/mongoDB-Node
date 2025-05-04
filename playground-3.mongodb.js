
db.members.aggregate(
    [
        { $project: { _id: 1 } }
    ]
)
db.members.aggregate(
    [
        { $project: { name: { $toUpper: "$_id" }, _id: 0 } },
        { $sort: { name: 1 } }
    ]
)

db.members.aggregate([
    {
        $project: {
            month_joined: { $month: "$joined" },
            name: "$_id",
            _id: 0
        }
    },
    { $sort: { month_joined: 1 } }
])

db.members.aggregate([
    { $project: { month_joined: { $month: "$joined" } } },
    { $group: { _id: { month_joined: "$month_joined" }, number: { $sum: 1 } } },
    { $sort: { "_id.month_joined": 1 } }
])

use('sports');
db.members.aggregate(
    [
        { $unwind: "$likes" },
        { $group: { _id: "$likes", number: { $sum: 1 } } },
        { $sort: { number: -1 } },
        { $limit: 5 }
    ]

)

