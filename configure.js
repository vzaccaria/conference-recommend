var {
  generateProject
} = require('diy-build')

var path = require('path')

generateProject(_ => {

  _.collectSeq("compile", _ => {
        _.cmd("./node_modules/.bin/webpack")
  })

  _.collectSeq("all", _ => {
        _.cmd("npm run start")
  })

  _.collect("update", _ => {
    _.cmd("make clean && ./node_modules/.bin/babel configure.js | node")
  });

    _.collect("deploy", _ => {
        var p = "/Users/zaccaria/development/github/vzaccaria.github.io/cf2016"
        _.cmd("make compile");
        _.cmd(`mkdir -p ${p}`)
        _.cmd(`cp index.html ${p}`)
        _.cmd(`cp -R ./assets ${p}`)
        _.cmd(`cd ${p} && git add . && git commit -m "cf2016 update" && hub push --all`);
    });

  ["major", "minor", "patch"].map(it => {
    _.collect(it, _ => {
      _.cmd(`make all`)
      _.cmd(`./node_modules/.bin/xyz -i ${it}`)
    })
  })

})
