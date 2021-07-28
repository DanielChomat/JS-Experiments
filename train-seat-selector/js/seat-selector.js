const structureOfTrain = {
	train: 'BRNO',
	numOfSeats: 64
};

console.log(structureOfTrain);

function createSideOf2(singleSide, numOfSeats, helperNumber) {
	const numSeatsPerRow = 4;
	const numRows = numOfSeats / numSeatsPerRow;

	// console.log(numRows);

	for (let i = 0; i < numRows; i++) {
		// console.log(i);

		var liRowSeats = document.createElement('li');
		liRowSeats.className = 'row-seats';

		var olSeatsGrid = document.createElement('ol');
		olSeatsGrid.classList.add('seats-grid');
		olSeatsGrid.classList.add('row-2');

		for (let j = 0; j < numSeatsPerRow; j++) {
			// console.log(j);

			let helperTextNumber =
				helperNumber < 10 ? '0' + helperNumber : helperNumber;
			var liSeatGrid = document.createElement('li');
			liSeatGrid.className = 'seat-grid';

			var inputCheckboxSeat = document.createElement('input');
			inputCheckboxSeat.type = 'checkbox';
			inputCheckboxSeat.id = helperTextNumber;

			var labelInputCheckboxSeat = document.createElement('label');
			labelInputCheckboxSeat.setAttribute('for', helperTextNumber);
			labelInputCheckboxSeat.innerText = helperTextNumber;

			liSeatGrid.appendChild(inputCheckboxSeat);
			liSeatGrid.appendChild(labelInputCheckboxSeat);

			olSeatsGrid.appendChild(liSeatGrid);
			helperNumber++;
		}

		liRowSeats.appendChild(olSeatsGrid);

		singleSide.appendChild(liRowSeats);
	}

	return singleSide;

	// return liRowSeats;
}

function showTrainSeats() {
	const leftSide = document.querySelector('.left-side');
	const rightSide = document.querySelector('.right-side');

	// const

	const numOfSeats = structureOfTrain.numOfSeats;

	const numOfSeatsPerSide = numOfSeats / 2;
	var helperNumber = 1;

	// if ()

	var leftSideChildren = createSideOf2(
		leftSide,
		numOfSeatsPerSide,
		helperNumber
	);
	var rightSideChildren = createSideOf2(
		rightSide,
		numOfSeatsPerSide,
		numOfSeatsPerSide + 1
	);

	// leftSide.appendChild(leftSideChildren);
}

function hasClass(element, className) {
	return element.className.indexOf(className) > -1;
}

