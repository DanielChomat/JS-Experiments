var myJSON;

function dataReady() {
	// console.log(myJSON);
}

function loadujJSON() {
	$.getJSON('json/reservations.json', function(json) {
		// console.log("First JSON loaded");
		myJSON = json;

		// console.log(myJSON);

		dataReady();
	});
}

var branchPicker = document.querySelector('#branchPicker');
var branchPicked = document.querySelector('#branchPicked');
var datePicker = document.querySelector('#datePicker');
var timePicker = document.querySelector('#timePicker');

loadujJSON();

var daysInWeek = [
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
	'sunday'
];
var daysInWeekNotUTC = [
	'sunday',
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday'
];
var daysInWeekNotUTCCZ = [
	'Neděle',
	'Pondělí',
	'Úterý',
	'Středa',
	'Čtvrtek',
	'Pátek',
	'Sobota'
];

function generateOption(stringOption) {
	var optionChoose = document.createElement('option');

	optionChoose.textContent = 'Vyberte ' + stringOption + '...';
	optionChoose.value = '';
	return optionChoose;
}

// when the month or year <select> values are changed, rerun populateDays()
// in timee the change affected the number of available days
if (branchPicker) {
	branchPicker.onchange = function() {
		if ($(datePicker).attr('disabled')) {
			$(datePicker).removeAttr('disabled');
		}

		while (datePicker.firstChild) {
			datePicker.removeChild(datePicker.firstChild);
		}

		while (timePicker.firstChild) {
			timePicker.removeChild(timePicker.firstChild);
		}

		timePicker.appendChild(generateOption('čas'));

		if (!$(timePicker).attr('disabled')) {
			$(timePicker).attr('disabled', true);
		}

		populateDays(branchPicker.value);
	};

	datePicker.onchange = function() {
		while (timePicker.firstChild) {
			timePicker.removeChild(timePicker.firstChild);
		}

		timePicker.appendChild(generateOption('čas'));

		if ($(timePicker).attr('disabled')) {
			$(timePicker).removeAttr('disabled');
		}

		var dateToGetTime = new Date(datePicker.value);

		var dayToParse = daysInWeekNotUTC[dateToGetTime.getDay()];

		var dateToParse =
			dateToGetTime.getDate() +
			'.' +
			(dateToGetTime.getMonth() + 1) +
			'.' +
			dateToGetTime.getFullYear();

		populateTimes(branchPicker.value, dayToParse, dateToParse);
	};
} else if (branchPicked) {
	datePicker.onchange = function() {
		while (timePicker.firstChild) {
			timePicker.removeChild(timePicker.firstChild);
		}

		timePicker.appendChild(generateOption('čas'));

		if ($(timePicker).attr('disabled')) {
			$(timePicker).removeAttr('disabled');
		}

		var dateToGetTime = new Date(datePicker.value);

		var dayToParse = daysInWeekNotUTC[dateToGetTime.getDay()];

		var dateToParse =
			dateToGetTime.getDate() +
			'.' +
			(dateToGetTime.getMonth() + 1) +
			'.' +
			dateToGetTime.getFullYear();

		populateTimes(branchPicked.value, dayToParse, dateToParse);

		$('#divReservationName').show(500, function() {
			$('#divReservationPhone').show(500, function() {
				console.log(500);
				$('#divReservationEmail').show(500);
			});
		});
	};
}

function setHoursAndMinutes(timeString, isEnding) {
	var array = timeString.split(':');

	var numberOfHours = parseInt(array[0], 10);
	var numberOfMinutes = parseInt(array[1], 10);

	var time = new Date();
	time.setHours(numberOfHours);
	if (isEnding) {
		time.setMinutes(numberOfMinutes - 30);
	} else {
		time.setMinutes(numberOfMinutes);
	}

	return time;
}

