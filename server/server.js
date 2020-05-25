const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("./webpack.config");
const express = require("express");
const app = express();
const compiler = webpack(webpackConfig);
const bodyParser = require("body-parser");
app.use(webpackDevMiddleware(compiler, {
  publicPath: "/__build__/",
  stats: {
    colors: true,
    chunks: false
  }
}));

app.use(webpackDevMiddleware(compiler));
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const router = express.Router();
router.get("/simple/get", (req, res) => {
  res.json({
    msg: "hello!!"
  });
});


baseRouters();


errorRouters();


extendRouters();

router.get("/interceptors/test", (req, res) => {
  res.end("hello");
});
router.post("/default_config", (req, res) => {
  res.json(req.body);
});

cancelRouters();
app.use(router);

const port = process.env.PORT || 8081;

module.exports = app.listen(port, () => {
  console.log(`${port} listening`);
});

function extendRouters() {
  router.get("/extend/get", (req, res) => {
    res.json({k: "get"});
  });
  router.delete("/extend/delete", (req, res) => {
    res.json({k: "delete"});
  });
  router.options("/extend/options", (req, res) => {
    res.json({k: "options"});
  });
  router.head("/extend/head", (req, res) => {
    res.json({k: "head"});
  });
  router.post("/extend/post", (req, res) => {
    res.json({k: "post"});
  });
  router.put("/extend/put", (req, res) => {
    res.json({k: "put"});
  });
  router.patch("/extend/patch", (req, res) => {
    res.json({k: "patch"});
  });
  router.get("/extend/getUser", (req, res) => {
    res.json({
      message: "ok",
      result: {name: "jj", age: 18, sex: "男"}
    });
  });
}

function errorRouters() {
  router.get("/error/get", (req, res) => {
    res.json(req.query);
  });
  router.get("/error/timeout", (req, res) => {
    setTimeout(
      () => {
        res.json(req.query);
      }, 2100
    );
  });
  router.get("/error/responseFailed", (req, res) => {
    res.status(500);
    res.end();
  });
}

function baseRouters() {
  router.get("/base/get", (req, res) => {
    res.json(req.query);
  });
  router.post("/base/post", (req, res) => {
    res.json(req.body);
  });
  router.post("/base/buffer", (req, res) => {
    const msg = [];
    req.on("data", chunk => {
      chunk && msg.push(chunk);
    });
    req.on("end", () => {
      let buf = Buffer.concat(msg);
      res.json(buf.toJSON());
    });
  });
}

function cancelRouters() {
  router.get("/cancel/get", (req, res) => {
    setTimeout(() => {
      res.json("ok");
    }, 1000);
  });
  router.post("/cancel/post", (req, res) => {
    setTimeout(() => {
      res.json(req.body);
    }, 1000);
  });
}