function createSeat(i, j, typeOfCart, isFree) {
	let liSeat = document.createElement('li');
	liSeat.classList.add('seat');
	liSeat.classList.add('seat--' + typeOfCart);
	if (isFree) {
		liSeat.classList.add('seat--free');
		return liSeat;
	}

	let checkboxSeat = document.createElement('input');
	checkboxSeat.type = 'checkbox';
	checkboxSeat.id = 'check-seat-' + typeOfCart + '-' + i + '' + j;

	let randomNumber = Math.floor(Math.random() * Math.floor(2));
	randomNumber == 1 ? checkboxSeat.setAttribute('disabled', '') : '';

	let labelSeat = document.createElement('label');
	// labelSeat.classList.add('seat');
	// labelSeat.classList.add('seat--food');
	labelSeat.setAttribute('for', 'check-seat-' + typeOfCart + '-' + i + j);

	var spanTextElement = document.createElement('span');
	spanTextElement.classList.add('seat__text');

	if (typeOfCart != 'bed-RRTS') {
		if (typeOfCart === 'bed' || typeOfCart === 'sit') {
			spanTextElement.classList.add(
				'seat__text--' + (j % 2 != 0 ? 'right' : 'left')
			);
		} else {
			spanTextElement.classList.add(
				'seat__text--' + (j % 2 === 0 ? 'right' : 'left')
			);
		}
	} else {
		spanTextElement.classList.add('seat__text--left');
	}

	spanTextElement.innerText = i + '' + j;

	var svgns = 'http://www.w3.org/2000/svg';
	var xlinkns = 'http://www.w3.org/1999/xlink';

	let svgSeat = document.createElementNS(svgns, 'svg');
	svgSeat.classList.add('seat__icon');
	if (typeOfCart != 'bed-RRTS') {
		if (typeOfCart === 'bed' || typeOfCart === 'sit') {
			svgSeat.classList.add(
				'seat__icon--' + (j % 2 != 0 ? 'right' : 'left')
			);
		} else {
			svgSeat.classList.add(
				'seat__icon--' + (j % 2 === 0 ? 'right' : 'left')
			);
		}
	} else {
		svgSeat.classList.add('seat__icon--' + 'left');
	}

	let useDefault = document.createElementNS(svgns, 'use');
	useDefault.setAttributeNS(
		xlinkns,
		'href',
		// 'assets/vendor/sprite.svg#toilet-top-used-default'
		'assets/vendor/sprite-seat.svg#seat-3'
	);

	let useFree = document.createElementNS(svgns, 'use');
	useFree.setAttributeNS(
		xlinkns,
		'href',
		// 'assets/vendor/sprite.svg#toilet-top-used-free'
		'assets/vendor/sprite-seat.svg#seat-3-free'
	);
	useFree.classList.add('free');

	let useChosen = document.createElementNS(svgns, 'use');
	useChosen.setAttributeNS(
		xlinkns,
		'href',
		// 'assets/vendor/sprite.svg#toilet-top-used-chosen'
		'assets/vendor/sprite-seat.svg#seat-3-chosen'
	);
	useChosen.classList.add('chosen');

	/* let textSvg = document.createElementNS(svgns, 'text');

	if (i >= 10 && j % 2 === 0) {
		textSvg.setAttributeNS(null, 'x', '-55%');
		textSvg.setAttributeNS(null, 'y', '60%');
	} else if (i >= 10 && j % 2 != 0) {
		textSvg.setAttributeNS(null, 'x', '52%');
		textSvg.setAttributeNS(null, 'y', '-56%');
	} else if (j % 2 === 0) {
		textSvg.setAttributeNS(null, 'x', '-50%');
		textSvg.setAttributeNS(null, 'y', '60%');
	} else {
		textSvg.setAttributeNS(null, 'x', '50%');
		textSvg.setAttributeNS(null, 'y', '-56%');
	}
	textSvg.setAttributeNS(null, 'dominant-baseline', 'middle');
	textSvg.setAttributeNS(null, 'text-anchor', 'middle');
	if (i >= 10 && j % 2 === 0) {
		textSvg.setAttributeNS(null, 'x', -50);
		textSvg.setAttributeNS(null, 'y', 40);
	} else if (i >= 10 && j % 2 != 0) {
		textSvg.setAttributeNS(null, 'x', 27);
		textSvg.setAttributeNS(null, 'y', -30);
	} else if (j % 2 === 0) {
		textSvg.setAttributeNS(null, 'x', -46);
		textSvg.setAttributeNS(null, 'y', 40);2
	} else {
		textSvg.setAttributeNS(null, 'x', 28);
		textSvg.setAttributeNS(null, 'y', -30);
	}
	textSvg.setAttributeNS(null, 'font-family', 'Arial');
	textSvg.setAttributeNS(null, 'font-size', '90%');
	textSvg.setAttributeNS(null, 'fill', '#000');

	var textNode = document.createTextNode(i + '' + j);
	textSvg.appendChild(textNode); */

	if (randomNumber == 1) {
		svgSeat.appendChild(useDefault);
	} else {
		svgSeat.appendChild(useFree);
		svgSeat.appendChild(useChosen);
	}

	// svgSeat.appendChild(textSvg);

	labelSeat.appendChild(spanTextElement);
	labelSeat.appendChild(svgSeat);

	liSeat.appendChild(checkboxSeat);
	liSeat.appendChild(labelSeat);

	return liSeat;
}

