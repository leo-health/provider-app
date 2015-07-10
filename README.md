##Provider Web App

### Installation

You must have npm installed gloablly before running the following command :-

```sh
$ npm install --global gulp
$ npm install
```

### First Run

```sh
$ gulp dev
```
Now open your broswer and go to 'localhost:8888/'

### Commands

You need to run the following command in the project root, where is the same directoy as package.json

__The Gulp way__

```sh
$ gulp dev  // start a dev server
$ gulp tdd // start a dev server with automatic test running
$ gulp build  // build a production version
$ gulp test   // run test manually
$ gulp clean  // in case you need to clean the public folder
```

### Folder Structure

* src/       - where all the source code live
* assets/    - where all static assets live
* public/    - production level code after you run 'build' command
* \__test\__/  - all your tests go to this directly

__Note__ : assets/ and src/ will be compiled into public/ folder when you run build command

### Structure OverView

* React
* React Router
* Reflux ( Refactor of Flux )
* ES6 ( Harmony ) | if you use .js or .jsx extension
* CoffeeScript | if you use .coffee extension
* CJSX ( Coffee JSX ) | if you use .cjsx extension
* LoDash  ( Lightweight version of Underscore )
* Stylus ( CSS pre-processor )
* JEET ( Grid system for Stylus )
* Rupture ( Media Query support for Stylus )
* Jest ( Testing framework for React app )
* Browser Live Reload during development
* CSS / HTML / JS minification / Image optimization when built
* JS code duplication removal during built
* Optional TDD task to perform auto testing when file changes


### Suggested Workflow

1. Run 'gulp dev'  ( or npm start )
2. If you prefer TDD, do 'gulp tdd' instead
3. Go your browser and go to 'localhost:8888'  ( port is configurable )
4. Make code changes
5. Watch your code changes reflect on browser without refreshing
6. Repeat your development steps

Once you are ready to deploy, do the following :-

1. Run 'gulp clean' in case your built has old css
2. Run 'gulp build' when you want to generate production level code


### Extra Note

If you want to update the npm modules, execute the following commands, it will update all the modules for you.
Be careful though, if your application has dependencies on certain version, it might break your code ~  \o/ Yeah!

```sh
npm install -g npm-check-updates
npm-check-updates -u
```

If your OS complains cannot find gulp, please try to install gulp globally instead

```sh
npm install --global gulp
```

### Extra extra note
1) There is a tricky part about JEST in node and in gulp.

While using the 'npm test' works fine,  running 'gulp test' will fail because of node harmony flag

So please do yourself a favor by adding the following line to your .profile or .bashrc

```sh
alias gulp='node --harmony `which gulp`'
```
Now ready to get your hands dirty and good luck!