function populateTimes(name, day, date) {
	var pauseStart;
	var pauseEnd;

	var beginningTime;
	var endingTime;

	$.each(myJSON.branches.branch, function(i, v) {
		if (v.name == name) {
			$.each(v, function(j, w) {
				if (j == 'days') {
					var gotTime = false;
					$.each(w, function(k, f) {
						if (f.holidayDate && gotTime) {
							if (f.holidayDate == date && f.status == 'open') {
								beginningTime = setHoursAndMinutes(
									f.from,
									false
								);
								endingTime = setHoursAndMinutes(f.until, true);
							}
						} else if (f.day) {
							if (f.day == day) {
								if (f.pauseStart && f.pauseEnd) {
									pauseStart = setHoursAndMinutes(
										f.pauseStart,
										false
									);
									pauseEnd = setHoursAndMinutes(
										f.pauseEnd,
										false
									);
								}

								beginningTime = setHoursAndMinutes(
									f.from,
									false
								);
								endingTime = setHoursAndMinutes(f.until, true);

								gotTime = true;
							}
						}
					});
				}
			});

			for (
				var dateFor = new Date(beginningTime);
				dateFor <= endingTime;
				dateFor.setMinutes(dateFor.getMinutes() + 30)
			) {
				if (pauseStart) {
					if (
						dateFor.getHours() == pauseStart.getHours() &&
						dateFor.getMinutes() == pauseStart.getMinutes()
					) {
						continue;
					}
				}

				var option = document.createElement('option');

				option.textContent = dateFor.toLocaleTimeString(
					navigator.language,
					{
						hour: '2-digit',
						minute: '2-digit'
					}
				);
				option.value = dateFor.getHours() + ':' + dateFor.getMinutes();

				timePicker.appendChild(option);
			}

			return;
		}
	});
}

function populateDays(name) {
	// Generating "Vyberte date" default string and appending it to the picker
	datePicker.appendChild(generateOption('date'));

	// Creating new date to get current day (today)
	var date = new Date();

	// Number of days to check and list
	var dayNum = 21;

	// Starting to go through the JSON
	$.each(myJSON.branches.branch, function(y, v) {
		// Getting the data set with the desired name of branch
		if (v.name == name) {
			// Going through the data set (attrubutes of the desired branch)
			$.each(v, function(j, w) {
				// Getting the data set of days of the desired branch
				if (j == 'days') {
					// Going through and creating new dates to compare with
					// Until the number of how many days we want to show
					for (var i = 1; i <= dayNum; i++) {
						// Creating date for compare to next days
						let nextDate = new Date();
						// Setting the date of the days to the next one
						nextDate.setDate(date.getDate() + i);

						// --- Creating variables for verifying if we can create a new option and add it to the picker
						// isOpen - If the branch is open on the selected day
						var isOpen = false;
						// isOpenHoliday - If it is still open during the holiday
						var isOpenHoliday = true;

						// --- Creating helper variables to add content to the added option
						// optionTextContent - What is displayed in the option (seen on the screen)
						var optionTextContent;
						// optionValue - Parsed string for sending
						var optionValue;

						// Goiing through the data set of the desired day
						$.each(w, function(k, f) {
							if (f.day) {
								// Checking the day of regular opening from JSON with day from variable
								if (
									f.day == daysInWeekNotUTC[nextDate.getDay()]
								) {
									// Assigning string to the helper variable for later use in option
									optionTextContent =
										daysInWeekNotUTCCZ[nextDate.getDay()] +
										', ' +
										nextDate.getDate() +
										'. ' +
										(nextDate.getMonth() + 1) +
										'.';

									// Assigning string to the helper variable for later use in option
									optionValue =
										nextDate.getFullYear() +
										'/' +
										(nextDate.getMonth() + 1) +
										'/' +
										nextDate.getDate();

									// Setting isOpen variable to true, because branch is open on that day
									isOpen = true;
								}
							} else if (f.holidayDate) {
								if (
									f.holidayDate ==
									nextDate.getDate() +
										'.' +
										(nextDate.getMonth() + 1) +
										'.' +
										nextDate.getFullYear()
								) {
									// Checking the day of holidays from JSON with day from variable

									if (f.status == 'closed') {
										// --- If it will be closed ->
										// Setting isOpenHoliday variable to false, because branch is CLOSED on that holiday
										// No need to check other variables and just letting it be
										isOpenHoliday = false;
									}
								}
							} else {
							}
						});

						if (isOpen && isOpenHoliday) {
							var option = document.createElement('option');

							option.textContent = optionTextContent;

							option.value = optionValue;

							datePicker.appendChild(option);
						}
					}
				}
			});
			//console.log(v.name);
			return;
		}
	});
}
