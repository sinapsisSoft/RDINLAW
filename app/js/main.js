var validateCaptcha = false;
var captcha = null; 
 
//Function captcha Google
var onloadCallback = function () {
  captcha = grecaptcha.render('html_element_captcha', {
    'sitekey': '6Le7vsgZAAAAABPbc_teliZF2pPipXXfMBLsuKpM',
    'callback': function (response) {
      validateCaptcha = true;
    },
    'theme': 'white'
  });
};

 
 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: true
 });

jQuery(document).ready(function($) {

	"use strict";

	
	$(".loader").delay(1000).fadeOut("slow");
  $("#overlayer").delay(1000).fadeOut("slow");	
  

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();


	var sitePlusMinus = function() {
		$('.js-btn-minus').on('click', function(e){
			e.preventDefault();
			if ( $(this).closest('.input-group').find('.form-control').val() != 0  ) {
				$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) - 1);
			} else {
				$(this).closest('.input-group').find('.form-control').val(parseInt(0));
			}
		});
		$('.js-btn-plus').on('click', function(e){
			e.preventDefault();
			$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) + 1);
		});
	};
	// sitePlusMinus();


	var siteSliderRange = function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	};
	// siteSliderRange();


	
	// var siteCarousel = function () {
	// 	if ( $('.nonloop-block-13').length > 0 ) {
	// 		$('.nonloop-block-13').owlCarousel({
	// 	    center: false,
	// 	    items: 1,
	// 	    loop: true,
	// 			stagePadding: 0,
	// 	    margin: 0,
	// 	    autoplay: true,
	// 	    nav: true,
	// 			navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
	// 	    responsive:{
	//         600:{
	//         	margin: 0,
	//         	nav: true,
	//           items: 2
	//         },
	//         1000:{
	//         	margin: 0,
	//         	stagePadding: 0,
	//         	nav: true,
	//           items: 3
	//         },
	//         1200:{
	//         	margin: 0,
	//         	stagePadding: 0,
	//         	nav: true,
	//           items: 4
	//         }
	// 	    }
	// 		});
	// 	}

	// 	// $('.single-text').owlCarousel({
	//   //   center: false,
	//   //   items: 1,
	//   //   loop: true,
	// 	// 	stagePadding: 0,
	//   //   margin: 0,
	//   //   autoplay: true,
	//   //   pauseOnHover: false,
	//   //   nav: false,
	//   //   smartSpeed: 1000,
	//   // });
	// 	// $('.slide-one-item').owlCarousel({
	//   //   center: false,
	//   //   items: 1,
	//   //   loop: true,
	// 	// 	stagePadding: 0,
	//   //   margin: 0,
	//   //   autoplay: true,
	//   //   smartSpeed: 1000,
	//   //   pauseOnHover: false,
	//   //   nav: true,
	//   //   navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
	//   // });

	  

	//   // $('.slide-one-item-alt').owlCarousel({
	//   //   center: false,
	//   //   items: 1,
	//   //   loop: true,
	// 	// 	stagePadding: 0,
	//   //   margin: 0,
	//   //   smartSpeed: 1000,
	//   //   autoplay: true,
	//   //   pauseOnHover: true,
	//   //   mouseDrag: false,
	//   //   touchDrag: false,
	//   // });
	//   // $('.slide-one-item-alt-text').owlCarousel({
	//   //   center: false,
	//   //   items: 1,
	//   //   loop: true,
	// 	// 	stagePadding: 0,
	//   //   margin: 0,
	//   //   smartSpeed: 1000,
	//   //   autoplay: true,
	//   //   pauseOnHover: true,
	//   //   mouseDrag: false,
	//   //   touchDrag: false,
	    
	//   // });
	  

	//   $('.custom-next').click(function(e) {
	//   	e.preventDefault();
	//   	$('.slide-one-item-alt').trigger('next.owl.carousel');
	//   	$('.slide-one-item-alt-text').trigger('next.owl.carousel');
	//   });
	//   $('.custom-prev').click(function(e) {
	//   	e.preventDefault();
	//   	$('.slide-one-item-alt').trigger('prev.owl.carousel');
	//   	$('.slide-one-item-alt-text').trigger('prev.owl.carousel');
	//   });
	  
	// };
	// siteCarousel();

	var siteStellar = function() {
		$(window).stellar({
	    responsive: false,
	    parallaxBackgrounds: true,
	    parallaxElements: true,
	    horizontalScrolling: false,
	    hideDistantElements: false,
	    scrollProperty: 'scroll'
	  });
	};
	// siteStellar();

	var siteCountDown = function() {

		// $('#date-countdown').countdown('2020/10/10', function(event) {
		//   var $this = $(this).html(event.strftime(''
		//     + '<span class="countdown-block"><span class="label">%w</span> weeks </span>'
		//     + '<span class="countdown-block"><span class="label">%d</span> days </span>'
		//     + '<span class="countdown-block"><span class="label">%H</span> hr </span>'
		//     + '<span class="countdown-block"><span class="label">%M</span> min </span>'
		//     + '<span class="countdown-block"><span class="label">%S</span> sec</span>'));
		// });
				
	};
	siteCountDown();

	var siteDatePicker = function() {

		if ( $('.datepicker').length > 0 ) {
			$('.datepicker').datepicker();
		}

	};
	siteDatePicker();

	// var siteSticky = function() {
	// 	$(".js-sticky-header").sticky({topSpacing:0});
	// };
	// siteSticky();

	// navigation
  var OnePageNavigation = function() {
    var navToggler = $('.site-menu-toggle');
   	$("body").on("click", ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .nav-link", function(e) {
      e.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        'scrollTop': $(hash).offset().top
      }, 600, 'easeInOutExpo', function(){
        window.location.hash = hash;
      });

    });
  };
  OnePageNavigation();

  // var siteScroll = function() {

  	

  // 	$(window).scroll(function() {

  // 		var st = $(this).scrollTop();

  // 		if (st > 100) {
  // 			$('.js-sticky-header').addClass('shrink');
  // 		} else {
  // 			$('.js-sticky-header').removeClass('shrink');
  // 		}

  // 	}) 

  // };
  // siteScroll();


  // var siteIstotope = function() {
  // 	/* activate jquery isotope */
	//   var $container = $('#posts').isotope({
	//     itemSelector : '.item',
	//     isFitWidth: true
	//   });

	//   $(window).resize(function(){
	//     $container.isotope({
	//       columnWidth: '.col-sm-3'
	//     });
	//   });
	  
	//   $container.isotope({ filter: '*' });

  // }

  // siteIstotope();

  $('.fancybox').on('click', function() {
	  var visibleLinks = $('.fancybox');
	  $.fancybox.open( visibleLinks, {}, visibleLinks.index( this ) );
	  return false;
	});

});

