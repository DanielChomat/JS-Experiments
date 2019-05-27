(function($) {
  "use strict";

  /**
   * All of the code for your public-facing JavaScript source
   * should reside in this file.
   *
   * Note: It has been assumed you will write jQuery code here, so the
   * $ function reference has been prepared for usage within the scope
   * of this function.
   *
   * This enables you to define handlers, for when the DOM is ready:
   *
   * $(function() {
   *
   * });
   *
   * When the window is loaded:
   *
   * $( window ).load(function() {
   *
   * });
   *
   * ...and/or other possibilities.
   *
   * Ideally, it is not considered best practise to attach more than a
   * single DOM-ready or window-load handler for a particular page.
   * Although scripts in the WordPress core, Plugins and Themes may be
   * practising this, we should strive to set a better example in our own work.
   */

  // pokud je už načtené jquery
  jQuery(document).ready(function($) {

    var CZLanguage = $('.language_cs a').attr('href');

    var ENLanguage = $('.language_en a').attr('href');

    var getUrlParameter = function getUrlParameter(sParam) {
      var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

      for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : sParameterName[1];
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

    var smallPhotoPrice = ( $('#inputPrice10x15').val() ? parseInt($('#inputPrice10x15').val(), 10) : 55 );
    var bigPhotoPrice = ( $('#inputPriceA4').val() ? parseInt($('#inputPriceA4').val(), 10) : 110 );
    var biggerPhotoPrice = ( $('#inputPriceA3').val() ? parseInt($('#inputPriceA3').val(), 10) : 230 );
    var USBPrice = ( $('#inputPriceUSB').val() ? parseInt($('#inputPriceUSB').val(), 10) : 195 );
    var DVDPrice = ( $('#inputPriceDVD').val() ? parseInt($('#inputPriceDVD').val(), 10) : 155 );

    function isEmail(email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
    }

    function updateElements(totalPrice) {
      $("#totalPriceInput").val(totalPrice);

      $("#totalPriceSpan").text(totalPrice);
    }

    function addToPrice(price) {
      var totalPrice = parseInt($("#totalPriceSpan").text(), 10);
      totalPrice += price;

      updateElements(totalPrice);

      // console.log("Added " + totalPrice + " to the total price");

    }

    function substractFromPrice(price) {
      var totalPrice = parseInt($("#totalPriceSpan").text(), 10);

      totalPrice -= price;
      
      updateElements(totalPrice);

      // console.log("Substracted " + totalPrice + " from the total price");

    }

    // Code for 10x15 (small) photo format

    $(".checkbox_photo_small").change(function() {
      // console.log("Checked small photo");
      var countPhotoInput = $("#count" + this.id.replace(/\b[a-z]/g, function(letter) { return letter.toUpperCase(); }));
      var countPhotoInputValue = parseInt(countPhotoInput.val(), 10);
      if(this.checked) {
        addToPrice(smallPhotoPrice * countPhotoInputValue);
          $(".pocet_" + this.id).show();

          countPhotoInput.attr('old-value', countPhotoInputValue);

      } else if (!this.checked) {
        // console.log("Substractin: " + countPhotoInputValue);
        substractFromPrice(smallPhotoPrice * countPhotoInputValue);
        console.log("Hiding element");
          $(".pocet_"+this.id).hide();
      }
    });

    $(".count_photo_small").on('change input',function() {
      // console.log("Updating count of photos");
      // console.log($(this).attr('old-value'));
      var actualValue = parseInt($(this).val(), 10);
      var oldValue = parseInt($(this).attr('old-value'), 10);
      var difference;
      // console.log("actualValue: " + actualValue);
      // console.log("oldValue: " + oldValue);

      if (actualValue) {
        // console.log("----Neco tam je!!");

        if (oldValue < actualValue) {
          // console.log('Alert up');

          // console.log("Rozdil: " + (actualValue - oldValue));

          difference = actualValue - oldValue;

          addToPrice(smallPhotoPrice * difference);

        } else if (parseInt($(this).attr('old-value'), 10) == parseInt($(this).val(), 10)) {
            // console.log('Alert equal');
        } else if (parseInt($(this).attr('old-value'), 10) > parseInt($(this).val(), 10)) {
            // console.log('Alert down');

            // console.log("Rozdil: " + (actualValue - oldValue));

            difference = oldValue - actualValue;

            substractFromPrice(smallPhotoPrice * difference);

        }
        $(this).attr('old-value', $(this).val());

      } else {
        // console.log("////Nic tam neni!!");
      }
    });

    // Code for A4 (big) photo format

    $(".checkbox_photo_big").change(function() {
      // console.log("Checked big photo");
      var countPhotoInput = $("#count" + this.id.replace(/\b[a-z]/g, function(letter) { return letter.toUpperCase(); }));
      var countPhotoInputValue = parseInt(countPhotoInput.val(), 10);
      if(this.checked) {
        addToPrice(bigPhotoPrice * countPhotoInputValue);
        $(".pocet_"+this.id).show();
        countPhotoInput.attr('old-value', countPhotoInputValue);
      } else if (!this.checked) {
        substractFromPrice(bigPhotoPrice * countPhotoInputValue)
        $(".pocet_"+this.id).hide();
      }
    });

    $(".count_photo_big").on('change input',function() {
      // console.log("Updating count of photos");
      // console.log($(this).attr('old-value'));
      var actualValue = parseInt($(this).val(), 10);
      var oldValue = parseInt($(this).attr('old-value'), 10);
      var difference;
      // console.log("actualValue: " + actualValue);
      // console.log("oldValue: " + oldValue);

      if (actualValue) {
        // console.log("----Neco tam je!!");

        if (oldValue < actualValue) {
          // console.log('Alert up');

          // console.log("Rozdil: " + (actualValue - oldValue));

          difference = actualValue - oldValue;

          addToPrice(bigPhotoPrice * difference);

        } else if (parseInt($(this).attr('old-value'), 10) == parseInt($(this).val(), 10)) {
            // console.log('Alert equal');
        } else if (parseInt($(this).attr('old-value'), 10) > parseInt($(this).val(), 10)) {
            // console.log('Alert down');

            // console.log("Rozdil: " + (actualValue - oldValue));

            difference = oldValue - actualValue;

            substractFromPrice(bigPhotoPrice * difference);

        }
        $(this).attr('old-value', $(this).val());

      } else {
        // console.log("////Nic tam neni!!");
      }
    }); 

    // Code for A3 (bigger) photo format

    $(".checkbox_photo_bigger").change(function() {
      // console.log("Checked bigger photo");
      var countPhotoInput = $("#count" + this.id.replace(/\b[a-z]/g, function(letter) { return letter.toUpperCase(); }));
      var countPhotoInputValue = parseInt(countPhotoInput.val(), 10);
      if(this.checked) {
        addToPrice(biggerPhotoPrice * countPhotoInputValue);
        $(".pocet_"+this.id).show();
        countPhotoInput.attr('old-value', countPhotoInputValue);
      } else if (!this.checked) {
        substractFromPrice(biggerPhotoPrice * countPhotoInputValue)
        $(".pocet_"+this.id).hide();
      }
    });

    $(".count_photo_bigger").on('change input',function() {
      // console.log("Updating count of photos");
      // console.log($(this).attr('old-value'));
      var actualValue = parseInt($(this).val(), 10);
      var oldValue = parseInt($(this).attr('old-value'), 10);
      var difference;
      // console.log("actualValue: " + actualValue);
      // console.log("oldValue: " + oldValue);

      if (actualValue) {
        // console.log("----Neco tam je!!");

        if (oldValue < actualValue) {
          // console.log('Alert up');

          // console.log("Rozdil: " + (actualValue - oldValue));

          difference = actualValue - oldValue;

          addToPrice(biggerPhotoPrice * difference);

        } else if (parseInt($(this).attr('old-value'), 10) == parseInt($(this).val(), 10)) {
            // console.log('Alert equal');
        } else if (parseInt($(this).attr('old-value'), 10) > parseInt($(this).val(), 10)) {
            // console.log('Alert down');

            // console.log("Rozdil: " + (actualValue - oldValue));

            difference = oldValue - actualValue;

            substractFromPrice(biggerPhotoPrice * difference);

        }
        $(this).attr('old-value', $(this).val());

      } else {
        // console.log("////Nic tam neni!!");
      }
    }); 

    $('input[type=radio][name=nosicToggle]').change(function() {
      // console.log("Chosen medium");
      if (this.value == 'dvd') {
        // console.log("Chosen DVD medium");
        if (mediumToggledBefore == true) {
          // console.log("Already chosen USB before");
          substractFromPrice(USBPrice)
        }
        addToPrice(DVDPrice);
        mediumToggledBefore = true;
      }
      else if (this.value == 'usb') {
        // console.log("Chosen DVD medium");
        if (mediumToggledBefore == true) {
          // console.log("Already chosen DVD before");
          substractFromPrice(DVDPrice)
        }
        addToPrice(USBPrice);
        mediumToggledBefore = true;
      }
    });

    // odeslání formuláře
    $("#odeslatObjednavku").click(function(event) {
      event.preventDefault();
      // zjistíme, zda máme vyplněné vše calc_e-mail
      var objednavka = $("form").serialize();

      console.log(isEmail($("#emailInput").val()));

      console.log(objednavka);

    //   console.log($("#formGallery input:checkbox:checked").length);

      // $("#calc_rozloha").val() != '' && $("#calc_e-mail").val() != '' &&
      if (
        $("#formGallery input:checkbox:checked").length > 0 &&
        $("#nameInput").val() != '' &&
        isEmail($("#emailInput").val()) == true &&
        $("#gdprInput").is(":checked") &&
        ($("#switch_left").is(":checked") ||
          $("#switch_right").is(":checked")) &&
          $("#childNameInput").val() != '' 
        
      ) {
        console.log(objednavka);

        // dynamicky pošleme
        $.ajax({
          url:
            "/wp-content/plugins/foto-shop/admin/partials/foto-shop-send-inquiry.php",
          data: {objednavka: objednavka},
          type: "post",
          success: function(result) {
            $("#odeslatObjednavku").val("✓ Objednávka odeslána");
            $("#odeslatObjednavku").prop("disabled", true);
            $("#odeslatObjednavku").css("background-color", "#fcfcfc");
            $("#odeslatObjednavku").css("color", "#666666");
            $("#odeslatObjednavku").css("border-color", "#fcfcfc");
            $("#odeslatObjednavku").css("cursor", "not-allowed");
            // console.log("Disabling button1");

            setTimeout(function() {
              //   console.log("Enabling button1");
              $("#odeslatObjednavku").prop("disabled", false);
              $("#odeslatObjednavku").val("Objednat");
              $("#odeslatObjednavku").removeAttr("style");
            }, 3000000);
          }
        });
      } else {
        if ($("#formGallery input:checkbox:checked").length < 1) {
          alert("Vyberte alespoň jednu fotografii");
        } else if ($("#nameInput").val() == '') {
          alert("Vyplňte, prosím Vaše jméno a přijmení.");
        } else if ($("#emailInput").val() == '') {
          alert("Vyplňte, prosím Váš e-mail.");
        } else if (isEmail($("#emailInput").val()) == false) {
          alert("Zkontrolujte, prosím Váš e-mail.");
        } else if (
          !$("#switch_left").is(":checked") &&
          !$("#switch_right").is(":checked")
        ) {
          alert("Je nutné vybrat jeden z nosičů.");
        } else if ($("#childNameInput").val() == '') {
          alert("Vyplňte, prosím jméno Vašeho dítěte pro zvyraznění na nosič.");
        } else if (!$("#gdprInput").is(":checked")) {
          alert("Je nutné souhlasit se zpracováním osobních údajů - GDPR.");
        } else {
          alert("Něco se pokazilo. Zkontrolujte, prosím všechny zadané hodnoty.");
        }
        // console.log("Enabling button2");
        $("#odeslatObjednavku").prop("disabled", false);
        $("#odeslatObjednavku").val("Objednat");
        $("#odeslatObjednavku").removeAttr("style");
      }
    });
  });
})(jQuery);
