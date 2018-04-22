function close_accordion_section() {
    $('.accordion .accordion-section-title').removeClass('active');
    $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
}

(function($) {

    var _defaults = {
      onOpen: $.noop,
      onClose: $.noop,
      clickOutside: true
    };
  
    $.tinyModal = function(opts) {
  
      var o = $.extend({}, _defaults, opts),
          $overlay = $('<div class="tinymodal-overlay">').hide(),
          $modal = $('<div class="tinymodal-window">\
            <div class="tinymodal-title"><div class="tinymodal-close">&#215;</div></div>\
            <div class="tinymodal-content">'+montaModalComIndividuos()+'</div>\
            </div>').hide(),
          $el = $(o.html)
          $children = $el.children();
  
      $modal.find('.tinymodal-content').append($children);
  
      function show() {
        $('body').width($('body').width()).css('overflow', 'hidden');
        $overlay.fadeIn('fast', function() {
          $modal.fadeIn('fast', o.onOpen);
        });
        $modal.css({
          marginLeft: -($modal.width()/2) +'px',
        });
      }
  
      function hide(callback) {
        $modal.fadeOut('fast', function() {
          $('body').css({ width: 'auto', overflow: 'auto' });
          $overlay.fadeOut('fast');
          if (typeof callback == 'function') callback();
          $el.append($children);
        });
      }
  
      $modal.find('.tinymodal-close').on('click', function(e) {
        var callback = $(this).text();
        hide(o[callback]);
      });
  
      $modal.find('.tinymodal-close').click(o.onClose);
  
      $modal.on('click', function(e){ e.stopPropagation(); });
  
      if (o.clickOutside) $overlay.on('click', hide);
  
      $('body').prepend($overlay.append($modal));
      show();
      
      //Função que chama acorddion
      $('.accordion-section-title').click(function(e) {
            var currentAttrValue = $(this).attr('href');
            if($(e.target).is('.active')) {
                close_accordion_section();
            }else {
                close_accordion_section();
                $(this).addClass('active');
                $('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
            }
            e.preventDefault();
        });
    };
  
  }(jQuery));
