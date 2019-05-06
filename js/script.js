// event pada saat link di klik
$('.page-scroll').on('click', function(e){

	// console.log('ok');--buat tau jalan apa ngga function pindahnya 

	//ambil isi href
	var tujuan = $(this).attr('href');
	// console.log(href);

	//tangkap elemen ybs
	var elemenTujuan = $(tujuan);
	// console.log(elemenhref.offset().top); -- buat tau jarak pixel 

	$('html,body').animate({
		scrollTop: elemenTujuan.offset().top - 50
	}, 1250, 'easeInOutExpo');

	e.preventDefault();


});


// paralax
// about

$(window).on('load', function() {
	$('.pKiri').addClass('pMuncul');
	$('.pKanan').addClass('pMuncul');
});


$(window).scroll(function() {
	var wScroll = $(this).scrollTop();

	// jumbotron
	$('.jumbotron img').css({
		'transform' : 'translate(0px, '+ wScroll/4 +'%)'
	});

	$('.jumbotron h1').css({
		'transform' : 'translate(0px, '+ wScroll/2 +'%)'
	});

	$('.jumbotron p').css({
		'transform' : 'translate(0px, '+ wScroll/1.2 +'%)'
	});

	// portfolio
	if( wScroll > $('.portfolio').offset().top - 450) {
		$('.portfolio .thumbnail').each(function(i) {
		    setTimeout(function() {
		   	// console.log('ok');
			$('.portfolio .thumbnail').eq(i).addClass('muncul');
		}, 400 * (i+1));
	});	
}


});




