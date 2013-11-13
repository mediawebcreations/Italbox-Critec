function CatalogosCtrl($scope) {
  $scope.catalogos = [
    {nome:'ITALBOX WATER SPLENDOR', capa_url:'catalogos/capas/capa1.jpg', cor:'#b5985a', id:'catalogo1'},
    {nome:'AGUA BATHROOM FURNITURE', capa_url:'catalogos/capas/capa2.jpg', cor:'#f5a3a9', id:'catalogo2'},
    {nome:'ITALBOX space 3', capa_url:'catalogos/capas/capa3.jpg', cor:'#ac326e', id:'catalogo3'}];
 
  $scope.addTodo = function() {
    $scope.catalogos.push({text:$scope.todoText, done:false});
    $scope.todoText = '';
  };
 
  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.catalogos, function(catalogo) {
      count += catalogo.done ? 0 : 1;
    });
    return count;
  };
 
  $scope.archive = function() {
    var oldTodos = $scope.catalogos;
    $scope.catalogos = [];
    angular.forEach(oldTodos, function(catalogo) {
      if (!catalogo.done) $scope.catalogos.push(catalogo);
    });
  };
}


paginas_catalogo = [
    {nome:'ITALBOX WATER SPLENDOR', img:'catalogo/pag1.jpeg', id:'pag1'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag2.jpeg', id:'pag2'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag3.jpeg', id:'pag3'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag4.jpeg', id:'pag4'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag5.jpeg', id:'pag5'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag6.jpeg', id:'pag6'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag7.jpeg', id:'pag7'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag8.jpeg', id:'pag8'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag9.jpeg', id:'pag9'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag10.jpeg', id:'pag10'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag11.jpeg', id:'pag11'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag12.jpeg', id:'pag12'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag13.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag14.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag15.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag16.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag17.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag18.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag19.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag20.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag21.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag22.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag23.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag24.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag25.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag26.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag27.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag28.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag29.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag30.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag31.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag32.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag33.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag34.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag35.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag36.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag37.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag38.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag39.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag40.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag41.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag42.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag43.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag44.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag45.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag46.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag47.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag48.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag49.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag50.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag51.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag52.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag53.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag54.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag55.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag56.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag57.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag58.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag59.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag60.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag61.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag62.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag63.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag64.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag65.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag66.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag67.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag68.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag69.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag70.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag71.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag72.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag73.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag74.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag75.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag76.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag77.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag78.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag79.jpeg', id:'pag13'},
    {nome:'AGUA BATHROOM FURNITURE', img:'catalogo/pag80.jpeg', id:'pag13'}];


/*for (var i = 0; i < 80; i++) {
  alert(i);
  paginas_catalogo.push({nome:'ITALBOX WATER SPLENDOR', img:'catalogo/pag1.jpeg', id:'pag1'});
  // Do something with element i.
}*/


function CatalogoCtrl($scope) {
  $scope.paginas = paginas_catalogo;


}