window.onload = () => {
	var cartCurrentlyShown = document.querySelector('.cart--shown');

	console.log(cartCurrentlyShown);

	document
		.querySelector('#' + cartCurrentlyShown.id + '--button')
		.setAttribute('disabled', '');

	console.log('Hello!');

	const cartFood = document.querySelector('#cart-1');

	// console.log(cartFood);

	for (let i = 1; i <= 11; i += 2) {
		let olSeatsTop = document.createElement('ol');
		olSeatsTop.classList.add('cart__section');
		olSeatsTop.classList.add('cart__section--seats');
		olSeatsTop.classList.add('cart__section--seats-top');

		for (let j = 1; j <= 4; j++) {
			olSeatsTop.appendChild(createSeat(i, j, 'food'));
		}
		cartFood.appendChild(olSeatsTop);
	}

	const divHallway = document.createElement('div');
	divHallway.classList.add('cart__section');
	divHallway.classList.add('cart__section--hallway');

	const spanHallway = document.createElement('span');
	spanHallway.innerText = 'Chodba';

	divHallway.appendChild(spanHallway);

	cartFood.appendChild(divHallway);

	const divHallway2 = divHallway.cloneNode(true);
	cartFood.appendChild(divHallway2);

	for (let i = 2; i <= 12; i += 2) {
		let olSeatsBottom = document.createElement('ol');
		olSeatsBottom.classList.add('cart__section');
		olSeatsBottom.classList.add('cart__section--seats');
		olSeatsBottom.classList.add('cart__section--seats-bottom');

		for (let j = 1; j <= 4; j++) {
			olSeatsBottom.appendChild(createSeat(i, j, 'food', false));
		}
		cartFood.appendChild(olSeatsBottom);
	}

	const cartSit = document.querySelector('#cart-2');

	// console.log(cartSit);

	for (let i = 2; i <= 9; i++) {
		let olSeatsTop = document.createElement('ol');
		olSeatsTop.classList.add('cart__section');
		olSeatsTop.classList.add('cart__section--seats');
		olSeatsTop.classList.add('cart__section--seats-top');

		for (let j = 8; j >= 1; j -= 2) {
			olSeatsTop.appendChild(createSeat(i, j, 'sit', false));
			j -= 1;
			olSeatsTop.appendChild(createSeat(i, j, 'sit', false));

			j++;
		}
		cartSit.appendChild(olSeatsTop);
	}

	const divHallway3 = divHallway.cloneNode(true);
	cartSit.appendChild(divHallway3);
	const divHallway4 = divHallway.cloneNode(true);
	cartSit.appendChild(divHallway4);

	const cartBed = document.querySelector('#cart-3');

	// console.log(cartBed);

	for (let i = 2; i <= 9; i++) {
		let olSeatsTop = document.createElement('ol');
		olSeatsTop.classList.add('cart__section');
		olSeatsTop.classList.add('cart__section--seats');
		olSeatsTop.classList.add('cart__section--seats-top');

		for (let j = 6; j >= 1; j -= 2) {
			olSeatsTop.appendChild(createSeat(i, j, 'bed', false));
			j -= 1;
			olSeatsTop.appendChild(createSeat(i, j, 'bed', false));

			j++;
		}
		cartBed.appendChild(olSeatsTop);
	}

	const divHallway5 = divHallway.cloneNode(true);
	cartBed.appendChild(divHallway5);
	const divHallway6 = divHallway.cloneNode(true);
	cartBed.appendChild(divHallway6);

	const cartBedRRTS = document.querySelector('#cart-4');

	// console.log(cartBedRRTS);

	for (let i = 2; i <= 9; i++) {
		let olSeatsTop = document.createElement('ol');
		olSeatsTop.classList.add('cart__section');
		olSeatsTop.classList.add('cart__section--seats');
		olSeatsTop.classList.add('cart__section--seats-top');

		for (let j = 5; j >= 1; j -= 2) {
			olSeatsTop.appendChild(createSeat(i, j, 'bed_RRTS', false));
			j -= 1;
			olSeatsTop.appendChild(createSeat(i, j, 'bed_RRTS', true));

			j++;
		}
		cartBedRRTS.appendChild(olSeatsTop);
	}

	const divHallway7 = divHallway.cloneNode(true);
	cartBedRRTS.appendChild(divHallway7);
	const divHallway8 = divHallway.cloneNode(true);
	cartBedRRTS.appendChild(divHallway8);

	const cartButtons = document.querySelectorAll('.btn--cart');

	console.log(cartButtons);

	cartButtons.forEach(cartButton =>
		cartButton.addEventListener('click', () => {
			let id = cartButton.dataset.id;
			let type = cartButton.dataset.type;

			console.log('clicked ' + cartButton.id);
			console.log(`id: ${id}`);
			console.log(`type: ${type}`);

			let cartToShow = document.querySelector('#cart-' + id);

			console.log(`cartToShow: ${cartToShow}`);

			cartCurrentlyShown.classList.remove('cart--shown');
			cartToShow.classList.add('cart--shown');

			document
				.querySelector('#' + cartCurrentlyShown.id + '--button')
				.removeAttribute('disabled');
			document
				.querySelector('#' + cartToShow.id + '--button')
				.setAttribute('disabled', '');

			cartCurrentlyShown = cartToShow;
		})
	);

	const carts = [
		{
			id: 1,
			type: 'food'
		},
		{
			id: 2,
			type: 'sit'
		},
		{
			id: 3,
			type: 'bed'
		},
		{
			id: 4,
			type: 'bed_RRTS'
		}
	];
	// console.log(carts);

	const allSeats = document.querySelectorAll('input[type=checkbox]');
	// console.log(allSeats);

	var chosenSeats = new Array();

	allSeats.forEach(seat =>
		seat.addEventListener('change', e => {
			console.log(seat);
			// console.log(e);
			console.log(e.target.checked);

			let type = seat.id.split('-')[2];
			let id = seat.id;
			let seatNumber = seat.id.split('-')[3];
			console.log(type);
			console.log(id);

			let chosen = carts.find(cart => cart.type === type);
			console.log(chosen);

			var chosenSeat = {
				cartId: parseInt(chosen.id),
				cartType: chosen.type,
				seatId: id,
				seatNumber: parseInt(seatNumber),
				seatState: e.target.checked
			};

			console.log(chosenSeat);

			var allowed = parseInt(
				document.querySelector('.chosen-seats__count--all').innerText,
				10
			);
			!chosenSeats.allowed ? (chosenSeats.allowed = allowed) : '';
			console.log(allowed);

			if (chosenSeat.seatState === true) {
				if (!chosenSeats.order) {
					chosenSeats.order = new Array();
				}
				chosenSeats.order.push(
					chosenSeat.cartId + '-' + chosenSeat.seatNumber
				);
			} else {
			}

			if (chosenSeat.seatState === true) {
				chosenSeats.total
					? chosenSeats.total++
					: (chosenSeats.total = 1);
			} else {
				chosenSeats.total--;
			}

			if (chosenSeats.total == allowed) {
				console.log('Everything is fine!');
			}

			chosenSeats = updateChosenSeats(chosenSeats, chosenSeat);

			if (chosenSeats.total == 0) {
				console.log('NULAAAAA!');

				var chosenTrainContainer = document.querySelector(
					'.chosen-seats__trains'
				);
				// chosenTrainContainer.innerHTML = '';

				console.log(chosenTrainContainer);
				chosenTrainContainer.appendChild(createSkeletonChosenSeats());
				console.log(chosenTrainContainer);
			}

			console.table(chosenSeats);
		})
	);

	// showTrainSeats();
};

