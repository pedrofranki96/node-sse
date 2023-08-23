let http = require('http');

function onDigits(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache'
  });

  let i = 0;

  let timer = setInterval(write, 1000);
  write();

  function write() {
    i++;

    if (i % 15 == 0) {
      res.write('event: foobar\ndata: bye-bye\n\n');
      clearInterval(timer);
      res.end();
      return;
    } else if (i % 3 == 0) {
      res.write('event: foo\ndata: ' +  i + '\n\n');
    } else if (i % 5 == 0) {
      res.write('event: bar\ndata: ' + i + '\n\n');
    } 
  }
}

function accept(req, res) {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  if (req.url == '/sse') {
    onDigits(req, res);
    return;
  }
}


if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}