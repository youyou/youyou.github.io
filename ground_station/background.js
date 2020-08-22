chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('ground_station.html', {
    'outerBounds': {
      'width': 1366,
      'height': 768
    }
  });
});

