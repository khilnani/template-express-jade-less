generator-express-jade-less
==========

## About

- My lightweight **Node.js** application template
- Based on **Express.js**
- Using **Jade** for HTML views
- That are converted to compiled **Handlebars** JavaScript templates
- With **CoffeeScript** support for client JavaScript
- As well as **LESS** CSS
- On top of Twitter **Bootstrap** and **JQuery**
- Wrapped up using the **GulpJS** build system
- That uses **Mocha**, **Chai** and **PhamtomJS** for tests,
- **JSHint** to keep my code clean,
- **Forever** to start and stop the server, saving logs to `./logs`,
- And **Travis CI** to keep me in check.

## Developer Notes

### Setup

- Search and replace all occurances of:
  - NAME
  - DESCRIPTION
- Run `sudo /setup-dev.sh` or `sudo ./setup-prod.sh` as appropriate.

### Server commands

- Run `npm start` or `./start.sh` to Start.
- Run `npm stop` or `./stop.sh` to Stop.

### Tasks

> `gulp default` executes the `build` task.

- All - `gulp all` - test and build
- Run tests - `gulp test` - lint, mocha and phantomjs
- Watch files - `gulp watch` - watch for jade, less and coffeescript
- Build files - `gulp build` - build jade, less and coffeescript
- Release - `gulp release` - test, build, bump versions and git tag
