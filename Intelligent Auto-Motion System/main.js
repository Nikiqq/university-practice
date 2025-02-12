window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     ||  
    function( callback ){
    window.setTimeout(callback, 1000 / 60);
  };
})();

var car_no = 36;
var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");

var BrowserDetect = {
  init: function () {
    this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
    this.version = this.searchVersion(navigator.userAgent)
    || this.searchVersion(navigator.appVersion)
    || "an unknown version";
    this.OS = this.searchString(this.dataOS) || "an unknown OS";
  },
  searchString: function (data) {
    for (var i=0;i<data.length;i++)	{
      var dataString = data[i].string;
      var dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString) {
        if (dataString.indexOf(data[i].subString) != -1)
          return data[i].identity;
      }
      else if (dataProp)
        return data[i].identity;
        }
  },
  searchVersion: function (dataString) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index == -1) return;
    return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
  },
  dataBrowser: [
    {
      string: navigator.userAgent,
      subString: "Chrome",
      identity: "Chrome"
    },
    { 	string: navigator.userAgent,
     subString: "OmniWeb",
     versionSearch: "OmniWeb/",
     identity: "OmniWeb"
    },
    {
      string: navigator.vendor,
      subString: "Apple",
      identity: "Safari",
      versionSearch: "Version"
    },
    {
      prop: window.opera,
      identity: "Opera",
      versionSearch: "Version"
    },
    {
      string: navigator.vendor,
      subString: "iCab",
      identity: "iCab"
    },
    {
      string: navigator.vendor,
      subString: "KDE",
      identity: "Konqueror"
    },
    {
      string: navigator.userAgent,
      subString: "Firefox",
      identity: "Firefox"
    },
    {
      string: navigator.vendor,
      subString: "Camino",
      identity: "Camino"
    },
    {		// for newer Netscapes (6+)
      string: navigator.userAgent,
      subString: "Netscape",
      identity: "Netscape"
    },
    {
      string: navigator.userAgent,
      subString: "MSIE",
      identity: "Explorer",
      versionSearch: "MSIE"
    },
    {
      string: navigator.userAgent,
      subString: "Gecko",
      identity: "Mozilla",
      versionSearch: "rv"
    },
    { 		// for older Netscapes (4-)
      string: navigator.userAgent,
      subString: "Mozilla",
      identity: "Netscape",
      versionSearch: "Mozilla"
    }
  ],
  dataOS : [
    {
      string: navigator.platform,
      subString: "Win",
      identity: "Windows"
    },
    {
      string: navigator.platform,
      subString: "Mac",
      identity: "Mac"
    },
    {
      string: navigator.userAgent,
      subString: "iPhone",
      identity: "iPhone/iPod"
    },
    {
      string: navigator.platform,
      subString: "Linux",
      identity: "Linux"
    }
  ]
  
};
BrowserDetect.init();
var run = false;
if(BrowserDetect.browser == "Firefox"){
  var notify = confirm("Firefox seems to have an issue rendering this and can cause your machine to crash, so please use google chrome or safari");
  if(notify == true){
    var notify2 = confirm("You sure you want to run this?");
    if(notify2 == true){
      var run = true;
    }
    else{
      run = false;
    }
  }
  else{
    var run = false;
  }
}
else{
  var run = true;
}
if(run==true){
  if (!ctx.setLineDash) {
    ctx.setLineDash = function () {
      console.log("browser not supported for dashed lines");
    }
  }
  
  var w = 1500, h = 830;
  canvas.width = w;
  canvas.height = h;
  var roads = [], intersections_arr = [], cars = [];
  
  function init(){
    //Launch Cars
    cars = [];
    roads = [];
    intersections_arr = [];
    var car_no = $("input").val();
    $(".car_no").html(car_no);
    for(var i=0;i<car_no;i++){
      var car = new drawcar();
      car.s = 5;
      var pos_rand = Math.random();
      if(pos_rand < 0.5){
        car.x = w+25;
        car.y = 378;
        car.d = "w";
      }
      else{
        car.x = 786;
        car.y = h+25;
        car.d = "n";
      }
      var color_rand = Math.random();
      var color = "";
      if(color_rand < 0.2){
        var color = "#fff";
      }
      else if(color_rand > 0.2 && color_rand < 0.4){
        var color = "#E22322";
      }
        else if(color_rand > 0.4 && color_rand < 0.6){
          var color = "#F9D111";
        }
        else if(color_rand > 0.6 && color_rand < 0.8){
          var color = "#367C94";
        }
          else if(color_rand > 0.8 && color_rand < 1){
            var color = "#222";
          }
          console.log(color);
      car.color = color;
      cars.push(car);	
    }
    
    //road1
    var road = new drawroad();
    road.x = 0, road.y = ((h/2)-40), road.width = w, road.height = 80;
    roads.push(road);
    
    //road2
    var road = new drawroad();
    road.x = ((w/2)-40), road.y = 0, road.width = 80, road.height = h;
    roads.push(road);
    
    //road3
    var road = new drawroad();
    road.x = 0, road.y = 200, road.width = w, road.height = 40;
    roads.push(road);
    
    //road4
    var road = new drawroad();
    road.x = 1050, road.y = ((h/2)-40), road.width = 40, road.height = (h - ((h/2)-40));
    roads.push(road);
    
    //road5
    var road = new drawroad();
    road.x = 450, road.y = 200, road.width = 40, road.height = h - 200;
    roads.push(road);
    
    //road6
    var road = new drawroad();
    road.x = 120, road.y = 0, road.width = 80, road.height = h;
    roads.push(road);
    
    //road7
    var road = new drawroad();
    road.x = 0, road.y = ((h/2)+240), road.width = w, road.height = 40;
    roads.push(road);
    
    intersections();
  }
  
  function drawscene(){
    intersections_arr = [];
    //console.log("drawingscene");
    
    ctx.fillStyle = "#4DBB4C";
    ctx.fillRect(0,0,w,h);
    
    for(var i=0;i<roads.length;i++){
      roads[i].draw();
    }
    intersections();
    drive_cars();
  }
  var left_green = false;
  setInterval("left_greenc()",3000);
  
  /*function left_greenc(){
    left_green = !left_green;
  } */
  
  /*function distance_check(c1, c2, axis){
    if(axis=="x"){
      var dist,
          dist = c2.x - c1.x;
      disty = c2.y - c1.y;
      if(dist>0 && dist<=(c1.l+15)){
        if(c2.w > 15 && c1.w > 15 && c1.y == c2.y){ //only check for collison on cars on the same axis
          return true;
        }
      }
    }
    else if(axis=="-x"){
      var dist,
          dist = c1.x - c2.x;
      disty = c1.y - c2.y;
      if(dist>0 && dist<=(c1.l+15)){
        if(c2.w > 15 && c1.w > 15 && c1.y == c2.y){ //only check for collison on cars on the same axis
          return true;
        }
      }
    }
      else if(axis=="-y"){
        var dist,
            dist = c1.x - c2.x;
        disty = c1.y - c2.y;
        if(disty>0 && disty<=(c1.l+15)){
          if(c2.w < 25 && c1.w < 25 && c1.x == c2.x){ //only check for collison on cars on the same axis
            return true;
          }
        }
      }
      else if(axis=="y"){
        var dist,
            dist = c2.x - c1.x;
        disty = c2.y - c1.y;
        if(disty>0 && disty<=(c1.l+15)){
          if(c2.w < 25 && c1.w < 25 && c1.x == c2.x){ //only check for collison on cars on the same axis
            return true;
          }
        }
      }
        } */
  
  /*function check_inter(c, inter, axis){
    if(axis == "x"){
      if(inter.height > 40){
        if((inter.x - c.x) > (c.l+8) && (inter.x - c.x) <= (c.l+25)){
          if(c.y-80 <= inter.y && c.y+42 >= inter.y){
            return true;
          }
        }
      }
      else{
        if((inter.x - c.x) > (c.l+8) && (inter.x - c.x) <= (c.l+25)){
          if(c.y-40 <= inter.y && c.y+42 >= inter.y){
            return true;
          }
        }
      }
    }
    else if(axis == "-x"){
      if(inter.height > 40){
        if((c.x - inter.x) > (c.l+8) && (c.x - inter.x) <= (c.l+inter.width + 5)){
          if(c.y-80 <= inter.y && c.y+42 >= inter.y){
            return true;
          }
        }
      }
      else{
        if((c.x - inter.x) > (c.l+8) && (c.x - inter.x) <= (c.l+inter.width + 5)){
          if(c.y-40 <= inter.y && c.y+42 >= inter.y){
            return true;
          }
        }
      }
    }
      else if(axis == "-y"){
        if(inter.width > 40){
          if((c.y - inter.y) > (c.l+8) && (c.y - inter.y) <= (c.l+inter.height +5)){
            if(c.x-80 <= inter.x && c.x+42 >= inter.x){
              return true;
            }
          }
        }
        else{
          if((c.y - inter.y) > (c.l+8) && (c.y - inter.y) <= (c.l+inter.height + 5)){
            if(c.x-40 <= inter.x && c.x+42 >= inter.x){
              return true;
            }
          }
        }
      }
      else if(axis == "y"){
        if(inter.width > 40){
          if((inter.y - c.y) > (c.l+8) && (inter.y - c.y) <= (c.l + 27)){
            if(c.x-80 <= inter.x && c.x+42 >= inter.x){
              return true;
            }
          }
        }
        else{
          if((inter.y - c.y) > (c.l+8) && (inter.y - c.y) <= (c.l + 27)){
            if(c.x-40 <= inter.x && c.x+42 >= inter.x){
              return true;
            }
          }
        }
      }
        } */
  
  /*function gen_dir(c, inter){
    if(c.dd == false){
      var rand_dir = Math.random()*10;
      var dir = c.d;
      c.dd = true;
      if(c.d=="e"){
        if(inter.width < 80){
          rand_no1 = 2;
          rand_no2 = 5;
        }
        else{
          rand_no1 = 3;
          rand_no2 = 6;
        }
        if(rand_dir < rand_no1){
          if(inter.roadbottom == true){
            var dir = "s";
            c.d = "s";
            c.x = inter.x + 10;
            c.y = inter.y + inter.height - 27;
          }
          else{
            if(inter.roadright == true){
              var dir = c.d;
            }
            else{
              //turn
            }
          }
        }
        else if(rand_dir > 3 && rand_dir < rand_no2){
          if(inter.roadtop == true){
            var dir = "n";
            c.d = "n";
            c.x = inter.x + inter.width - 9;
            c.y = inter.y + c.l + 2;
          }
          else{
            if(inter.roadright == true){
              var dir = c.d;
            }
            else{
              //turn
            }
          }
        }
          else{
            if(inter.roadright == true){
              var dir = c.d;
            }
            else{
              //turn
              var dir = "s";
              c.d = "s";
              c.x = inter.x + 10;
              c.y = inter.y + 2;
            }
          }
      }
      else if(c.d=="w"){
        if(inter.width < 80){
          rand_no1 = 2;
          rand_no2 = 5;
        }
        else{
          rand_no1 = 3;
          rand_no2 = 6;
        }
        if(rand_dir < rand_no1){
          if(inter.roadbottom == true){
            var dir = "s";
            c.d = "s";
            c.x = inter.x + 20;
            c.y = inter.y + inter.height + c.l +2;
          }
          else{
            if(inter.roadleft == true){
              var dir = c.d;
            }
            else{
              //turn
            }
          }
        }
        else if(rand_dir > 3 && rand_dir < rand_no2){
          if(inter.roadtop == true){
            var dir = "n";
            c.d = "n";
            c.x = inter.x + inter.width + 1;
            c.y = inter.y + c.l - 30;
          }
          else{
            if(inter.roadleft == true){
              var dir = c.d;
            }
            else{
              //turn
            }
          }
        }
          else{
            if(inter.roadleft == true){
              var dir = c.d;
            }
            else{
              //turn
              var dir = "n";
              c.d = "n";
              c.x = inter.x + inter.width + 1;
              c.y = inter.y + c.l + 2;
            }
          }
      }
        else if(c.d=="n"){
          if(rand_dir < 3){
            if(inter.roadright == true){
              var dir = "e";
              c.d = "e";
              c.y = inter.y + inter.height - 10;
              c.x = inter.x + inter.width + 1;
            }
            else{
            }
          }
          else if(rand_dir > 3 && rand_dir < 6){
            if(inter.roadleft == true){
              var dir = "w";
              c.d = "w";
              c.y = inter.y + 8;
              c.x = inter.x + 5;
            }
            else{
            }
            
          }
            else{
              if(inter.roadtop == true){
                var dir = c.d;
              }
              else{
                //turn
                var dir = "w";
                c.d = "w";
                c.y = inter.y + 8;
                c.x = inter.x + 5;
              }
            }
        }
        else if(c.d=="s"){
          if(rand_dir < 3){
            if(inter.roadright == true){
              var dir = "e";
              c.d = "e";
              c.y = inter.y + inter.height - 21;
              c.x = inter.x + inter.width + 1;
            }
            else{
              if(inter.roadbottom == true){
                var dir = c.d;
              }
              else{
                //turn
                c.s = 0;
              }
            }
          }
          else if(rand_dir > 3 && rand_dir < 6){
            if(inter.roadleft == true){
              var dir = "w";
              c.d = "w";
              c.y = inter.y - 2;
              c.x = inter.x - 28;
            }
            else{
              if(inter.roadbottom == true){
                var dir = c.d;
              }
              else{
                //turn
                c.s = 0;
              }
            }
          }
            else{
              if(inter.roadleft == true){
                var dir = "w";
                c.d = "w";
                c.y = inter.y - 2;
                c.x = inter.x - 28;
              }
              else{
                //turn
                c.s = 0;
              }
            }
        }
          }
  }*/
  
  /*function drive_cars(){
    for(var i=0;i<cars.length;i++){
      var c = cars[i];
      c.s = 5;
      if(c.d == "e"){
        for(var l=0;l<cars.length;l++){
          var c2 = cars[l];
          var dc = distance_check(c,c2,"x");
          if(dc == true){
            c.s = 0;
            for(var k=0;k<intersections_arr.length;k++){
              var inter = intersections_arr[k];
              if(inter.y + inter.height > c.y && inter.y < c.y){
                //this is road
                if(inter.height == 80){
                  var lc = 0;
                  var ld = 0;
                  for(var v=0;v<cars.length;v++){
                    if(cars[v].y == (inter.y + 44) && cars[v].x < inter.x && cars[v].s == 0){
                      lc++;
                    }
                    if(cars[v].y == c.y && cars[v].x < inter.x && cars[v].s == 0){
                      ld++;
                    }
                  }
                  if((ld-2)>lc){
                    c.y = inter.y + 44;
                    c.s = 0;
                  }
                  else{
                    c.s = 0;
                  }
                  var dc = distance_check(c,c2,"x");
                  if(dc == true){
                    c.s = 0;
                  }
                }
                else{
                  c.s = 0;
                }
              }
            }
          }
          else{
            var counter = 0;
            for(var k=0;k<intersections_arr.length;k++){
              var inter = intersections_arr[k];
              if(check_inter(c, inter, "x")){
                counter++;
                if(inter.left == "rgba(255,0,0,0.4)"){
                  //red
                  c.s = 0;
                }
                else{
                  //green
                  c.s = 5;
                  //figure dir
                  gen_dir(c, inter);
                }
              }
            }
            if(counter==0){
              //car past intersection reset random generator
              c.dd = false;	
            }
          }
        }
        if(c.x+26 >= canvas.width){
          //reposition car
          c.x = -25;
          c.y = 444;
          c.x = -25;
          c.d = "e";
          c.y -= c.s;
        }
        c.x += c.s;
      }
      else if(c.d == "n"){
        for(var l=0;l<cars.length;l++){
          var c2 = cars[l];
          var dc = distance_check(c,c2,"-y");
          if(dc == true){
            c.s = 0;
            for(var k=0;k<intersections_arr.length;k++){
              var inter = intersections_arr[k];
              if(inter.x + inter.width > c.x && inter.x < c.x){
                //this is road
                if(inter.width == 80){
                  var lc = 0;
                  var ld = 0;
                  for(var v=0;v<cars.length;v++){
                    if(cars[v].x == (inter.x + 55) && cars[v].y < inter.y && cars[v].s == 0){
                      lc++;
                    }
                    if(cars[v].x == c.x && cars[v].y < inter.y && cars[v].s == 0){
                      ld++;
                    }
                  }
                  if((ld-2)>lc){
                    c.x = inter.x + 55;
                    c.s = 0;
                  }
                  else{
                    c.s = 0;
                  }
                  var dc = distance_check(c,c2,"-y");
                  if(dc == true){
                    c.s = 0;
                  }
                }
                else{
                  c.s = 0;
                }
              }
            }
          }
          else{
            var counter = 0;
            for(var k=0;k<intersections_arr.length;k++){
              var inter = intersections_arr[k];
              if(check_inter(c, inter, "-y")){
                counter++;
                if(inter.bottom == "rgba(255,0,0,0.4)"){
                  //red
                  c.s = 0;
                }
                else{
                  //green
                  c.s = 5;
                  //figure dir
                  gen_dir(c, inter);
                }
              }
            }
            if(counter==0){
              //car past intersection reset random generator
              c.dd = false;	
            }
          }
        }
        if(c.y+26 <= 0){
          //reposition car
          c.x = 786;
          c.y = h+25;
          c.d = "n";
          c.y -= c.s;
        }
        c.y -= c.s;
      }
        else if(c.d == "s"){
          for(var l=0;l<cars.length;l++){
            var c2 = cars[l];
            var dc = distance_check(c,c2,"y");
            if(dc == true){
              c.s = 0;
              for(var k=0;k<intersections_arr.length;k++){
                var inter = intersections_arr[k];
                if(inter.x + inter.width > c.x && inter.x < c.x){
                  //this is road
                  if(inter.width == 80){
                    var lc = 0;
                    var ld = 0;
                    for(var v=0;v<cars.length;v++){
                      if(cars[v].x == (inter.x + 36) && cars[v].y < inter.y && cars[v].s == 0){
                        lc++;
                      }
                      if(cars[v].x == c.x && cars[v].y < inter.y && cars[v].s == 0){
                        ld++;
                      }
                    }
                    if((ld-1)>lc){
                      c.x = inter.x + 36;
                      c.s = 0;
                    }
                    else{
                      c.s = 0;
                    }
                    var dc = distance_check(c,c2,"y");
                    if(dc == true){
                      c.s = 0;
                    }
                  }
                  else{
                    c.s = 0;
                  }
                }
              }
            }
            else{
              var counter = 0;
              for(var k=0;k<intersections_arr.length;k++){
                var inter = intersections_arr[k];
                if(check_inter(c, inter, "y")){
                  counter++;
                  if(inter.top == "rgba(255,0,0,0.4)"){
                    //red
                    c.s = 0;
                  }
                  else{
                    //green
                    c.s = 5;
                    //figure dir
                    gen_dir(c, inter);
                  }
                }
              }
              if(counter==0){
                //car past intersection reset random generator
                c.dd = false;	
              }
            }
          }
          if(c.y-26 >= h){
            //reposition car
            c.y = 368;
            c.x = w+25;
            c.d = "w";
            c.y += c.s;
          }
          c.y += c.s;
        }
        else if(c.d == "w"){
          for(var l=0;l<cars.length;l++){
            var c2 = cars[l];
            var dc = distance_check(c,c2,"-x");
            if(dc == true){
              c.s = 0;
              for(var k=0;k<intersections_arr.length;k++){
                var inter = intersections_arr[k];
                if(inter.y + inter.height > c.y && inter.y < c.y){
                  //this is road
                  if(inter.height == 80){
                    var lc = 0;
                    var ld = 0;
                    for(var v=0;v<cars.length;v++){
                      if(cars[v].y == (inter.y + 22) && cars[v].x > inter.x && cars[v].s == 0){
                        lc++;
                      }
                      if(cars[v].y == c.y && cars[v].x > inter.x && cars[v].s == 0){
                        ld++;
                      }
                    }
                    if((ld-2)>lc){
                      c.y = inter.y + 22;
                      c.s = 0;
                    }
                    else{
                      c.s = 0;
                    }
                    var dc = distance_check(c,c2,"-x");
                    if(dc == true){
                      c.s = 0;
                    }
                  }
                  else{
                    c.s = 0;
                  }
                }
              }
            }
            else{
              var counter = 0;
              for(var k=0;k<intersections_arr.length;k++){
                var inter = intersections_arr[k];
                if(check_inter(c, inter, "-x")){
                  counter++;
                  if(inter.right == "rgba(255,0,0,0.4)"){
                    //red
                    c.s = 0;
                  }
                  else{
                    //green
                    c.s = 5;
                    //figure dir
                    gen_dir(c, inter);
                  }
                }
              }
              if(counter==0){
                //car past intersection reset random generator
                c.dd = false;	
              }
            }
          }
          if(c.x+26 <= 0){
            //reposition car
            c.y = 444;
            c.x = -25;
            c.d = "e";
            c.y -= c.s;
            
          }
          c.x -= c.s;
        }
          c.draw();
    }
  } */
  
  /*Object.getPrototypeOf(ctx).rounded_rect = function(x,y,w,h,r){
    if (typeof r === "undefined") {
      r = 2;
    }
    this.beginPath();
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.quadraticCurveTo(x + w, y, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r);
    this.lineTo(x, y + r);
    this.quadraticCurveTo(x, y, x + r, y);
    this.closePath();
    this.fill();
  } */
  
  function drawcar(){
    this.x = 0;
    this.y = 0;
    this.s = 5;
    this.l = 25; //length of vehicle
    this.d = "e";
    this.dd = false;
    this.color = "#F5D600";
    
    this.draw = function(){
      ctx.fillStyle = this.color;
      if(this.d == "w"){
        this.w = 25;
        ctx.rounded_rect(this.x, this.y, this.l, 12);
        ctx.fillStyle="#99B3CE";
        ctx.fillRect(this.x+5, this.y, 5, 12);
        ctx.fillRect(this.x+18, this.y, 2, 12);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x+6, this.y-2, 2 ,2);
        ctx.fillRect(this.x+6, this.y+12, 2 ,2);
      }
      else if(this.d == "e"){
        this.w = 25;
        ctx.rounded_rect(this.x, this.y, this.l, 12);
        ctx.fillStyle="#99B3CE";
        ctx.fillRect(this.x+15, this.y, 5, 12);
        ctx.fillRect(this.x+4, this.y, 2, 12);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x+14, this.y-2, 2 ,2);
        ctx.fillRect(this.x+14, this.y+12, 2 ,2);
      }
        else if(this.d == "s"){
          this.w = 12;
          ctx.rotate(Math.PI/2);
          ctx.rounded_rect(this.y, -this.x, this.l, 12);
          ctx.fillStyle="#99B3CE";
          ctx.fillRect(this.y+15, -this.x, 5, 12);
          ctx.fillRect(this.y+4, -this.x, 2, 12);
          ctx.fillStyle = this.color;
          ctx.fillRect(this.y+14, -this.x-2, 2 ,2);
          ctx.fillRect(this.y+14, -this.x+12, 2 ,2);
          ctx.rotate(-Math.PI/2);
          
        }
        else{
          this.w = 12;
          ctx.rotate(Math.PI/2);
          ctx.rounded_rect(this.y, -this.x, this.l, 12);
          ctx.fillStyle="#99B3CE";
          ctx.fillRect(this.y+5, -this.x, 5, 12);
          ctx.fillRect(this.y+18, -this.x, 2, 12);
          ctx.fillStyle = this.color;
          ctx.fillRect(this.y+6, -this.x-2, 2 ,2);
          ctx.fillRect(this.y+6, -this.x+12, 2 ,2);
          ctx.rotate(-Math.PI/2);
        }
    }
  }
  
  function drawinter(){
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.roadtop = true;
    this.roadleft = true;
    this.roadbottom = true;
    this.roadright = true;
    if(left_green == true){
      this.right = "rgba(0,255,0,0.4)";
      this.left = "rgba(0,255,0,0.4)";
      this.top = "rgba(255,0,0,0.4)";
      this.bottom = "rgba(255,0,0,0.4)";
    }
    else{
      this.right = "rgba(255,0,0,0.4)";
      this.left = "rgba(255,0,0,0.4)";
      this.top = "rgba(0,255,0,0.4)";
      this.bottom = "rgba(0,255,0,0.4)";
    }
    
    
    this.draw = function(){
      ctx.fillStyle = "#605A4C";
      ctx.fillRect(this.x,this.y,this.width,this.height);
      
      //zebra-crossing (left)
      if(this.roadleft == true){
        ctx.fillStyle = "#605A4C";
        ctx.fillRect(this.x-20,this.y,20,this.height);
        ctx.beginPath();
        ctx.setLineDash([1,5]);
        ctx.moveTo(this.x-12, this.y);
        ctx.lineTo(this.x-12, (this.y + this.height));
        ctx.closePath();
        ctx.strokeStyle = "#A09383";
        ctx.lineWidth = 10;
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = "#A09383";
        ctx.fillRect(this.x-22,(this.height/2)+this.y-1,2,(this.height/2)+1);
        if(this.height > 40){
          ctx.fillStyle = "#A09383";
          ctx.fillRect(this.x-52,(this.height/(4/3))+this.y-2,30,2);
        }
      }
      //zebra-crossing (right)
      if(this.roadright == true){
        ctx.fillStyle = "#605A4C";
        ctx.fillRect(this.x+this.width,this.y,22,this.height);
        ctx.beginPath();
        ctx.setLineDash([1,5]);
        ctx.moveTo(this.x+this.width+12, this.y);
        ctx.lineTo(this.x+this.width+12, (this.y + this.height));
        ctx.closePath();
        ctx.strokeStyle = "#A09383";
        ctx.lineWidth = 10;
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = "#A09383";
        ctx.fillRect(this.x+this.width+22,this.y,2,(this.height/2)+1);
        if(this.height > 40){
          ctx.fillStyle = "#A09383";
          ctx.fillRect(this.x+this.width+22,(this.height/4)+this.y-2,30,2);
        }
      }
      //zebra-crossing (top)
      if(this.roadtop == true){
        ctx.fillStyle = "#605A4C";
        ctx.fillRect(this.x,this.y-20,this.width,20);
        ctx.beginPath();
        ctx.setLineDash([1,5]);
        ctx.moveTo(this.x, this.y-12);
        ctx.lineTo((this.x + this.width), this.y-12);
        ctx.closePath();
        ctx.strokeStyle = "#A09383";
        ctx.lineWidth = 10;
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = "#A09383";
        ctx.fillRect(this.x,this.y-21,(this.width/2)+1,2);
        if(this.width > 40){
          ctx.fillStyle = "#A09383";
          ctx.fillRect(this.x+(this.width/4)-2,this.y-50,2,30);
        }
      }
      //zebra-crossing (bottom)
      if(this.roadbottom == true){
        ctx.fillStyle = "#605A4C";
        ctx.fillRect(this.x,this.y+this.height,this.width,20);
        ctx.beginPath();
        ctx.setLineDash([1,5]);
        ctx.moveTo(this.x, this.y+this.height+12);
        ctx.lineTo((this.x + this.width), this.y+this.height+12);
        ctx.closePath();
        ctx.strokeStyle = "#A09383";
        ctx.lineWidth = 10;
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = "#A09383";
        ctx.fillRect(this.x+this.width-(this.width/2)-1,this.y+this.height+20,(this.width/2)+1,2);
        if(this.width > 40){
          ctx.fillStyle = "#A09383";
          ctx.fillRect(this.x+(this.width/(4/3))-2,this.y+this.height+20,2,30);
        }
      }
      
      //traffic lights (left)
      if(this.roadleft == true){
        ctx.save();
        
        if(this.left == "rgba(0,255,0,0.4)"){
          //green
          var shadow_color = 'rgba(0,255,0,1)';
        }
        else{
          var shadow_color = 'rgba(255,0,0,1)';
        }
        
        ctx.fillStyle = shadow_color;
        ctx.shadowColor = shadow_color
        ctx.shadowOffsetX = -2;
        ctx.shadowBlur = 2;
        ctx.fillRect(this.x-3,this.y+this.height-12,1,4);
        ctx.fill();
        ctx.restore();
        ctx.shadowOffsetX = undefined;
        ctx.shadowBlur = undefined;
        
        if(this.height > 40){
          ctx.save();
          if(this.left == "rgba(0,255,0,0.4)"){
            //green
            var shadow_color = 'rgba(0,255,0,1)';
          }
          else{
            var shadow_color = 'rgba(255,0,0,1)';
          }
          
          ctx.fillStyle = shadow_color;
          ctx.shadowColor = shadow_color
          ctx.shadowOffsetX = -2;
          ctx.shadowBlur = 2;
          ctx.fillRect(this.x-3,this.y+this.height-30,1,4);
          ctx.fill();
          ctx.restore();
          ctx.shadowOffsetX = undefined;
          ctx.shadowBlur = undefined;
        }
        
        ctx.fillStyle = "#ddd";
        ctx.fillRect(this.x-3,this.y+this.height-(this.height/2)+3,1,(this.height/2));						
      }
      //traffic lights (right)
      if(this.roadright == true){
        ctx.save();
        if(this.right == "rgba(0,255,0,0.4)"){
          //green
          var shadow_color = 'rgba(0,255,0,1)';
        }
        else{
          var shadow_color = 'rgba(255,0,0,1)';
        }
        
        ctx.fillStyle = shadow_color;
        ctx.shadowColor = shadow_color
        ctx.shadowOffsetX = 2;
        ctx.shadowBlur = 2;
        ctx.fillRect(this.x+this.width+2,this.y+12,1,4);
        ctx.fill();
        ctx.restore();
        ctx.shadowOffsetX = undefined;
        ctx.shadowBlur = undefined;
        
        if(this.height > 40){
          ctx.save();
          if(this.right == "rgba(0,255,0,0.4)"){
            //green
            var shadow_color = 'rgba(0,255,0,1)';
          }
          else{
            var shadow_color = 'rgba(255,0,0,1)';
          }
          
          ctx.fillStyle = shadow_color;
          ctx.shadowColor = shadow_color
          ctx.shadowOffsetX = 2;
          ctx.shadowBlur = 2;
          ctx.fillRect(this.x+this.width+2,this.y+30,1,4);
          ctx.fill();
          ctx.restore();
          ctx.shadowOffsetX = undefined;
          ctx.shadowBlur = undefined;
        }
        
        ctx.fillStyle = "#ddd";
        ctx.fillRect(this.x+this.width+2,this.y-3,1,(this.height/2));		
      }
      //traffic lights (top)
      if(this.roadtop == true){
        ctx.save();
        if(this.top == "rgba(0,255,0,0.4)"){
          //green
          var shadow_color = 'rgba(0,255,0,1)';
        }
        else{
          var shadow_color = 'rgba(255,0,0,1)';
        }
        
        ctx.fillStyle = shadow_color;
        ctx.shadowColor = shadow_color
        ctx.shadowOffsetY = -2;
        ctx.shadowBlur = 2;
        ctx.fillRect(this.x+4,this.y-2,4,1);
        ctx.fill();
        ctx.restore();
        ctx.shadowOffsetX = undefined;
        ctx.shadowBlur = undefined;
        
        if(this.width > 40){
          ctx.save();
          if(this.top == "rgba(0,255,0,0.4)"){
            //green
            var shadow_color = 'rgba(0,255,0,1)';
          }
          else{
            var shadow_color = 'rgba(255,0,0,1)';
          }
          
          ctx.fillStyle = shadow_color;
          ctx.shadowColor = shadow_color
          ctx.shadowOffsetY = -2;
          ctx.shadowBlur = 2;
          ctx.fillRect(this.x+28,this.y-2,4,1);
          ctx.fill();
          ctx.restore();
          ctx.shadowOffsetX = undefined;
          ctx.shadowBlur = undefined;
        }
        
        ctx.fillStyle = "#ddd";
        ctx.fillRect(this.x-3,this.y-2,(this.width/2),1);
      }
      //traffic lights (bottom)
      if(this.roadbottom == true){
        ctx.save();
        if(this.bottom == "rgba(0,255,0,0.4)"){
          //green
          var shadow_color = 'rgba(0,255,0,1)';
        }
        else{
          var shadow_color = 'rgba(255,0,0,1)';
        }
        
        ctx.fillStyle = shadow_color;
        ctx.shadowColor = shadow_color
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        ctx.fillRect(this.x+this.width-10,this.y+this.height+2,4,1);
        ctx.fill();
        ctx.restore();
        ctx.shadowOffsetX = undefined;
        ctx.shadowBlur = undefined;
        
        if(this.width > 40){
          ctx.save();
          if(this.bottom == "rgba(0,255,0,0.4)"){
            //green
            var shadow_color = 'rgba(0,255,0,1)';
          }
          else{
            var shadow_color = 'rgba(255,0,0,1)';
          }
          
          ctx.fillStyle = shadow_color;
          ctx.shadowColor = shadow_color
          ctx.shadowOffsetY = 2;
          ctx.shadowBlur = 2;
          ctx.fillRect(this.x+this.width-32,this.y+this.height+2,4,1);
          ctx.fill();
          ctx.restore();
          ctx.shadowOffsetX = undefined;
          ctx.shadowBlur = undefined;
        }
        
        ctx.fillStyle = "#ddd";
        ctx.fillRect(this.x+(this.width/2)+3,this.y+this.height+2,(this.width/2),1);
      }
    }
  }
  
  function intersections(){
    for(var i=0;i<roads.length;i++){
      var r1 = roads[i];
      for(var j=0;j<roads.length;j++){
        var r2 = roads[j];
        if(r1.width > r1.height){
          if(r2.width < r2.height){
            if((r1.x + r1.width) > r2.x && r1.x <= r2.x){
              if((r2.y + r2.height) >= r1.y && r2.y <= r1.y){
                //console.log("intersection found at ("+r1.y+","+r2.x+")");
                var roadtop = true;
                var roadbottom = true;
                var roadleft = true;
                var roadright = true;
                if(r1.y == r2.y){
                  //no intersection top
                  var roadtop = false;
                }
                if(r1.x == r2.x){
                  //no intersection left
                  var roadleft = false;
                }
                if((r1.x + r1.width) == (r2.x + r2.width)){
                  //no intersection right
                  var roadright = false;
                }
                if((r1.y + r1.height)==(r2.y + r2.height)){
                  //no intersection top
                  var roadbottom = false;
                }
                
                var inter = new drawinter();
                inter.x = r2.x, inter.y = r1.y, inter.width = r2.width, inter.height = r1.height, inter.roadtop = roadtop, inter.roadleft = roadleft, inter.roadright = roadright, inter.roadbottom = roadbottom;
                intersections_arr.push(inter);
                inter.draw();
              }
            }
          }
        }
      }
    }
  } 
  
  function drawroad(){
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.color = "#605A4C";
    
    this.draw = function(){
      
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x,this.y,this.width,this.height);
      
      ctx.fillStyle = "#A68B44";
      if(this.width < this.height && this.width > 40){
        ctx.fillRect(this.x+((this.width/2)-1),this.y,2,this.height);
        
        ctx.beginPath();
        ctx.setLineDash([2,5]);
        ctx.moveTo(this.x+((this.width/4)-1), this.y);
        ctx.lineTo(this.x+((this.width/4)-1), (this.y + this.height));
        ctx.closePath();
        ctx.strokeStyle = "#A09383";
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.setLineDash([2,5]);
        ctx.moveTo(this.x+((this.width/(4/3))-1), this.y);
        ctx.lineTo(this.x+((this.width/(4/3))-1), (this.y + this.height));
        ctx.closePath();
        ctx.strokeStyle = "#A09383";
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = "#A09383";
        ctx.fillRect(this.x-10,this.y,10,this.height);
        ctx.fillStyle = "#A09383";
        ctx.fillRect(this.x+this.width,this.y,10,this.height);
        
      }
      else if(this.width > this.height && this.height > 40){
        ctx.fillRect(this.x,this.y+((this.height/2)-1),this.width,2);
        
        ctx.beginPath();
        ctx.setLineDash([2,5]);
        ctx.moveTo(this.x, this.y+((this.height/4)-1));
        ctx.lineTo((this.x+this.width), this.y+((this.height/4)-1));
        ctx.closePath();
        ctx.strokeStyle = "#A09383";
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.setLineDash([2,5]);
        ctx.moveTo(this.x, this.y+((this.height/(4/3))-1));
        ctx.lineTo((this.x+this.width), this.y+((this.height/(4/3))-1));
        ctx.closePath();
        ctx.strokeStyle = "#A09383";
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = "#A09383";
        ctx.fillRect(this.x,this.y-10,this.width,10);
        ctx.fillStyle = "#A09383";
        ctx.fillRect(this.x,this.y+this.height,this.width,10);
        
      }
        else if(this.width > this.height && this.height < 41){
          ctx.fillRect(this.x,this.y+((this.height/2)-1),this.width,2);
          ctx.fillStyle = "#A09383";
          ctx.fillRect(this.x,this.y-10,this.width,10);
          ctx.fillStyle = "#A09383";
          ctx.fillRect(this.x,this.y+this.height,this.width,10);
        }
        else if(this.width < this.height && this.width < 41){
          ctx.fillRect(this.x+((this.width/2)-1),this.y,2,this.height);
          ctx.fillStyle = "#A09383";
          ctx.fillRect(this.x-10,this.y,10,this.height);
          ctx.fillStyle = "#A09383";
          ctx.fillRect(this.x+this.width,this.y,10,this.height);
        }
     } 
  }
  
  function animloop() {
      drawscene();
      requestAnimFrame(animloop); 
  }
  init();
  animloop();
}