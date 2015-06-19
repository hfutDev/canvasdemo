var el = function(name) {
  return document.getElementById(name);
};

var modal = el('modal');
var modalClose = el('modal-close');
var loginBtn = el('modal-close');
var navBtn = el('nav-btn');
var newsBtn = el('news-btn');
var modalInfo = document.querySelectorAll('.bottom-btn');

modalClose.onclick = function() {
  var i = 0;
  var interval = setInterval(function() {
    i += 5;
    if(i === 105) {
      clearInterval(interval);
      return;
    }
    modal.style.top = i + '%';
  }, 5);
  if(modalName) el(modalName).className = 'modal-info ' + modalName;
};

var openModal = function() {
  var i = 100;
  var interval = setInterval(function() {
    i -= 5;
    if(i === -5) {
      clearInterval(interval);
      return;
    }
    modal.style.top = i + '%';
  }, 5);
};

var modalName = '';
for(var i = 0; i < modalInfo.length; i ++) {
  modalInfo[i].onclick = function(e) {
    modalName = 'modal-' + e.target.id.replace('-btn','');
    openModal();
    el(modalName).className += ' active';
  };
}

var toggle = 0;
var bg = el('bg');
var loader = ['music', 'book', 'minli', 'weipan', 'wall', 'news'];
var img;
(function() {
  for(var i = 0; i < loader.length; i ++) {
    img = new Image();

    img.src = 'img/' + loader[i] + '.jpg';
  }
})();
el('scene').onmousemove = function(e) {
  var mouseX = e.offsetX;
  var mouseY = e.offsetY;

  if(mouseX < 493 && mouseX > 410 && mouseY < 67 && mouseY > 0) {
    if(toggle !== 1) {  
      clearCanvas(1);
      drawImg('minli');
      drawText(context, '思政文化平台', 450, 590);
      toggle = 1;
      bg.className = 'bg-minli';
    }
    this.style.cursor = 'pointer';
    this.onclick = function() {
      window.open('http://mly.hfutonline.net/index.html');
    }
  } else if(mouseX < 785 && mouseX > 708 && mouseY < 226 && mouseY > 178) {
    if(toggle !== 2) {
      clearCanvas(2);
      drawImg('book');
      drawText(context, '二手书籍交易平台', 450, 590);
      toggle = 2;
      bg.className = 'bg-book';
    }
    this.style.cursor = 'pointer';
    this.onclick = function() {
      window.open('http://book.hfutonline.net/');
    }
  } else if(mouseX < 785 && mouseX > 708 && mouseY < 554 && mouseY > 521) {
    if(toggle !== 3) {
      clearCanvas(3);
      drawImg('music');
      drawText(context, '网络点播 无线传情', 450, 590);
      toggle = 3;
      bg.className = 'bg-music';
    }
    this.style.cursor = 'pointer';
    this.onclick = function() {
      window.open('http://sunnyradio.hfutonline.net/radio/diange');
    }
  } else if(mouseX < 478 && mouseX > 410 && mouseY < 730 && mouseY > 677) {
    if(toggle !== 4) {
      clearCanvas(4);
      drawImg('weipan');
      drawText(context, '住在云端的贴心优盘', 450, 590);
      toggle = 4;
      bg.className = 'bg-weipan';
    }
    this.style.cursor = 'pointer';
    this.onclick = function() {
      window.open('http://upan.hfutonline.net/upload');
    }
  } else if(mouseX < 194 && mouseX > 112 && mouseY < 554 && mouseY > 521) {
    if(toggle !== 5){
      clearCanvas(5);
      drawWall();
      drawText(context, '生活就要画出来', 450, 590);
      toggle = 5;
      bg.className = 'bg-wall';
    }
    this.style.cursor = 'pointer';
    this.onclick = function() {
      window.open('http://sketch.hfutonline.net/sketch/index');
    }
  } else if(mouseX < 192 && mouseX > 112 && mouseY < 226 && mouseY > 178) {
    if(toggle !== 6){
      clearCanvas(6);
      drawNews();
      toggle = 6;
      bg.className = 'bg-news';
    }
    this.style.cursor = 'pointer';
    this.onclick = function() {
      window.open('http://newer.hfutonline.net/');
    }
  } else {
    if(toggle){
      toggle = 0;
      setTimeout(function() {
        if(!toggle){
          clearCanvas();
          drawImg('word');
          bg.className = '';
        }
      }, 1000);
    }
    this.style.cursor = 'default';
    this.onclick = null;
  }

};

var context =  el('scene').getContext('2d');
var context2 =  el('scene2').getContext('2d');

var clearCanvas = function(i) {
  context2.clearRect(0, 0, 900, 740);
  //设置旋转角度
  var rotate = (((i - 2) * 60 - 30) * (Math.PI) / 180);//弧度   角度*Math.PI/180
  var dx = 290 * Math.cos(rotate);
  var dy = 290 * Math.sin(rotate);
  context.fillStyle = '#fff';
  drawCircle(context2, 0, dx + 450, dy + 370, 20);
  context.beginPath();
  context.arc(450, 370, 290, 0, 2 * Math.PI, false);
  context.clip();
  context.clearRect(0, 0, 900, 740);
};

context.strokeStyle = '#fff';
context2.strokeStyle = '#fff';
context2.lineWidth = 6;
context.fillStyle = '#1cc1e8';
context.textAlign = 'center';

context.font = '20px "Microsoft YaHei"';

// 得到半圆弧上的点
// 点的个数，第几个，圆心坐标，半径，起始角度
var getCleclePoint = function(number, i, x, y, r, rotate) {
  var rot = (rotate + 180/number * i) * Math.PI / 180;
  var obj = {};
  obj.x = r * Math.cos(rot) + x;
  obj.y = r * Math.sin(rot) + y;
  return obj;
}

