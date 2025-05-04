// geolocation query

{
    location: {
        $nearSphere: {
            $geometry: {
                type: "Point",
                    "coordinates": [-73.856077, 40.848447]
            },
            $maxDistance: 1000,
                $minDistance: 10
        }
    }
}