// Back to top button
$(window).scroll(function () {
  if ($(this).scrollTop() > 100) {
    $('.back-to-top').fadeIn('slow');
  } else {
    $('.back-to-top').fadeOut('slow');
  }
});

$('.back-to-top').click(function () {
  $('html, body').animate({
    scrollTop: 0
  }, 1500, 'easeInOutExpo');
  return false;
});

//Validate information
function sendData(idform) {

  if (validatorForm(idform)) {
    if (validateCaptcha) {
      let objForm = document.getElementById(idform);
      let ArrayData = "";
      for (let i = 0; i < objForm.length; i++) {
        if (objForm[i].type == "text" || objForm[i].type == "email" || objForm[i].type == "number" || objForm[i].type == "select-one") {
          ArrayData += '"' + objForm[i].id + '":' + '"' + objForm[i].value + '",';
        }
        else if (objForm[i].id == "message") {
          ArrayData += '"' + objForm[i].id + '":' + '"' + objForm[i].value + '",';
        }
      }
      ArrayData = ArrayData.substr(0, ArrayData.length - 1);
      sendMail(ArrayData, idform);
    }
    else {
      toastr.warning("Comprueba que no eres un robot", "Verifica el captcha", {
        "closeButton": true,
        "progressBar": true,
        "showDuration": "1000",
        "hideDuration": "1000",
        "timeOut": "5000",
      });
    }
  }
}

function sendMail(json, idForm) {
  try {
    dataSetMail = "";
    var xhttp = new XMLHttpRequest();
    dataSetMail = '{"POST":"SEND_MAIL",' + json + '}';
    xhttp.open("POST", "php/mail/notification.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        if (xhttp.responseText != 0) {
          toastr.success("Pronto nos comunicaremos contigo", "Gracias por escribirnos", {
            "closeButton": true,
            "progressBar": true,
            "showDuration": "1000",
            "hideDuration": "1000",
            "timeOut": "5000",
          });
          cleanForm(idForm);
          $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        } else {
          toastr.error("Hubo un error, por favor intenta nuevamente", "Error al enviar la solicitud", {
            "closeButton": true,
            "progressBar": true,
            "showDuration": "1000",
            "hideDuration": "1000",
            "timeOut": "5000",
          });
        }
      }
    };
    xhttp.send(dataSetMail);
  } catch (error) {
    console.error(error);
    toastr.error("Se presentó un error, intenta nuevamente", "Error en el registro", {
      "closeButton": true,
      "progressBar": true,
      "showDuration": "1000",
      "hideDuration": "1000",
      "timeOut": "5000",
    });
  }
}