var drawText = function(context, text, x, y) {
  context.fillStyle = '#fff';
  context.fillText(text, x, y);
  context.fillStyle = '#1cc1e8';
}

var drawTitle = function(context) {
  var arr = ['思政·明理苑', '学习·易书', '音乐·点播', '云端·微盘', '休闲·涂鸦', '服务·情报'];

  for (var i = 0; i < 6; i ++) {
    //设置旋转角度
    var rotate = (((i - 1) * 60 - 30) * (Math.PI) / 180);//弧度   角度*Math.PI/180
    var x = 350 * Math.cos(rotate);
    var y = 350 * Math.sin(rotate);
    var dx = 310 * Math.cos(rotate);
    var dy = 310 * Math.sin(rotate);
    context.fillStyle = '#fff';
    drawCircle(context, 1, dx + 450, dy + 370, 3);
    drawText(context, arr[i], x + 450, y + 375);
  }
} 

var drawCircle = function(context, fill, x, y, r) {
  context.beginPath();
  context.arc(x, y, r , 0, 2 * Math.PI, true);
  if(fill) {
    context.fill();
  } else {
    context.stroke();
  }
}

// 画扇形直线
// 对象，起始坐标，起始位置，长度，角度
var drawPointLine = function(context, x, y, s, length, rotate) {
  context.save();
  context.translate(x, y);
  context.rotate(rotate * Math.PI / 180);
  context.beginPath();
  context.moveTo(0, s);
  context.lineTo(0, s + length);
  context.stroke();
  context.closePath();
  context.restore();
};

var drawLine = function(context, dirctive, x, y, width) {
  if(dirctive) {
    context.moveTo(x, y);
    context.lineTo(x, y + width);
  } else {
    context.moveTo(x, y);
    context.lineTo(x + width, y);
  }
  
  //context.closePath() //闭合路径
  context.stroke();
};

var drawFreeLine = function(context, x1, y1, x2, y2) {
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
};

var drawBody = function() {
  drawCircle(context, 0, 450, 370, 290);
  drawTitle(context);
}

var drawNews = function() {
  var that = this;
  that.from = 130;
  var inverval = setInterval(function() {
    if(that.from < 260) {
      that.from += 8;
      if(that.from >= 130 && that.from < 160) {
        drawCircle(context, 0, 450, 320, 180 - (that.from / 2));
      } else if(that.from > 160 && that.from < 220) {
        drawPointLine(context, 450, 320, 120, 120, (that.from - 20)/8);
      } else if(that.from > 220 && that.from < 260) {
        drawLine(context, 0, 373, (that.from - 135) * 3, 150)
      }
      if(that.from < 250) {
        var obj = getCleclePoint(49, (that.from - 130) / 8 + 6, 450, 320, 130, -225);
        var obj2 = getCleclePoint(49, (that.from - 130) / 8 + 6, 450, 320, 130, -54);
        drawFreeLine(context, 200, 500 - that.from, obj.x, obj.y);
        drawFreeLine(context, obj2.x, obj2.y, 700, that.from + 120);
      }
    }else {
      context.beginPath();
      context.arc(450, 320, 95, 1.6 * Math.PI, 1.9 * Math.PI, false);
      context.stroke();
      drawText(context, '校园生存全攻略', 450, 590);
      clearInterval(inverval);
    }
  }, 20);
};

var drawWall = function() {
  var that = this;
  that.from = 0;
  var inverval = setInterval(function() {
    if(that.from < 30) {
      if(that.from >= 0 && that.from < 10) {
        var pos1 = getCleclePoint(10, that.from, 520, 170, 14, 200);
        var pos2 = getCleclePoint(10, that.from, 470, 270, 10, 200);
        drawFreeLine(context, pos1.x, pos1.y, pos2.x, pos2.y);
        var pos3 = getCleclePoint(10, that.from, 470, 270, 4, 200);
        var pos4 = getCleclePoint(10, that.from, 442, 327, 4, 200);
        drawFreeLine(context, pos3.x, pos3.y, pos4.x, pos4.y);
        var pos5 = getCleclePoint(10, that.from, 444, 327, 6, 60);
        var pos6 = getCleclePoint(10, that.from, 530, 341, 6, 60);
        drawFreeLine(context, pos5.x, pos5.y, pos6.x, pos6.y);
        var pos7 = getCleclePoint(10, that.from, 530, 342, 6, 250);
        var pos8 = getCleclePoint(10, that.from, 508, 390, 6, 250);
        drawFreeLine(context, pos7.x, pos7.y, pos8.x, pos8.y);
      }
      if(that.from >= 10 && that.from < 20) {
        var pos1 = getCleclePoint(10, that.from, 510, 390, 35, 300);
        var pos2 = getCleclePoint(10, that.from, 360, 360, 30, 300);
        drawFreeLine(context, pos1.x, pos1.y, pos2.x, pos2.y);
      }
      if(that.from >= 20 && that.from < 30) {
        var localx = that.from * 18 - 15;
        var localy = that.from * 4.3 + 300;
        drawFreeLine(context, localx, localy, localx - 50, localy + 50);
      }
      that.from ++;
    } else {
      drawText(context, '生活就要画出来', 450, 590);
      clearInterval(inverval);
    }
  }, 20);
};

var drawImg = function(text) {
  img = new Image();
  img.src = 'img/logo_' + text + '.png';
  if(text === 'word') {
    img.onload = function() {
      context.drawImage(img, 280, 180);
    }
  } else {
    img.onload = function() {
      context.drawImage(img, 200, 130);
    }
  }
  
};

drawBody();

drawImg('word');
