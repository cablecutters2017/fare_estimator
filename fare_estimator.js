'use strict';
/**
 formula:
 * (cost_per_minute)(ride_time) + (cost_per_mile)(distance_trip)
 */

var fares = {
	getCars: function() {
		return [{
			essential: {
				cost_per_minute: 0.2,
				cost_per_mile:1.1
			},
			executive: {
				cost_per_minute: 0.35,
				cost_per_mile:1.8
			},
			suv: {
				cost_per_minute: 0.4,
				cost_per_mile: 2.3
			},
			extra: {
				cost_per_minute: 0.45,
				cost_per_mile: 3.5
			},
			travel_trip: {
				cost_per_minute: 0.50,
				cost_per_mile: 4.0
			}
		}];
	},

	hasErrors: function(ride_time, distance_trip) {
		var errors = [];

		if (distance_trip == void 0) {
			errors.push("the distance_trip parameter is required")
		};

		if (ride_time == void 0) {
			errors.push("the ride_time parameter is required");
		};

		if (errors.length) return errors;

		if (ride_time.constructor !== Number) {
			errors.push("the ride_time parameter is not numeric");
		};

		if (distance_trip.constructor !== Number) {
			errors.push("the distance_trip parameter is not numeric");
		};

		if (errors.length) return errors;

		if (ride_time <= -1) {
			errors.push("the ride_time parameter is not numeric");
		};

		if (distance_trip <= -1) {
			errors.push("the distance_trip parameter is not numeric");
		};

		return errors;
	},

	parseToMiles: function(distance_trip) {
		return distance_trip * 0.621371192237334;
	},

	computeEstimateFare: function(ride_time, distance_trip) {
		var errors = this.hasErrors(ride_time, distance_trip);
		var results = {
			message: null,
			result: [],
			error: false
		};

		try {
			if (errors.length) throw errors;

			var distance_in_miles = distance_trip; //this.parseToMiles(distance_trip);
			var cars = this.getCars();
			var estimates = [];
			var types = Object.keys(cars[0]);

			if (types) {
				for (var x = 0; x < types.length; x++) {
					var type = types[x];

					cars.forEach(function(car) {
						var found = car[type];

						if (found) {
							var compute_fare_estimate = (ride_time * found.cost_per_minute) + (distance_in_miles * found.cost_per_mile);
							estimates.push({
								'type': type,
								'price': parseFloat(compute_fare_estimate.toFixed(2))
							});
						};
					})
				};

				results.result = estimates
			};

		} catch(errors) {
			results.message = 'could not be computed fare estimates because some errors are present';
			results.result = errors;
			results.error = true;
		}

		return results;
	}
};

/**
 * Parameters: function(ride_time, distance_trip)
 * both parameters are numeric.
 * ride_time: minutes
 * distance_trip: miles
 *
*/
var distance_trip = 50;
var ride_time = 40;

var estimates = fares.computeEstimateFare(ride_time, distance_trip);
var has_error = estimates['error'];

if (!has_error) {
	console.log('SUCCESS');
	console.log('Trip distance:', distance_trip, 'miles');
	console.log('Ride time:', ride_time, 'minutes');
	console.log('\n');
} else {
	console.log('FAILS', '(' + estimates.message + ')');
}

estimates.result.forEach(function(result) {
	if (has_error) {
		console.log('Error ===>', result);
	} else {
		var value = 'fare estimate for ' + result['type'] + ': ' + result.price;
		console.log(value);
	}
});