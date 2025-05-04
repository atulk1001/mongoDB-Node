/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('finance');

db.orders.aggregate([
    {
        $match: {
            "pizzas.size": { $in: ["Large", "Medium", "Small"] },
            status: "Completed",
        }
    },
    {
        $unwind: "$pizzas"
    },
    {
        $group: {
            _id: "$pizzas.size",
            cumulative: {
                $sum: { $multiply: ["$pizzas.price", "$pizzas.quantity"] }
            },
            tax: { $sum: "$pizzas.tax" },
            customers: { $addToSet: "$customerName" }
        }
    },
    {
        $project: {
            _id: 0,
            size: "$_id",
            customers: 1,
            tax: 1,
            cumulative: { $round: ["$cumulative", 2] },
            total: {
                $round: [{ $add: ["$cumulative", "$tax"] }, 2]
            }
        }
    },
    {
        $sort: { "size": -1 }
    }
])
