// Utility
if (typeof Object.create !== 'function') {
    Object.create = function(obj) {
        function F() {};
        F.prototype = obj;
        return new F();
    };
}

(function($, window, document, undefined) {
	var curThum  = "";

    var Portfolio = {
        init: function(options, elem) {
            var self = this;

            self.$elem = $(elem);
            self.$thumnail = $(elem).find('.thumbnail');

            // Options
            self.options = $.extend({}, $.fn.portfolio.options, options || {});

            // Set columns width
            self.setColWidth();

            // On click
            self.$thumnail.click(function() {
				var thisThum = $(this).attr('href');

				if(curThum == thisThum) {
					self.$elem.find('li a.thumbnail .active-arrow').remove();
		            self.$elem.find('li.content').remove();
					curThum = "";
				}
				else
				{
					self.showContent($(this));
				}
				

						
			
            });
        },
        setColWidth: function() {
            var self = this;

            if ($(window).width() > 760) {
                var colWidth = ((90 / self.options.cols));
                self.$elem.find('li').css('width', colWidth + '%');
            }
        },
        getContentPos: function(clicked) {
            var self = this,
                thumbnails = self.$elem.find('.thumbnail'),
                contentPos = null;

            for (var i = 0; i <= thumbnails.length; i++) {
                // Get href
                var href = clicked.attr('href');

                if (href == $(thumbnails[i]).attr('href')) {
                    // If its not the last thumb
                    if (i !== (thumbnails.length - 1)) {

                        var cols = self.options.cols;
                        if ($(window).width() <= 1200 && $(window).width() > 760) cols = 4;
                        else if ($(window).width() <= 760 && $(window).width() > 590) cols = 4;
                        else if ($(window).width() <= 590) cols = 1;

                        // thumb position
                        var thumbPos = i + 1;
                        // If there's no reminder
                        var contentPos = 0;
                        if (thumbPos % cols !== 0)
                            contentPos = (cols - (thumbPos % cols)) + thumbPos;
                        else // If we have a reminder
                            contentPos = thumbPos;

                        // Clean & Validate (This fixes weird bug when there's only 2 thumbs)
                        if (contentPos > thumbnails.length) {
                            contentPos = thumbnails.length;
                        }
                    } else {
                        contentPos = i + 1;
                    }
                }
            }

            return contentPos;
        },
        showContent: function(thumbnail) {
            var $href = thumbnail.attr('href'),
                self = this,
                contentPos = self.getContentPos(thumbnail);
			
			curThum = $href;

            // Remove existing stuff first
            self.$elem.find('li a.thumbnail .active-arrow').remove();
            self.$elem.find('li.content').remove();
            // Add active arrow
            thumbnail.append('<span class="active-arrow"></span>');

            // Add content
            var $portfolioContent = $($href);
            var html = '<li class="content"><span class="close">&times;</span>' + $portfolioContent.html() + '</li>';
			
            self.$elem.find('li:eq(' + (contentPos - 1) + ')').after(html);

            // Animate
            self.$elem.find('li')[self.options.transition](500);
            $('html, body').animate({
                //scrollTop: self.$elem.find('li.content').offset().top - 340 //����� ��ġ����.
				//scrollTop: self.$elem.find('li.content').offset().top - 400 //����� ��ġ����.
            }, 700);

            // Close content
            self.$elem.find('.close').click(function(){
                self.$elem.find('li a.thumbnail .active-arrow').remove();
                self.$elem.find('li.content').remove();
				curThum = "";
            });
        }
    };

    $.fn.portfolio = function(options) {
        return this.each(function(){
            var portfolio = Object.create(Portfolio);
            portfolio.init(options, this);
        });
    };

    // Default options
    $.fn.portfolio.options = {
        cols: 5,
        transition: 'slideDown'
    };
})(jQuery, window, document);
