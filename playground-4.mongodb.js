// Select the database to use.
use('sample_game');

// get population of each state
db.zipcodes.aggregate([
    { $group: { _id: "$state", pop: { $sum: "$pop" } } }
])

// get Largest and Smallest Cities by State

db.zipcodes.aggregate([
    { $group: { _id: { state: "$state", city: "$city" }, pop: { $sum: "$pop" } } },
    {
        $sort: { pop: 1 }
    },
    {
        $group: {
            _id: "$_id.state",
            biggestCity: { $last: "$_id.city" },
            biggestPop: { $last: "$pop" },
            smallestCity: { $first: "$_id.city" },
            smallestPop: { $first: "$pop" }
        }
    }, {
        $project:
        {
            _id: 0,
            state: "$_id",
            biggestCity: { name: "$biggestCity", pop: "$biggestPop" },
            smallestCity: { name: "$smallestCity", pop: "$smallestPop" }
        }
    }
])