'use strict';
/**
 formula:
 * (cost_per_minute)(ride_time) + (cost_per_mile)(distance_trip)
 */

var cars = [
	{ feature: 'essential', cost_per_minute: 0.2, cost_per_mile:1.1 },
	{ feature: 'executive', cost_per_minute: 0.35, cost_per_mile:1.8 },
	{ feature: 'suv', cost_per_minute: 0.4, cost_per_mile: 2.3 },
	{ feature: 'travel_trip', cost_per_minute: 0.45, cost_per_mile: 3.5 },
	{ feature: 'family', cost_per_minute: 0.55, cost_per_mile: 4.5 }
];

var fares = {
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

	computeEstimateFare: function(ride_time, distance_trip) {
		var errors = this.hasErrors(ride_time, distance_trip);

		if (errors.length) {
			return {
				messages: errors,
				error: true
			};
		};

		var estimates = [];
		for (var x = 0; x < cars.length; x++) {
			var fare = (ride_time * cars[x].cost_per_minute) + (distance_trip * cars[x].cost_per_mile);
			estimates.push({
				feature: cars[x].feature,
				fare: fare.toFixed(1)
			});
		};

		return estimates
	}
};

console.log('start runtime business logic\n');
console.time('runtime');

var showing_records = function(error, records) {
	for (var x = 0; x < records.length; x++) {
		var value = (error ? "Error: " + records[x] : "fare estimate for " + records[x].feature + ': ' + records[x].fare);
		console.log(value);
	};

	console.timeEnd("runtime");
	console.log('end runtime business logic\n');
}
/**
 * Parameters: function(ride_time, distance_trip)
 * both parameters are numeric.
 * distance_trip: miles
 * ride_time: minutes
 *
*/
var distance_trip = 17;
var ride_time = 40;
var estimate = fares.computeEstimateFare(ride_time, distance_trip);

if (estimate.error) {
	return showing_records(true, estimate.messages);
};
showing_records(false, estimate);

