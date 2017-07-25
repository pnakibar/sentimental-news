const _ = require("lodash");
const debug = require("debug")("crawler");
debug("starting crawler", new Date());

const visited = [];

const Crawler = require("crawler");

const c = new Crawler({
  maxConnections: 1,
  callback: function(error, res, done) {
    if (error) {
      debug("error at", res.url, "message", error.message);
      console.log(error);
    } else {
      debug("visited", res.options.uri);
      const $ = res.$;
      $("a").each(function() {
        const href = String(this.attribs.href);
        if (href.includes("http://g1.globo.com") && !visited.includes(href)) {
          c.queue(href);
          // debug("queued url", href);
        }
      });
    }
    debug("done processing", res.options.uri);
    done();
  }
});

c.queue("http://www.g1.globo.com");
