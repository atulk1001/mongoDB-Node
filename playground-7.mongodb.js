//$reduce Applies an expression to each element in an array and combines them into a single value.
/*
{
  "_id": 1,
  "productId": "bewkoof-01",
  "description": "T-Shirt",
  "color": "black",
  "size": "M",
  "price": 20,
  "discounts": [
    0.5,
    0.1
  ]
} */
// Write an aggregation query to calculate the discounted price of each product. 
// The discounted price is calculated by multiplying the price of the product with the discount percentage.
// The discounted price is then multiplied by the next discount percentage.
use('nature');


db.clothes.aggregate(
    [
        {
            $project: {
                discountedPrice: {
                    $reduce: {
                        input: "$discounts", // discounts is an array
                        initialValue: "$price", // price is a field in the document
                        in: { $multiply: ["$$value", { $subtract: [1, "$$this"] }] }
                        // $$value is the accumulator,
                        //  $$this is the current value
                    }
                }
            }
        }
    ]
)