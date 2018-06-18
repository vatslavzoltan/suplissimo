$(function() {

		var show = true;
		$(window).on('scroll',function(){
	
			if(!show) return false;
	
			var w_top = $(window).scrollTop();
			var e_top = $('#about').offset().top;
			if (w_top>= e_top){
				setTimeout(function(){
					$(".spinkrement").spincrement({
					thousandSeparator: "",
					duration: 3000,
					from: 0
				});
				},100);
				show = false		
			}
		
		});

	//Scroll
	$('.list_item a').mPageScroll2id({ scrollSpeed: 900,offset: 100 });

	$('.top').click(function() {
		$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
	});
	$(window).scroll(function() {
		if ($(this).scrollTop() > $(window).height()) {
			$('.top').addClass("active");
		} else {
			$('.top').removeClass("active");
		};
	});

	//Preloader
	$(window).on ('load', function(){
		$('.preloader').delay(1000).fadeOut('slow');
	})

	//Mobile menu
	$('.menu-btn').on('click', function(e) {
		e.preventDefault;
		$(this).toggleClass('menu-btn_active');
		$('.navigation').toggleClass('active');
	});
	$('.list_item').on('click',function(e){
		e.preventDefault;
		$('.navigation').removeClass('active');
		$('.menu-btn').removeClass('menu-btn_active');
	})
	//E-mail Ajax Send
	$(".callback").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize() 
		}).done(function() {
			$(th).find('.success').addClass('active').css('display','flex').hide().fadeIn();
			setTimeout(function() {
				// Done Functions
				$(th).find('.success').removeClass('active').fadeOut();
				th.trigger("reset");
			}, 3000);
		});
		return false;
	});

});

//Active menu
// Cache selectors
var lastId,
  topMenu = $("#nav_list"),
  topMenuHeight = topMenu.outerHeight() + 15,
  // All list items
  menuItems = topMenu.find("a"),
  // Anchors corresponding to menu items
  scrollItems = menuItems.map(function() {
    var item = $($(this).attr("href"));
    if (item.length) {
      return item;
    }
  });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e) {
  var href = $(this).attr("href"),
    offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
  $('html, body').stop().animate({
    scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function() {
  // Get container scroll position
  var fromTop = $(this).scrollTop() + topMenuHeight + 500;

  // Get id of current scroll item
  var cur = scrollItems.map(function() {
    if ($(this).offset().top < fromTop)
      return this;
  });
  // Get the id of the current element
  cur = cur[cur.length - 1];
  var id = cur && cur.length ? cur[0].id : "";

  if (lastId !== id) {
    lastId = id;
    // Set/remove active class
    menuItems
      .parent().removeClass("active")
      .end().filter("[href='#" + id + "']").parent().addClass("active");
  }
});