(function($) {
	'use strict';

	// pokud je už načtené jquery
	jQuery(document).ready(function($) {
		var CZLanguage = $('.language_cs a').attr('href');

		var ENLanguage = $('.language_en a').attr('href');

		var getUrlParameter = function getUrlParameter(sParam) {
			var sPageURL = decodeURIComponent(
					window.location.search.substring(1)
				),
				sURLVariables = sPageURL.split('&'),
				sParameterName,
				i;

			for (i = 0; i < sURLVariables.length; i++) {
				sParameterName = sURLVariables[i].split('=');

				if (sParameterName[0] === sParam) {
					return sParameterName[1] === undefined
						? true
						: sParameterName[1];
				}
			}
		};

		var datum = getUrlParameter('datum');
		var cas = getUrlParameter('cas');

		if (datum) {
			CZLanguage += '?datum=' + datum;
			ENLanguage += '&datum=' + datum;

			$('.language_cs a').attr('href', CZLanguage);
			$('.language_en a').attr('href', ENLanguage);

			if (cas) {
				CZLanguage += '&cas=' + cas;
				ENLanguage += '&cas=' + cas;

				$('.language_cs a').attr('href', CZLanguage);
				$('.language_en a').attr('href', ENLanguage);
			}
		}

		var mediumToggledBefore = false;

		var smallPhotoPrice = $('#inputPrice10x15').val()
			? parseInt($('#inputPrice10x15').val(), 10)
			: 55;
		var bigPhotoPrice = $('#inputPriceA4').val()
			? parseInt($('#inputPriceA4').val(), 10)
			: 110;
		var biggerPhotoPrice = $('#inputPriceA3').val()
			? parseInt($('#inputPriceA3').val(), 10)
			: 230;
		var USBPrice = $('#inputPriceUSB').val()
			? parseInt($('#inputPriceUSB').val(), 10)
			: 195;
		var DVDPrice = $('#inputPriceDVD').val()
			? parseInt($('#inputPriceDVD').val(), 10)
			: 155;

		function isEmail(email) {
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return regex.test(email);
		}

		function updateElements(totalPrice) {
			$('#totalPriceInput').val(totalPrice);

			$('#totalPriceSpan').text(totalPrice);
		}

		function addToPrice(price) {
			var totalPrice = parseInt($('#totalPriceSpan').text(), 10);
			totalPrice += price;

			updateElements(totalPrice);
		}

		function substractFromPrice(price) {
			var totalPrice = parseInt($('#totalPriceSpan').text(), 10);

			totalPrice -= price;

			updateElements(totalPrice);
		}

		// Code for 10x15 (small) photo format

		$('.checkbox_photo_small').change(function() {
			var countPhotoInput = $(
				'#count' +
					this.id.replace(/\b[a-z]/g, function(letter) {
						return letter.toUpperCase();
					})
			);
			var countPhotoInputValue = parseInt(countPhotoInput.val(), 10);
			if (this.checked) {
				addToPrice(smallPhotoPrice * countPhotoInputValue);
				$('.pocet_' + this.id).show();

				countPhotoInput.attr('old-value', countPhotoInputValue);
			} else if (!this.checked) {
				substractFromPrice(smallPhotoPrice * countPhotoInputValue);
				console.log('Hiding element');
				$('.pocet_' + this.id).hide();
			}
		});

		$('.count_photo_small').on('change input', function() {
			var actualValue = parseInt($(this).val(), 10);
			var oldValue = parseInt($(this).attr('old-value'), 10);
			var difference;

			if (actualValue) {
				if (oldValue < actualValue) {
					difference = actualValue - oldValue;

					addToPrice(smallPhotoPrice * difference);
				} else if (
					parseInt($(this).attr('old-value'), 10) >
					parseInt($(this).val(), 10)
				) {
					difference = oldValue - actualValue;

					substractFromPrice(smallPhotoPrice * difference);
				}
				$(this).attr('old-value', $(this).val());
			}
		});

		// Code for A4 (big) photo format

		$('.checkbox_photo_big').change(function() {
			var countPhotoInput = $(
				'#count' +
					this.id.replace(/\b[a-z]/g, function(letter) {
						return letter.toUpperCase();
					})
			);
			var countPhotoInputValue = parseInt(countPhotoInput.val(), 10);
			if (this.checked) {
				addToPrice(bigPhotoPrice * countPhotoInputValue);
				$('.pocet_' + this.id).show();
				countPhotoInput.attr('old-value', countPhotoInputValue);
			} else if (!this.checked) {
				substractFromPrice(bigPhotoPrice * countPhotoInputValue);
				$('.pocet_' + this.id).hide();
			}
		});

		$('.count_photo_big').on('change input', function() {
			var actualValue = parseInt($(this).val(), 10);
			var oldValue = parseInt($(this).attr('old-value'), 10);
			var difference;

			if (actualValue) {
				if (oldValue < actualValue) {
					difference = actualValue - oldValue;

					addToPrice(bigPhotoPrice * difference);
				} else if (
					parseInt($(this).attr('old-value'), 10) >
					parseInt($(this).val(), 10)
				) {
					difference = oldValue - actualValue;

					substractFromPrice(bigPhotoPrice * difference);
				}
				$(this).attr('old-value', $(this).val());
			}
		});

		// Code for A3 (bigger) photo format

		$('.checkbox_photo_bigger').change(function() {
			var countPhotoInput = $(
				'#count' +
					this.id.replace(/\b[a-z]/g, function(letter) {
						return letter.toUpperCase();
					})
			);
			var countPhotoInputValue = parseInt(countPhotoInput.val(), 10);
			if (this.checked) {
				addToPrice(biggerPhotoPrice * countPhotoInputValue);
				$('.pocet_' + this.id).show();
				countPhotoInput.attr('old-value', countPhotoInputValue);
			} else if (!this.checked) {
				substractFromPrice(biggerPhotoPrice * countPhotoInputValue);
				$('.pocet_' + this.id).hide();
			}
		});

		$('.count_photo_bigger').on('change input', function() {
			var actualValue = parseInt($(this).val(), 10);
			var oldValue = parseInt($(this).attr('old-value'), 10);
			var difference;

			if (actualValue) {
				if (oldValue < actualValue) {
					difference = actualValue - oldValue;

					addToPrice(biggerPhotoPrice * difference);
				} else if (
					parseInt($(this).attr('old-value'), 10) >
					parseInt($(this).val(), 10)
				) {
					difference = oldValue - actualValue;

					substractFromPrice(biggerPhotoPrice * difference);
				}
				$(this).attr('old-value', $(this).val());
			}
		});

		$('input[type=radio][name=nosicToggle]').change(function() {
			if (this.value == 'dvd') {
				if (mediumToggledBefore == true) {
					substractFromPrice(USBPrice);
				}
				addToPrice(DVDPrice);
				mediumToggledBefore = true;
			} else if (this.value == 'usb') {
				if (mediumToggledBefore == true) {
					substractFromPrice(DVDPrice);
				}
				addToPrice(USBPrice);
				mediumToggledBefore = true;
			}
		});

		// odeslání formuláře
		$('#odeslatObjednavku').click(function(event) {
			event.preventDefault();
			// zjistíme, zda máme vyplněné vše calc_e-mail
			var objednavka = $('form').serialize();

			console.log(isEmail($('#emailInput').val()));

			console.log(objednavka);

			if (
				$('#formGallery input:checkbox:checked').length > 0 &&
				$('#nameInput').val() != '' &&
				isEmail($('#emailInput').val()) == true &&
				$('#gdprInput').is(':checked') &&
				($('#switch_left').is(':checked') ||
					$('#switch_right').is(':checked')) &&
				$('#childNameInput').val() != ''
			) {
				console.log(objednavka);

				$.ajax({
					url:
						'/wp-content/plugins/foto-shop/admin/partials/foto-shop-send-inquiry.php',
					data: { objednavka: objednavka },
					type: 'post',
					success: function(result) {
						$('#odeslatObjednavku').val('✓ Objednávka odeslána');
						$('#odeslatObjednavku').prop('disabled', true);
						$('#odeslatObjednavku').css(
							'background-color',
							'#fcfcfc'
						);
						$('#odeslatObjednavku').css('color', '#666666');
						$('#odeslatObjednavku').css('border-color', '#fcfcfc');
						$('#odeslatObjednavku').css('cursor', 'not-allowed');
						// console.log("Disabling button1");

						setTimeout(function() {
							//   console.log("Enabling button1");
							$('#odeslatObjednavku').prop('disabled', false);
							$('#odeslatObjednavku').val('Objednat');
							$('#odeslatObjednavku').removeAttr('style');
						}, 3000000);
					}
				});
			} else {
				if ($('#formGallery input:checkbox:checked').length < 1) {
					alert('Vyberte alespoň jednu fotografii');
				} else if ($('#nameInput').val() == '') {
					alert('Vyplňte, prosím Vaše jméno a přijmení.');
				} else if ($('#emailInput').val() == '') {
					alert('Vyplňte, prosím Váš e-mail.');
				} else if (isEmail($('#emailInput').val()) == false) {
					alert('Zkontrolujte, prosím Váš e-mail.');
				} else if (
					!$('#switch_left').is(':checked') &&
					!$('#switch_right').is(':checked')
				) {
					alert('Je nutné vybrat jeden z nosičů.');
				} else if ($('#childNameInput').val() == '') {
					alert(
						'Vyplňte, prosím jméno Vašeho dítěte pro zvyraznění na nosič.'
					);
				} else if (!$('#gdprInput').is(':checked')) {
					alert(
						'Je nutné souhlasit se zpracováním osobních údajů - GDPR.'
					);
				} else {
					alert(
						'Něco se pokazilo. Zkontrolujte, prosím všechny zadané hodnoty.'
					);
				}
				$('#odeslatObjednavku').prop('disabled', false);
				$('#odeslatObjednavku').val('Objednat');
				$('#odeslatObjednavku').removeAttr('style');
			}
		});
	});
})(jQuery);