function createSkeletonChosenSeats() {
	var trainBox = document.createElement('div');
	trainBox.classList.add('chosen-seats__train-box');
	trainBox.classList.add('chosen-seats__train-box--skeleton');

	var svgns = 'http://www.w3.org/2000/svg';
	var xlinkns = 'http://www.w3.org/1999/xlink';

	let svgWagon = document.createElementNS(svgns, 'svg');
	svgWagon.classList.add('chosen-seats__icon');
	svgWagon.classList.add('chosen-seats__icon--wagon');

	let useWagon = document.createElementNS(svgns, 'use');
	useWagon.setAttributeNS(xlinkns, 'href', 'assets/vendor/sprite.svg#wagon');

	let trainBoxWagonText = document.createElement('p');
	trainBoxWagonText.classList.add('chosen-seats__box-text');
	trainBoxWagonText.classList.add('chosen-seats__box-text--wagon');
	trainBoxWagonText.innerText = 1;

	let trainBoxSeatText = document.createElement('p');
	trainBoxSeatText.classList.add('chosen-seats__box-text');
	// trainBoxSeatText.classList.add('chosen-seats__box-text--seat');

	// console.log(cart.seats);

	svgWagon.appendChild(useWagon);

	let svgSeat = document.createElementNS(svgns, 'svg');
	svgSeat.classList.add('chosen-seats__icon');
	svgSeat.classList.add('chosen-seats__icon--seat');

	let useSeat = document.createElementNS(svgns, 'use');
	useSeat.setAttributeNS(
		xlinkns,
		'href',
		'assets/vendor/sprite-seat.svg#seat-3-edited'
	);

	svgSeat.appendChild(useSeat);

	let cartSeats = [99];

	let i = 0;
	cartSeats.forEach(seat => {
		trainBoxSeatText.innerText +=
			i === 0 ? cartSeats[i] : ', ' + cartSeats[i];
		i++;
	});

	trainBox.appendChild(svgWagon);
	trainBox.appendChild(trainBoxWagonText);
	trainBox.appendChild(svgSeat);
	trainBox.appendChild(trainBoxSeatText);

	console.log(trainBox);

	return trainBox;
}

