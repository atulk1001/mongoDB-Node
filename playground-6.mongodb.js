// convert the temprature from celsius to fahrenheit

// Select the database to use.
use('nature');

db.temperatures.aggregate([
    {
        $addFields: {
            "tempsF": {
                $map: {
                    input: "$tempsC",
                    as: "tempF",
                    in: {
                        $add: [{ $multiply: ["$$tempF", 9 / 5] }, 32]
                    }
                }
            }
        }
    }
])

