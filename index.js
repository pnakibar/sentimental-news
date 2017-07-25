const _ = require("lodash");
const debugGeneral = require("debug")("crawler:general");
const debugQueue = require("debug")("crawler:queue");
debugGeneral("starting crawler", new Date());

const visited = [];

const Crawler = require("crawler");

const c = new Crawler({
  maxConnections: 1,
  callback: function(error, res, done) {
    if (error) {
      debugGeneral("error at", res.url, "message", error.message);
      console.log(error);
    } else {
      debugGeneral("visited", res.options.uri);
      const $ = res.$;
      $("a").each(function() {
        const href = String(this.attribs.href);
        if (href.includes("http://g1.globo.com") && !visited.includes(href)) {
          c.queue(href);
          debugQueue("queued url", href);
        }
      });
    }
    debugGeneral("done processing", res.options.uri);
    done();
  }
});

c.queue("http://www.g1.globo.com");
