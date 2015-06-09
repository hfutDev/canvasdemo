var el = function(name) {
  return document.getElementById(name);
};
var toggle = 0;
el('scene').onmousemove = function(e) {
  var mouseX = e.layerX;
  var mouseY = e.layerY;
  // 音乐点播
  if(mouseX < 493 && mouseX > 410 && mouseY < 67 && mouseY > 0 && toggle !== 1) {
    clearCanvas();
    toggle = 1;
  } else if(mouseX < 785 && mouseX > 708 && mouseY < 226 && mouseY > 178 && toggle !== 2) {
    clearCanvas();
    toggle = 2;
  } else if(mouseX < 785 && mouseX > 708 && mouseY < 554 && mouseY > 521 && toggle !== 3) {
    clearCanvas();
    toggle = 3;
  } else if(mouseX < 478 && mouseX > 410 && mouseY < 730 && mouseY > 677 && toggle !== 4) {
    clearCanvas();
    toggle = 4;
  } else if(mouseX < 194 && mouseX > 112 && mouseY < 554 && mouseY > 521 && toggle !== 5) {
    clearCanvas();
    drawWall();
    toggle = 5;
  } else if(mouseX < 192 && mouseX > 112 && mouseY < 226 && mouseY > 178 && toggle !== 6) {
    clearCanvas();
    drawNews();
    toggle = 6;
  }

};

var context =  el('scene').getContext('2d');

var clearCanvas = function() {
  context.beginPath();
  context.arc(450, 370, 290, 0, 2 * Math.PI, false);
  context.clip();
  context.clearRect(0, 0, 900, 740);
};

context.strokeStyle = '#fff';
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
  var arr = ['音乐点播', '易书网', '明理苑', '微盘', '涂鸦墙', '情报站'];

  for (var i = 0; i < 6; i ++) {
    //设置旋转角度
    var rotate = (((i - 1) * 60 - 30) * (Math.PI) / 180);//弧度   角度*Math.PI/180
    var x = 350 * Math.cos(rotate);
    var y = 350 * Math.sin(rotate);
    var dx = 310 * Math.cos(rotate);
    var dy = 310 * Math.sin(rotate);
    context.fillStyle = '#fff';
    drawCircle(context, 1, dx + 450, dy + 370, 3);
    drawText(context, arr[i], x + 450, y + 370);
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
var drawPointLine = function(context, x, y, s, lenth, rotate) {
  context.save();
  context.translate(x, y);
  context.rotate(rotate * Math.PI / 180);
  context.beginPath();
  context.moveTo(0, s);
  context.lineTo(0, s + lenth);
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

drawBody();
