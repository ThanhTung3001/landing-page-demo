//@nodws
$('.ds_select .ds_placeholder').on('click',function(e){
  e.preventDefault();
  if($('.ds_select').hasClass('open'))
    $('.ds_select').removeClass('open');
  else
     $('.ds_select').addClass('open');
});

//Or just remove this and go to link
/*
$('.ds_select .ds_list a').on('click',function(e){
  e.preventDefault();
  $('.ds_select .ds_placeholder').text($(this).text());
  $('.ds_select').removeClass('open');
});
*/

////////////

//@nodws
$('.ds_select2 .ds_placeholder').on('click',function(e){
  e.preventDefault();
  if($('.ds_select2').hasClass('open'))
    $('.ds_select2').removeClass('open');
  else
     $('.ds_select2').addClass('open');
});

