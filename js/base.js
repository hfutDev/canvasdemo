var el = function(name) {
  return document.getElementById(name);
};

var context =  el('scene').getContext('2d');

var context2 =  el('scene2').getContext('2d');

context.strokeStyle = '#fff';
context.fillStyle = '#1cc1e8';
context.textAlign = 'center';

context2.strokeStyle = '#fff';
context2.fillStyle = '#1cc1e8';

context.font = '20px "Microsoft YaHei"';

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

var drawPointLine = function(context, x, y, s, lenth, rotate) {
  context.save();
  context.translate(x, y);
  context.rotate(rotate * Math.PI / 180);//每小时旋转30度
  context.beginPath();
  context.moveTo(0, s);
  context.lineTo(0, s + lenth);
  context.stroke();
  context.closePath();
  context.restore();
}

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

var drawBody = function() {
  drawCircle(context, 0, 450, 370, 290);
  drawTitle(context);
}

var drawNews = function() {
  var that = this;
  that.from = 130;
  drawCircle(context2, 1, 450, 320, 130);
  var inverval = setInterval(function() {
    if(that.from < 260) {
      that.from += 8;
      if(that.from > 130 && that.from < 160) {
        drawCircle(context2, 0, 450, 320, 180 - (that.from / 2));
      } else if(that.from > 160 && that.from < 220) {
        drawPointLine(context2, 450, 320, 120, 120, (that.from - 20)/8);
      } else if(that.from > 220 && that.from < 260) {
        drawLine(context2, 0, 373, (that.from - 135) * 3, 150)
      }
      if(that.from < 250) {
        drawLine(context, 0, 200, that.from + 130, 500);
      }
    }else {
      context2.beginPath();
      context2.arc(450, 320, 95, 1.6 * Math.PI, 1.9 * Math.PI, false);
      context2.stroke();
      drawText(context, '校园生存全攻略', 450, 590);
      clearInterval(inverval);
    }
  }, 30);
};

drawBody();

drawNews();