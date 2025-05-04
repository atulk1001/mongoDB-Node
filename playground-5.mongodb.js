// $filter aggregation operator
// The $filter operator filters an array to return the elements that match the specified condition.
// The $filter operator syntax is:
// { $filter: { input: <array>, as: <string>, cond: <expression> } }
use('nature');
db.sales.aggregate([
    {
        $project: {
            items: {
                $filter: {
                    input: '$items',
                    as: 'item',
                    cond: {
                        $gt: ['$$item.price', 50]
                    }
                }
            }
        }
    }
]);