function updateChosenSeats(chosenSeats, chosenSeat) {
	console.table(chosenSeats);
	// console.log(chosenSeat);

	let total = chosenSeats.total;

	// console.log(chosenSeats.some(cart => cart.cartId === chosenSeat.cartId));

	if (chosenSeat.seatState === true) {
		if (total > chosenSeats.allowed) {
			console.warn('Gone Overload!');

			var seatToDelete = chosenSeats.order[0];

			seatToDelete = seatToDelete.split('-');
			seatToDelete.cartId = parseInt(seatToDelete.shift());
			seatToDelete.seatNumber = parseInt(seatToDelete.shift());
			console.group('Deleting seat:');
			console.log(seatToDelete);

			let foundIndex = chosenSeats.findIndex(
				cart => cart.cartId === seatToDelete.cartId
			);

			console.log(`Found Index of Cart: ${foundIndex}`);

			let stringElementId =
				'#check-seat-' +
				chosenSeats[foundIndex].cartType +
				'-' +
				seatToDelete.seatNumber;

			var foundIndexSeat;

			if (chosenSeats[foundIndex].seats.length === 1) {
				chosenSeats.splice(foundIndex, 1);
			} else {
				foundIndexSeat = chosenSeats[foundIndex].seats.findIndex(
					seat => seat.seatNumber === seatToDelete.seatNumber
				);
				console.log(`Found Index of Seats: ${foundIndexSeat}`);

				foundIndexSeat != -1
					? chosenSeats[foundIndex].seats.splice(foundIndexSeat, 1)
					: '';
			}

			console.group('Element:');
			console.log(`Element ID: ${stringElementId}`);

			console.log(document.querySelector(stringElementId));
			console.groupEnd('Element:');
			console.groupEnd('Deleting seat:');

			document.querySelector(stringElementId).checked = false;

			chosenSeats.order.shift();
			total--;
		}
		if (chosenSeats.some(cart => cart.cartId === chosenSeat.cartId)) {
			let foundIndex = chosenSeats.findIndex(
				cart => cart.cartId === chosenSeat.cartId
			);
			// console.log(foundIndex);

			chosenSeats[foundIndex].seats.push({
				seatNumber: chosenSeat.seatNumber
			});
			chosenSeats[foundIndex].seats.sort((a, b) =>
				a.seatNumber > b.seatNumber ? 1 : -1
			);
		} else {
			chosenSeats.push({
				cartId: chosenSeat.cartId,
				cartType: chosenSeat.cartType,
				seats: [{ seatNumber: chosenSeat.seatNumber }]
			});
		}
	} else {
		let foundIndex = chosenSeats.findIndex(
			cart => cart.cartId === chosenSeat.cartId
		);
		// console.log(foundIndex);

		if (chosenSeats[foundIndex].seats.length === 1) {
			chosenSeats.splice(foundIndex, 1);
		} else {
			let foundIndexSeat = chosenSeats[foundIndex].seats.findIndex(
				seat => seat.seatNumber === chosenSeat.seatNumber
			);
			console.log(foundIndexSeat);

			foundIndexSeat != -1
				? chosenSeats[foundIndex].seats.splice(foundIndexSeat, 1)
				: '';
		}
	}

	chosenSeats.sort((a, b) => (a.cartId > b.cartId ? 1 : -1));

	// console.log(chosenSeats);

	var chosenTrainContainer = document.querySelector('.chosen-seats__trains');
	chosenTrainContainer.innerHTML = '';

	// console.log(chosenTrainContainer);

	chosenSeats.forEach(cart => {
		let trainBox = document.createElement('div');
		trainBox.classList.add('chosen-seats__train-box');

		var svgns = 'http://www.w3.org/2000/svg';
		var xlinkns = 'http://www.w3.org/1999/xlink';

		let svgWagon = document.createElementNS(svgns, 'svg');
		svgWagon.classList.add('chosen-seats__icon');
		svgWagon.classList.add('chosen-seats__icon--wagon');

		let useWagon = document.createElementNS(svgns, 'use');
		useWagon.setAttributeNS(
			xlinkns,
			'href',
			'assets/vendor/sprite.svg#wagon'
		);

		let trainBoxWagonText = document.createElement('p');
		trainBoxWagonText.classList.add('chosen-seats__box-text');
		trainBoxWagonText.classList.add('chosen-seats__box-text--wagon');
		trainBoxWagonText.innerText = cart.cartId;

		let trainBoxSeatText = document.createElement('p');
		trainBoxSeatText.classList.add('chosen-seats__box-text');
		// trainBoxSeatText.classList.add('chosen-seats__box-text--seat');

		// console.log(cart.seats);

		svgWagon.appendChild(useWagon);

		let svgSeat = document.createElementNS(svgns, 'svg');
		svgSeat.classList.add('chosen-seats__icon');
		svgSeat.classList.add('chosen-seats__icon--seat');

		let useSeat = document.createElementNS(svgns, 'use');
		useSeat.setAttributeNS(
			xlinkns,
			'href',
			'assets/vendor/sprite-seat.svg#seat-3-edited'
		);

		svgSeat.appendChild(useSeat);

		let i = 0;
		cart.seats.forEach(seat => {
			trainBoxSeatText.innerText +=
				i === 0 ? seat.seatNumber : ', ' + seat.seatNumber;
			i++;
		});

		trainBox.appendChild(svgWagon);
		trainBox.appendChild(trainBoxWagonText);
		trainBox.appendChild(svgSeat);
		trainBox.appendChild(trainBoxSeatText);

		// console.log(trainBox);

		chosenTrainContainer.appendChild(trainBox);
	});

	chosenSeats.total = total;

	var totalElement = document.querySelector('.chosen-seats__count--chosen');
	totalElement.innerText = total;

	return chosenSeats;
}
