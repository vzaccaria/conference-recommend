var {
  generateProject
} = require('diy-build')

var path = require('path')

generateProject(_ => {

    _.collectSeq("all", _ => {
        _.cmd("./node_modules/.bin/webpack")
  })


  _.collect("update", _ => {
    _.cmd("make clean && ./node_modules/.bin/babel configure.js | node")
  });

  ["major", "minor", "patch"].map(it => {
    _.collect(it, _ => {
      _.cmd(`make all`)
      _.cmd(`./node_modules/.bin/xyz -i ${it}`)
    })
  })

})
