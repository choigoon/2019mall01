const mapKey = "a9437ae867eac4f568120369c86b0ff7";
/*var은 변수 const는 상수를 담아놓는 그릇. 변수처럼 한번더 선언해서 바꾸고 이런거 못함
군데 안씀*/
var log = console.log;
var hamB = $(".gnb_MverHam"); /*햄버거버튼*/
var hamB2 = $(".nav_closedB"); /*MverGNB 닫기버튼*/
var gnbM = $(".gnb_Mver"); /*모바일gnb전체*/
/*변수명 자체를 $ham 이런식으로 직관적으로 작성하기도 함*/
var gnbMwid = gnbM.width(); /*Mver gnb width*/



/*map띄우기*/
$(window).resize(function(){
var container = document.getElementById('mapArea'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션 뭔가있겠지 공부해보자
	center: new daum.maps.LatLng(37.574412, 126.986798), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
map.setDraggable(false);/*drag방지*/
map.setZoomable(false);/*zoom방지*/


var clusterer = new daum.maps.MarkerClusterer({
  map: map,
  /*markers: marker,*/
  gridSize: 35,
  averageCenter: true,
  minLevel: 6,
  disableClickZoom: true,
  styles: [{
      width : '53px', height : '52px',
      background: 'url(cluster.png) no-repeat',
      color: '#fff',
      textAlign: 'center',
      lineHeight: '54px'
  }]
});

var marker = new daum.maps.Marker({
  position: new daum.maps.LatLng( 37.574412, 126.986798 )
});

clusterer.addMarker(marker);

}).trigger("resize");




/*masonry로 layout잡기*/
$(".grid").imagesLoaded( function() {
  $(".grid").masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true
  })
}); /*Masonry페이지에 있는거 좀 직관적으로 볼려고 수정했음*/

/*
var masonryOpt = {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true
}
$(".grid").imagesLoaded( function() {
  $(".grid").masonry({masonryOpt})
});
--> 요렇게 쓰면 더 확인하기 쉽지롱
*/


/*반응형 resize*/
$(window).resize(function(){
  gnbWInit();/*Mver gnb가리기*/
  bannerInit();/*MainVisual height잡기*/
}).trigger("resize");

/*Mver 햄버거버튼*/
hamB.click(gnbMove);
hamB2.click(gnbMove);
/*hamB2.click(function () {gnbMove())}; 같은거 짧게씀*/

/*Footer TOP 버튼*/
$("#ft_topB").click(function (e) { 
  $("html,body").stop().animate({"scrollTop":0},1000)
});




/*Mver gnb가리기*/
function gnbInit(){
  gnbM.css({"left":-gnbMwid+"px"});
}

/*Mver gnb Moving*/
function gnbMove(){
if(gnbM.position().left == 0) {
  gnbM.stop().animate({"left": - gnbMwid +"px"}, 500)
}else {
  gnbM.stop().animate({"left": 0}, 500);}
}

/*Mver gnb 반응형에 따라 제어*/
function gnbWInit(){
  gnbMwid = gnbM.width();
  if($(window).width() > 768)gnbInit();
 /* else gnbMove();*/ 
 /*화면스크롤할때마다 옆에 Mver GNB가 튀어나와서 그거 방지하려고 Move를 꺼버렸음*/
}

/*Mainvisual Banner Height*/
function bannerInit(){
  $(".bannerSlideWrap").height($(".bannerSlideWrap > li").height());
}

/*
function gnbMove(){
if(gnbM.position().left == 0) gnbM.stop().animate({"left": -gnbMwid+"px"}, 500);
gnbMobile버전의 offset이 아니라 position의 left값 
offset은 부모기준으로의 내 위치. position은 그냥 just 나의 위치
else gnbM.stop().animate({"left": 0}, 500);
}
*/


/*Email JS 붙인것*/


/*자바스크립트 작성된거
  document.getElementById('contact-form').addEventListener('submit', function(event) {
      event.preventDefault();
      this.contact_number.value = Math.random() * 100000 | 0;
      emailjs.sendForm('contact_service', 'contact_template', this);
  });*/

  emailjs.init("user_BdUbtP2KoUTyYAdI5GkoC");
  $('#contact-form').on('submit', function(e) {
      e.preventDefault();
      $("input[name='contact_number']").val(Math.random() * 100000 | 0);
      emailjs.sendForm('choigoon', 'template_C34kTyZu', this).then(function(res){
        alert("메세지전송성공\n빠른답장하겠음");
      },function(err){
        alert("메세지전송실패.\n다시시도");
      });
      $(this)[0].reset();
      /*form비워주기*/
  });
  /*
  ★ window.onload = function()
  --> 이게 제이쿼리에선 document.ready랑 같은거야. 그러니까 난 이거 없어도돼
  ★ document.getElementById('contact-form')
  --> 이게 제이쿼리로 작성하면 $("#contact-form") 과 동일
  ★ addEventListener
  --> 이건 제이쿼리 on
  */


  /*/////////gnb Click Section slide Animation/////////*/
  $(".nav").click(goLoc); /*얘를 클릭하면 goLoc 고고*/
  $(".logo").click(goLoc);

  function goLoc(){
    console.log(this);
    var _this = $(this); /*클릭당한주체를말함*/
    var i = $(this).data("page");
    var pos = $(".page").eq(i).offset().top;
    $("html, body").stop().animate({"scrollTop":pos},1000,function(){
      $(".nav").css({"color":"#333"}); /*일단 모든 .nav에 대해 초기화시키고*/
      if(i > 0) _this.css({"color":"#b30"});
    });
  }

 






/*FADE slide 제어
var mainBslide = new fadeSlide($(".slideEach"),{delay:3000, speed:1000})*/

/*HoriSlide 제어
var horiOptions = {
  delay : 1000,
  speed : 300,
  dir : -1,
  dirBtnUse : true,
  dirBtn : [$("#bt_prev"),$("#bt_next")]
}
var mainHorislide = new SlideHori($(".bannerSlideWrap"),$(".slideEach"),horiOptions)*/
