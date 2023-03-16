$(document).ready(function(){

 
  $(".carousel-button-detail-prev").on('click',function(){
    if(slideActive!=0){
    slideActive--;
    }
    $(".demo-content").eq(slideActive).trigger('click');
  });

  $(".carousel-button-detail-next").on('click',function(){
    if(slideActive!=$(".demo-content").length-1){
    slideActive++;
    }
    $(".demo-content").eq(slideActive).trigger('click');
  });

  var slideActive=0;

  $(".demo-content").click(function(){
    slideActive=$(this).index(".demo-content");
    var mSrc=$("#main-image").attr('src');
    $(this).css('background-image', "url(" + mSrc + ")");
    $("#main-image").attr('src',$(this).data('src'));
    $(this).data('src',mSrc);
  });

$(".getquoteonmobile").on('click',function(){

  $("html").scrollTop(0);
  $('main, .start-chat').addClass('d-none')
  $('.getquote').addClass('form-product-open');

});


$("#order-sample").on('click',function(){
  $("html").scrollTop(0);
  $('main, .start-chat').addClass('d-none');
  $('.ordersample').addClass('form-product-open');
});


  // // Initialize the MMenu plugin
  $("#mmenu").mmenu({
    counters: true,
    offCanvas: {
      position  : "right"
   },
   "navbars": [
    {
       "position": "top",
       "content": [
          // "searchfield",
          "breadcrumbs"
       ]
    },
 ],
 "iconbar": {
  "use": true,
  "top": [
     "<a href='/'><i class='fa fa-home'></i></a>",
  ]
},
   extensions:["shadow-page","position-right"]
  });

  $( "#mmenu li.sub-mmenu > a.mm-btn_next" ).each( function( index ) {
    var subM = jQuery( this ).attr( 'href' );
    jQuery( this ).prev( 'a' ).attr( 'href', subM );
  });

  // Optimalisation: Store the references outside the event handler:
  var $window = $(window);
  var $pane = $('#pane1');

  function checkWidth() {
      var windowsize = $window.width();
      if (windowsize <600) {
          //if the window is less than 600px wide then turn on jScrollPane..
          $('.search-box').removeClass('col-4');
          $("#mmenu").removeClass('d-none');
          if($('.myModal').length==2){
          $('.myModal').eq(0).remove();
          }
          if($('.our-modal').length==2){
            $('.our-modal').eq(0).remove();
          }
        }
      else{
        $('.search-box').addClass('col-4');
        $("#mmenu").addClass('d-none');
        $('.filters').fadeIn(0);
        if($('.our-modal').length==2){
          $('.our-modal').eq(1).remove();
        }
        

        if($('.myModal').length==2){
          $('.myModal').eq(1).remove();
        }
      }
  }
  // Execute on load
  checkWidth();
  $('.filters-open').on('click',function(){
      if($window.width()<600){
        $('.filters').slideToggle();
      }
  })
  // Bind event listener
  $(window).resize(checkWidth);

  
$('.sm-search,.search-close').click(function(){
$('.search').toggleClass('d-none d-sm-block');
});
});