//Validate form
function validatorForm(idForm) {
  let objForm = document.getElementById(idForm);

  ///For input ///
  for (let i = 0; i < objForm.length; i++) {
    if (objForm[i].required == true) {
      if (objForm[i].type == "email") {
        if (objForm[i].value == "" || objForm[i].value.length == 0) {
          return false;
        }
      }
      if (objForm[i].type == "password") {
        if (objForm[i].value == "" || objForm[i].value.length == 0) {
          return false;
        }
      }
      if (objForm[i].type == "text") {
        if (objForm[i].value == "" || objForm[i].value.length == 0) {
          return false;
        }
      }
      if (objForm[i].type == "number") {
        if (objForm[i].value == "" || objForm[i].value.length == 0) {
          return false;
        }
      }

    }
  }
  return true;
}

function cleanForm(idForm) {
  objForm = document.getElementById(idForm);
  for (let i = 0; i < objForm.length; i++) {
    if (objForm[i].type == 'checkbox') {
      objForm[i].checked = false;
    }
    else {
      objForm[i].value = "";
    }
  }
  grecaptcha.reset(); 
}

// Description: Function to show process table
// Author: Laura Grisales
// Date: 07/09/2020
// function showHideSection(id){
//   if(document.getElementById){
//     let section = document.getElementById(id);
//     section.style.display = (section.style.display == 'none') ? 'block' : 'none';
//   }
// }

//************ MODAL**************//
var timeAlert;
function createModalAlert(idMenssage, type, time) {
  myStopFunction();
  let arrayStyle = new Array("alert-success", "alert-info", "alert-warning", "alert-danger");
  var objModal = document.getElementById("myAlert");
  objModal.innerHTML = '<div class="alert ' + arrayStyle[type] + ' text-center"><a class="close " data-dismiss="alert">×</a><span>' + idMenssage + '</span></div>';

  timeAlert = setTimeout(function () {
    objModal.innerHTML = "";
  }, time);
  $('html, body').animate({
    scrollTop: 0
  }, 600);
  return false;
  
}
function myStopFunction() {
  clearTimeout(timeAlert);
}

function getDataForm(idForm) {
  let objForm = document.getElementById(idForm);
  let jsonData = '';
  let selectForm = objForm.querySelectorAll('select');
  for (let i = 0; i < objForm.length; i++) {

    let input = false;
    if (objForm[i].type == "email") {
      input = true;
    }
    if (objForm[i].type == "password") {
      input = true;
    }
    if (objForm[i].type == "text") {
      input = true;
    }
    if (objForm[i].type == "number") {
      input = true;
    }
    if (objForm[i].type == "hidden") {
      input = true;
    }
    if (objForm[i].type == "date") {
      input = true;
    }

    if (input) {

      jsonData += '"' + objForm[i].id + '":' + '"' + objForm[i].value + '",';

    }
  }
  ///For select ///
  for (let j = 0; j < selectForm.length; j++) {
    let objSelect = document.getElementById(selectForm[j].id);
    if (objSelect != 'Quo_dimensions') {
 
      jsonData += '"' + selectForm[j].id + '":' + '"' + objSelect.options[objSelect.selectedIndex].value + '",';
    }
  }
  jsonData = jsonData.substring(0, jsonData.length - 1);
  return jsonData;
}

//************ VALIDATOR FORM**************//
function validatorForm(idForm) {
  let objForm = document.getElementById(idForm);

  ///For input ///
  for (let i = 0; i < objForm.length; i++) {

    if (objForm[i].required == true) {
      if (objForm[i].type == "email") {
        if (objForm[i].value == "" || objForm[i].value.length == 0) {
          return false;
        }
      }
      if (objForm[i].type == "password") {
        if (objForm[i].value == "" || objForm[i].value.length == 0) {
          return false;
        }
      }
      if (objForm[i].type == "text") {
        if (objForm[i].value == "" || objForm[i].value.length == 0) {
          return false;
        }
      }
      if (objForm[i].type == "number") {
        if (objForm[i].value == "" || objForm[i].value.length == 0) {
          return false;
        }
      }
      if (objForm[i].type == "date") {
        if (objForm[i].value == "" || objForm[i].value.length == 0) {
          return false;
        }
      }
    }
  }
  return true;
}

function loadPageView(){
  let obj=document.getElementById("loadPage");
  obj.style.display="block";
  let divObj="";
  for(let i=0;i<4;i++){
    divObj +='<div class="block"></div>';
  }
  obj.innerHTML=divObj;
  //disableScroll();  
}