$(function() {


    //Draggable.create(".lista-catalogos", {type:"x", edgeResistance:0.65, bounds:"#imgs", throwProps:true});

    var gridWidth = $( window ).width();

    Draggable.create("#box-catalogo", {type:"x", edgeResistance:0.99, bounds:"#catalogo",  throwProps:true,
      snap: {
        x: function(endValue) {

            return Math.round(endValue / gridWidth) * gridWidth;
        }
      },

    onDragEnd: function() {
      //$("#box-catalogo").innerHTML = "endX: " + Math.round(this.endX) + "<br>endY: " + Math.round(this.endY);
      //end.innerHTML = "endX: " + Math.round(this.endX) + "<br>endY: " + Math.round(this.endY);
     
    },
    onDragStart: function() {
     // alert("Valor x "+this.x + "valor x final "+this.endX);
      //if(Math.round(this.x) == -20)
      //{
        TweenMax.to($(".seta-baixo"), 0.5, {autoAlpha:1});
        TweenMax.to($(".header"), 0.5, {top:-50, ease:"Back.easeIn"});
        verMenu = false;
              
      //}
    }

 
});



  //Draggable.create("#imgs", {type:"x", edgeResistance:0.5, throwProps:true, bounds:window});

    // guarda a posição do rato no mouse down de forma a detectar se arrartou a imagem  
    $("#catalogo1").mousedown(function(){

        posicaoRatoInicial = event.clientX;

    });
    


      $("#catalogo1").click(function(){

        // verifica se a aposição do caro é a mesma, se sim quer dizer que não existiu drag
        if(posicaoRatoInicial == event.clientX)
        {
          //TweenLite.to($("#catalogo1 img"), 1, {css:{height:700}, ease:Expo.easeOut});
          TweenMax.to($("#catalogo1 img"), 3, {rotationY:360, transformOrigin:"left 50% -200"});
          //TweenLite.to($(".button_menu"), 0.5, {css:{autoAlpha:0}});
        }
        
      });



 
 


//////////////////////////////////////////////////////////////////////////////////////////
////////////////////  Menus ////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

posicaoRatoInicial= 100;

  var verMenu = true;
  TweenMax.to($(".seta-baixo"), 0, {autoAlpha:0});

  $("#box-catalogo").bind('touchstart mousedown MozTouchDown', function(e){

      //alert(pointerEventToXY(e));
        posicaoRatoInicial = pointerEventToXY(e);

    });


    $("#box-catalogo").bind('mouseup touchend MozTouchRelease', function(e){
      
      distancia = Math.abs(posicaoRatoInicial - pointerEventToXY(e));

     

      if(distancia < 10)
      {
          if(verMenu)
          {
              TweenMax.to($(".header"), 0.5, {top:-50, ease:"Back.easeIn"});
              
              verMenu = false;
          } else
          { 
              TweenMax.to($(".seta-baixo"), 0.5, {autoAlpha:0});
              TweenMax.to($(".header"), 0.5, {top:0, ease:"Back.easeOut"});
             
              verMenu=true;
          }
        }
          
          //TweenMax.from($(".fundo-menu"), 0, {autoAlpha:0});
          //TweenMax.from($(".fundo-menu"), 3, {autoAlpha:1});

      });

    $(".seta-baixo").bind('mouseup touchend MozTouchRelease', function(e){

        TweenMax.to($(".seta-baixo"), 0.5, {autoAlpha:0});
        TweenMax.to($(".header"), 0.5, {top:0, ease:"Back.easeOut"});
        verMenu=true;
     });

    var pointerEventToXY = function(e){
      //var out = {x:0, y:0};
      if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        outX = touch.pageX;
        //out.y = touch.pageY;
      } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
        outX = e.pageX;
        //out.y = e.pageY;
      }
      return outX;
    };


      var open = false;
     
    $(".open-menu").click(function(){

          if(open)
          {
              tiraMenu();
          } else
          { 
              entraMenu();
          }

      });

     $(".fundo-menu").bind('touchstart mousedown MozTouchDown', function(e){
          if(open) tiraMenu();
      });
 

      $(".menu li").bind('touchstart mouseover MozTouchDown', function(e){
          TweenMax.to(this, 0.6, {backgroundColor:"#000000"});
          TweenMax.to(this, 0.6, {color:"#ffffff"});
      });

      $(".menu li").bind('mouseout touchend MozTouchRelease', function(e){
          TweenMax.to(this, 0.6, {backgroundColor:"transparent"});
          TweenMax.to(this, 0.6, {color:"#000000"});
      });



      function entraMenu()
      {

          $(".fundo-menu").css({"display":"block", "height":$( document ).height()});
          TweenMax.to($(".fundo-menu"), 0, {autoAlpha:0});
          TweenMax.to($(".fundo-menu"), 0.5, {autoAlpha:1});
          TweenMax.to($(".menu"), 1, {top:0, ease:"Elastic.easeOut"});
         
          open=true;
      }

      function tiraMenu()
      {
        TweenMax.to($(".fundo-menu"), 1, {autoAlpha:0});
        TweenMax.to($(".menu"), 0.5, {top:1200, ease:"Back.easeIn"});
        open = false;
      }

});





//////////////////////////////////////////////////////////////////////////////////////////
////////////////////  Esconde barras e redimenciona imagens ////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


function hideAddressBar_atribuiTamanhos()
      {
        //alert("teste");
          if(!window.location.hash)
          { 
              if(document.height <= window.outerHeight + 10)
              {
                  document.body.style.height = (window.outerHeight + 50) +'px';
                  setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
              }
              else
              {
                  setTimeout( function(){ window.scrollTo(0, 1); }, 0 ); 
              }
          }

          $("#catalogo").css({"width":$( window ).width()});
          $(".lista-paginas").css({"height":$( window ).height(), "width":$( window ).width()*80});
          $(".lista-paginas li").css({"height":$( window ).height(), "width":$( window ).width()});

          if($(window).width() > $(window).height())
          {
              $(".lista-paginas img").css({"height":$(window).height()});
          } else
          {
              $(".lista-paginas img").css({"width":$(window).width()});
          }

          //paddingTop = $(window).height() - $(".lista-paginas img").height()

          //$(".lista-paginas li").css({"padding-top":$( window ).width()});
   


      } 

      window.addEventListener("load", hideAddressBar_atribuiTamanhos );
      window.addEventListener("orientationchange", hideAddressBar_atribuiTamanhos ); 

      window.addEventListener("resize", hideAddressBar_atribuiTamanhos);

