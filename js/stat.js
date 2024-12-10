'use strict';

(function() {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 150;
  var CLOUD_Y = 10;
  var GAP = 10;
  var BAR_WIDTH = 40;
  var BAR_MAX_HEIGHT = 150;
  var BAR_GAP = 50;
  var PLAYER_NAME = 'Вы';

  var renderCloud = function(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function(arr) {
    if (!arr || arr.length === 0) {
      return 0;
    }

    var maxElement = arr[0];
    for (var i = 0; i < arr.length; ++i) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };

  window.renderStatistics = function(ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

    ctx.fillStyle = '#000000';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
    ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP * 3);

    var orderedNames = [];
    var orderedTimes = [];
    var playerIndex = names.findIndex((name) => name === PLAYER_NAME);
    orderedNames.push(names[playerIndex]);
    orderedTimes.push(times[playerIndex]);

    for (var i = 0; i < names.length; ++i) {
      if (names[i] !== PLAYER_NAME) {
        orderedNames.push(names[i]);
        orderedTimes.push(times[i]);
      }
    }

    var maxTime = Math.floor(getMaxElement(times));
    for (var j = 0; j < orderedNames.length; ++j) {
      var time = Math.floor(orderedTimes[j]);
      var barHeight = BAR_MAX_HEIGHT * time / maxTime;

      var gapX = CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_GAP) * j;
      var gapY = CLOUD_Y + GAP * 6 + (BAR_MAX_HEIGHT - barHeight);
      ctx.fillStyle = '#000000';
      ctx.fillText(time, gapX, gapY);

      var color;
      if (orderedNames[j] === PLAYER_NAME) {
        color = 'rgba(255, 0, 0, 1)';
      } else {
        var saturation = Math.floor(Math.random() * 100);
        color = 'hsl(240,' + saturation + '%,50%)';
      }

      ctx.fillStyle = color;
      ctx.fillRect(gapX, gapY + GAP * 2, BAR_WIDTH, barHeight);

      ctx.fillStyle = '#000000';
      ctx.fillText(orderedNames[j], gapX, gapY + GAP * 3 + barHeight);
    }
  };
})();
