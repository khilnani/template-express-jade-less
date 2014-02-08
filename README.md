generator-express-jade-less
==========

## About

- My lightweight **Node.js** application template
- Based on **Express.js**
- Using **Jade** or **Handlebars** for Node.js HTML views
- As well as client-side JavaScript templates 
- With **CoffeeScript** support for client JavaScript,
- JavaScript modules via **Browserify**
- As well as **LESS** CSS
- On top of Twitter **Bootstrap** and **JQuery**
- Wrapped up using the **GulpJS** build system
- That uses **Mocha**, **Chai** and **PhamtomJS** for tests,
- **JSHint** to keep my code clean,
- **Forever** to start and stop the server, saving logs to `./logs`,
- And **Travis CI** to keep me in check.

> If you don't like CoffeeScript, use plain JavaScript. 
> If you dont like Jade, you can use Handlebars HTML for Node Views
> if you don't like LESS and prefer regular CSS, that's OK too. Just write CSS :)

### Add On Need

- DB Connectors
- Session managers
- Heavy MV** Frameworks

## Developer Notes

### Setup

- Search and replace all occurances of:
  - NAME
  - DESCRIPTION
- Run `sudo /setup-dev.sh` or `sudo ./setup-prod.sh` as appropriate.

    > Installs global as well as local Node packages, and Bower dependencies.

### Environment Configuration

- `NODE_ENV` - 'development' or 'production'. 
- `process.env.PORT` - Default port is 8080.

### Server commands

- Development
  - `./NAME.js` or `node NAME.js`
- Production
  - Run `npm start` or `./start.sh` to Start.
  - Run `npm stop` or `./stop.sh` to Stop.

    > Logs are written to `./logs`


### Tasks

> `gulp default` executes the `build` task.

- `gulp all` - Run tests and Build.
- `gulp test` - Run tests - lint, mocha and phantomjs.
- `gulp watch` - Watch for jade, less and coffeescript file changes and re-build on the fly.
- `gulp build` - Re-build jade, less and coffeescript files.
- `gulp release` - Test, build, bump versions and git tag.
