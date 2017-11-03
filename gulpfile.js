// Include gulp
var gulp               = require('gulp'),
    request           = require('request'),
    unzip              = require('gulp-unzip'),
    fs                 = require('fs'),
    pump               = require('pump'),
    glob               = require('glob'),
    browserSync        = require('browser-sync'),        //browser sync
    nodemon            = require('gulp-nodemon'),        //server livereload
    reload             = browserSync.reload,             //force reload
    del                = require('del'),                 //remove directories
    pkg                = require('./package.json'),      //read package.json
    prompt             = require('gulp-prompt'),         //prompts user for feedback 
    bump               = require('gulp-bump'),           //bumps package.json version
    git                = require('gulp-git'),            //git 
    path               = require('path'),                //path 
    jshint             = require('gulp-jshint'),         //lint javascript
    gulpNgConfig       = require('gulp-ng-config'),      //creat angular constants
    gulpUtil           = require('gulp-util'),           //gulp utilities
    cssnano            = require('gulp-cssnano');        //css nano
    purge              = require('gulp-css-purge'),              //purge duplicate css
    runSequence        = require('run-sequence'),       //run tasks synchronously
    historyApiFallback = require('connect-history-api-fallback'),
    rename             = require('gulp-rename'),
    replace            = require('gulp-replace');
    loopbackAngular    = require('gulp-loopback-sdk-angular'),
    strip              = require('gulp-strip-comments');
    $                  = require('gulp-load-plugins')(); //loads other small plugins using $


/* ==========================================================================
   Sub Tasks 
========================================================================== */


 /* LB SERVICES _ TODO FIGURE OUT HOW TO DYNAMICALLY PICK FROM API FOLDER
========================================================================== */
gulp.task('lb-services', function () {
    return gulp.src('../interloop2-api/server/server.js')
    .pipe(loopbackAngular())
    .pipe(rename('lb-services.js'))
    .pipe(gulp.dest('./client/assets/js'));
});

/* ======================================================================== */

// optimize images
gulp.task('images', function() {
  return gulp.src('./client/assets/img/**/*')
    .pipe($.changed('./build/assets/img'))
    /* .pipe($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    */
    .pipe(gulp.dest('./build/assets/img'));
});

gulp.task('favicons', function() {
  return gulp.src(['./client/favicon.ico', './client/logo.png'])
    .pipe(gulp.dest('./build/'));
});


// copy fonts from a module outside of our project (like Bower)
gulp.task('fonts', function() {
  gulp.src('./client/assets/**/*.{ttf,woff,woff2,eof,eot,svg}')
    .pipe(gulp.dest('./build/assets'));
});

// copy fonts from a module outside of our project (like Bower)
gulp.task('fontastic', function() {
  // http://app.fontastic.me/download/font/rC29FChZSxwfNGqaLLUSkd

   return request('http://app.fontastic.me/download/font/rC29FChZSxwfNGqaLLUSkd')
    .pipe(fs.createWriteStream('./build/interloop-font/interloop-font.zip'))
    .pipe(unzip('./build/interloop-font/interloop-font.zip'))
    .pipe(gulp.dest('./build/assets/interloop-font'))
});

// minify JS
gulp.task('minify-js', function() {
  gulp.src('js/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('./build/'));
});

// minify HTML
gulp.task('minify-html', function() {
  var opts = {
    comments: true,
    spare: true,
    conditionals: true
  };

  gulp.src('./*.html')
    .pipe($.minifyHtml(opts))
    .pipe(gulp.dest('./build/'));
});

// delete build folder
gulp.task('clean:build', function (cb) {
  del([
    './build/'
    // if we don't want to clean any file we can use negate pattern
    //'!dist/mobile/deploy.json'
  ], cb);
});

// Lint javascript files
gulp.task('lint', function() {
    //get js files
    return gulp.src(['./client/**/*.js', '!./client/lib/**/*.js'])
        //run through js hint
       .pipe(jshint())
       // report errors using stylish reporter
       .pipe(jshint.reporter('jshint-stylish'))
  });


// copy build folder contents into electron
gulp.task('copy:fonts', function() {
    return gulp.src(['./ui-kit/fonts/**/*'])
    .pipe(gulp.dest('./client/assets/fonts/'));
});


// SASS task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', ['copy:fonts'], function() {
  return gulp.src('./client/interloop.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      style: 'expanded'
    }))
    .on('error', function(e) {
      gulpUtil.log(e);
      $.notify.onError({
      title: 'SASS Failed',
      message: 'Error(s) occurred during compile!'
     })
    })
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./client/assets/css'))
    .pipe(reload({
      stream: true
    }))
    .pipe($.notify({
      message: 'Styles task complete'
    }));
});

// SASS Build task
gulp.task('sass:build', function() {
  var s = $.size();

  return gulp.src('./client/interloop.scss')
    .pipe($.sass({
      style: 'compact'
    }))
    .pipe($.autoprefixer('last 3 version'))
    .pipe($.shorthand())
    .pipe(purge())
    .pipe($.uncss({
      html: ['./client/index.html', './client/**/*.tpl.html'],
      ignore: [
        //place css classes that should be added anyways
      ]
    }))
    .pipe($.minifyCss({
      keepBreaks: false,
      aggressiveMerging: false,
      advanced: false,
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest('build/assets/css'))
    .pipe(s)
    .pipe($.notify({
      onLast: true,
      message: function() {
        return 'Total CSS size ' + s.prettySize;
      }
    }));
});

//set up preload string
// electron preload images
var preloadImages = '';

gulp.task('preload:electron', function () {
  glob.sync("./client/assets/img/**/*.+(jpg|png|svg)")
  .forEach(function(file) {
  var module = path.basename(file)
  var extrapath = /[^/]*$/.exec(path.dirname(file))[0] == 'img' ? '' : /[^/]*$/.exec(path.dirname(file))[0] + '/';

  preloadImages = preloadImages.concat('<img src="assets/img/' + extrapath + module + '" width="1" height="1" />' + '\n' + '\t' + '\t')
  })
  // gulpUtil.log(preloadImages);
});
  
// index.html build
// script/css concatenation
gulp.task('usemin', function(cb) {
   return gulp.src('./client/index.html')
    // add templates path
    .pipe($.htmlReplace({
      'fullstory': '<script type="text/javascript" src="assets/js/fullstory.js"></script>',
      'strictdi': '<html lang="en" ng-app="interloop" ng-strict-di>',
      // 'fontastic': '<link rel="stylesheet" href="assets/css/interloop-font.css" />',
      'apptemplates': '<script type="text/javascript" src="../build/assets/js/templates.js"></script>',
      'basehref': '<base href="/">'
    }))
    .pipe(
        $.usemin({
        css: [$.minifyCss(), $.rev()],
        jslibs:  [$.uglify(), $.rev()],
        nglibs: [$.ngAnnotate(), $.uglify().on('error', gulpUtil.log), $.rev()], 
        modules: [$.ngAnnotate(), strip(), $.babel({
              presets: ['es2015']
          }), $.uglify({mangle: true}).on('error', gulpUtil.log), $.rev()],
        templates: [$.rev()]
      })) 
    .pipe(gulp.dest('./build/'))
    callback();
});



// $.uglify().on('error', gulpUtil.log)

gulp.task('usemin:electron', function(cb) {
  return gulp.src('./client/index.html')
    // add templates path
    .pipe($.htmlReplace({
      'fullstory': '<script type="text/javascript" src="assets/js/fullstory.js"></script>',
      'strictdi': '<html lang="en" ng-app="interloop" ng-strict-di>',
      // 'fontastic': '<link rel="stylesheet" href="assets/css/interloop-font.css" />',
      'apptemplates':   '<script type="text/javascript" src="../build/assets/js/templates.js"></script>',
      'basehref': '<base href="./">',
      'preload': '<div id="preload">' + preloadImages + '</div>'
    }))
    .pipe($.usemin({
      css: [$.minifyCss(), $.rev()],
      jslibs:  [$.ngAnnotate(), $.uglify().on('error', gulpUtil.log), $.rev()], 
      nglibs: [$.uglify().on('error', gulpUtil.log), $.rev()],
      modules: [$.ngAnnotate(), strip(), $.babel({
              presets: ['es2015']
          }), $.uglify({mangle: false}).on('error', gulpUtil.log), $.rev()],
      templates: [$.rev()]
    }))
    .pipe(gulp.dest('./build/'));
    callback();
});

// delete client config file
gulp.task('clean:electron', function(cb) {
    del([
        './electron/app/**/*', 
        '!./electron/app/package.json'
     ], cb);
});

// copy build folder contents into electron
gulp.task('copy:electron', function() {
    return gulp.src(
      ['./build/**/**/*',       
       './client/connection-error.html',
       './client/set-subdomain.html'])
    .pipe(gulp.dest('./electron/app'));
});


// copy build folder contents into electron
gulp.task('copy:build', function() {
    return gulp.src(
      ['./client/connection-error.html'])
    .pipe(gulp.dest('./build/'));
});


// copy build folder contents into electron
gulp.task('fonts:electron', function() {
    return gulp.src(['./build/assets/fonts/**/*'])
    .pipe(gulp.dest('./electron/app/assets/fonts'));
});


// make templateCache from all HTML files
gulp.task('templates', function() {
  return gulp.src([
      './client/**/*.tpl.html', //get .tpl files
      '!./client/modules/DEPRECATED-*/**/*', 
      '!./client/modules/__dev/**/*', //ignore dev modules
      '!./lib/c3-angular/**/*',
      '!./lib/ment.io/**/*'
    ])
    .pipe($.minifyHtml({empty: true}))
    .pipe($.angularTemplatecache({
      module: 'interloop',
    }))
    .pipe($.wrap('(function(){\n"use strict";\n<%= contents %>\n})();'))
    .pipe(gulp.dest('build/assets/js'));
});

//remove index comments
gulp.task('removeComments', function () {
  return gulp.src('./build/index.html', {base: './'})
    .pipe($.removeHtmlComments())
    .pipe($.removeEmptyLines())
    .pipe(gulp.dest('./'));
});

// delete client config file
gulp.task('clean:lb-services', function(cb) {
    del([
        './client-m/www/assets/js/lb-services.js'
     ], cb);
});

gulp.task('lb-services-create', function () {
    return gulp.src('./server/server.js')
    .pipe(loopbackAngular())
    .pipe(rename('lb-services.js'))
    .pipe(gulp.dest('./client-m/www/assets/js'));
});
 
gulp.task('lb-services-replace', function(){
    return gulp.src(['./client-m/www/assets/js/lb-services.js'])
    .pipe(replace("urlBase + ", "'https://:baseUrl' + urlBase + "))
    .pipe(gulp.dest('./client-m/www/assets/js/'));
});

gulp.task('lb-services-m', function(callback) {
  runSequence(
    'clean:lb-services',
    'lb-services-create',
    'lb-services-replace',
    callback);
});

// delete client config file
gulp.task('clean:config', function(cb) {
    del([
        './client/client.env.js'
     ], cb);
});

// create client-config angular .config module (dev);
gulp.task('client-config:dev', ['clean:config'], function() {
  var json = JSON.parse(fs.readFileSync('./client/package.json'));

 return gulp.src('./client/client.env.json')
    .pipe(gulpNgConfig('client.env', {
      environment: 'dev',
      constants: {
        VERSION: json.version,
      }
      }))
    .pipe(gulp.dest('./client/'))
});

// create client-config angular .config module (prod);
gulp.task('client-config:prod', ['clean:config'], function() {
 var json = JSON.parse(fs.readFileSync('./package.json'));

 return gulp.src('./client/client.env.json')
    .pipe(gulpNgConfig('client.env', {
      environment: 'prod',
      constants: {
        VERSION: json.version,
      }
      }))
    .pipe(gulp.dest('./client/'))
});

// create client-config angular .config module (prod);
gulp.task('client-config:electron', ['clean:config'], function() {
  var json = JSON.parse(fs.readFileSync('./package.json'));

 return gulp.src('./client.env.json')
    .pipe(gulpNgConfig('client.env', {
      environment: 'electron',
      constants: {
        VERSION: json.version,
      }
      }))
    .pipe(gulp.dest('./client/'))
});

// calculate build folder size
gulp.task('build:size', function() {
  var s = $.size();

  return gulp.src('./build/**/*.*')
    .pipe(s)
    .pipe($.notify({
      onLast: true,
      message: function() {
        return 'Total build size ' + s.prettySize;
      }
    }));
});



gulp.task('bump', function() {

  var updateType = null;
  //Give the user a reminder to update the changelog before doing a relase
  return gulp.src('.')
  .pipe(prompt.prompt({
    type: 'list',
    name: 'bump',
    message: 'What type of version bump would you like to do?',
    choices: ['patch', 'minor', 'major']
    }, function(res){
    //set answer equal to updateType
    var updateType = res.bump;
    // bump version based on response
    gulp.src(['./package.json'])
    .pipe(bump({type: updateType}))
    .pipe(gulp.dest('./'))
    }))
});

//update changelog
gulp.task('changelog', function () {
    return gulp.src('CHANGELOG.md', {
      buffer: false
    })
    .pipe($.conventionalChangelog({
      preset: 'angular'
    }))
    .pipe(gulp.dest('./'));
});

// Run git commit to commit changelog [be sure to sync] 
gulp.task('commit-changelog', function(){
  return gulp.src(['./*', '!node_modules'])
    .pipe(git.commit('v' + pkg.version, {emitData:false}))
});

// message updated version
gulp.task('message:version', function() {
  var v = pkg.version;

  return gulp.src('.')
    .pipe($.notify({
      onLast: true,
      message: function() {
        return 'Version succesfully updates to: ' + v;
      }
    }));
});

// delete default loopback explorer ui
//DEPRECATED - forked on github and referenced in package.json instead
gulp.task('clean:explorer', function(cb) {
    del([
        './node_modules/loopback-component-explorer/public/index.html'
     ], cb);
});

// replace default loopback explorer ui with Interloop fonts/colors etc
//DEPRECATED - forked on github and referenced in package.json instead
gulp.task('replace:explorer', ['clean:explorer'], function() {
    return gulp.src(['./explorer-ui/index.html'])
    .pipe(gulp.dest('./node_modules/loopback-component-explorer/public/'));
});

gulp.task('reminder:release', function() {
  return gulp.src('./package.json')
  .pipe(prompt.confirm({
    message: '[REMINDER] Did you update version and/or update the .production server files?',
    default: true
  }))
 .pipe(gulp.dest('./'));
})

// FIRST RELEASE TASK - replace default loopback explorer ui with Interloop fonts/colors etc
gulp.task('clean:release-start', function(cb) {
  del([
        '_releases/' + '_tmp',
        '_releases/' + 'v' + pkg.version
     ], cb);
});

gulp.task('clean:release-end', function(cb) {
    del([
        '_releases/' + '_tmp',
     ], cb);
});

// replace default loopback explorer ui with Interloop fonts/colors etc
gulp.task('copy-release:base', function() {
    return gulp.src([
      './package.json',
      './providers.json',
      './bower.json',
      './.bowerrc'
      ])
    .pipe(gulp.dest('./_releases/' + '_tmp'));
});

// replace default loopback explorer ui with Interloop fonts/colors etc
gulp.task('copy-release:client', function() {
    return gulp.src(['./build/**/*'])
    .pipe(strip())
    .pipe(gulp.dest('./_releases/' + '_tmp' + '/client'));
});

// replace default loopback explorer ui with Interloop fonts/colors etc
gulp.task('copy-release:server', function() {
    return gulp.src([
      './server/**/*',
      './common/**/*',
      ], {base:"."})
       .pipe(gulp.dest('./_releases/' + '_tmp'));
});

gulp.task('zip-release', function() {
  return gulp.src('./_releases/' + '_tmp/**/*')
    .pipe($.zip('Interloop_v' + pkg.version +'.zip')) //create zip file
    .pipe(gulp.dest('./_releases/' + 'v' + pkg.version));
});

gulp.task('tar-release', function() {
  return gulp.src('./_releases/' + '_tmp/**/*')
    .pipe($.tar('Interloop_v' + pkg.version +'.tar')) //create tar file
    .pipe(gulp.dest('./_releases/' + 'v' + pkg.version));
});

// calculate build folder size
gulp.task('message:release', function() {
  var v = pkg.version;

  return gulp.src('.')
    .pipe($.notify({
      onLast: true,
      message: function() {
        return 'Release v' + v + ' Complete :)';
      }
    }));
});

// BUGFIX: warning: possible EventEmitter memory leak detected. 11 listeners added.
require('events').EventEmitter.prototype._maxListeners = 100;



gulp.task('removeConsoleLogs', function () {
    gulp.src(['./client/**/*.js', '!./client/lib/**/*'])
        .pipe($.stripDebug())
        .pipe($.replace('void 0;', ''))
        .pipe($.replace('void 0', ''))
        .pipe(gulp.dest('./client/'));
});

gulp.task('removeVoids', function () {
    gulp.src(['./client/**/*.js', '!./client/lib/**/*'])
        .pipe($.replace('void 0;', ''))
        .pipe($.replace('void 0', ''))
        .pipe(gulp.dest('./client/'));
});


//mobile tasks
//------------------------------------------

// copy build folder contents into electron
gulp.task('copy:mobile', function() {
    return gulp.src(
      ['./client/shared/**/*',])
    .pipe(gulp.dest('./mobile/www/shared/'));
});

gulp.task('copy:mobile-lb', function() {
    return gulp.src(
      ['./client/assets/js/lb-services.js',])
    .pipe(gulp.dest('./mobile/www/assets/js/'));
});



/* ==========================================================================
   Main Tasks
========================================================================== */

/* Default
========================================================================== */

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 5000;


//browser sync task
gulp.task('browser-sync', function () {
  //timeout needed to make sure loopback server is up & running
  setTimeout( function browsersSetup() {
  // for more browser-sync config options: http://.browsersync.io/docs/options/
  browserSync({
  server: {
    baseDir: "./client/",
    https: false,
    middleware: [ historyApiFallback() ]
  },
  ui: false, //disable browser sync ui
  browser: ["google chrome"],  // open the app in chrome
  })
 }, 2000);

   //js changes - lint and then reload
  gulp.watch('./client/**/*.js', {
    interval: 1000, // default 100
    debounceDelay: 1000, // default 500
    mode: 'poll'
    }, ['js-change']);
  //css changes - reload
  // gulp.watch('./client/**/*.css',  ['css']);
  //sass changes - process then reload
  gulp.watch(['./client/**/*.scss', './ui-kit/scss/**/*.scss'], {
    interval: 1000, // default 100
    debounceDelay: 1000, // default 500
    mode: 'poll'
    }, ['sass-change']);
  //html & template changes - reload
  gulp.watch(['./client/**/*.html', './client/**/*.tpl.html'],{
    interval: 1000, // default 100
    debounceDelay: 1000, // default 500
    mode: 'poll'
    }, ['bs-reload']);
  
});


//changes to files trigger tasks & browser sync updates
gulp.task('css', function () {
  return gulp.src('./client/**/*.css')
    .pipe(browserSync.reload({ stream: true }));
})
gulp.task('sass-change', ['sass'], function () {
  return gulp.src('./client/**/*.css')
    .pipe(browserSync.reload({ stream: true }));
})
gulp.task('js-change', function () {
  return gulp.src('./client/**/*.js')
    .pipe(browserSync.reload({ stream: true }));
})
//manually reload browser sync
gulp.task('bs-reload', function () {
  browserSync.reload();
});

//browser sync task
gulp.task('browser-sync:build', function () {
  //timeout needed to make sure loopback server is up & running
  setTimeout( function browsersSetup() {
  // for more browser-sync config options: http://.browsersync.io/docs/options/
  browserSync({
  server: {
      baseDir: './build/',
      https: false,
      middleware: [ historyApiFallback() ]
  },
  port: 4000,
  ui: false, //disable browser sync ui
  browser: ["google chrome"],  // open the proxied app in chrome
  })
 }, 2000);
});

gulp.task('default', ['serve']);

gulp.task('serve', function(callback) {
  runSequence(
    'client-config:dev',
    'browser-sync',
    callback);
});

gulp.task('serve:build', function(callback) {
  runSequence(
    'browser-sync:build',
    callback);
});

//remove templates.js
gulp.task('removeTemplates', function(cb) {
   del([
    './build/assets/js/templates.js'
  ], cb);
});


/* Build
========================================================================== */
/**
 * The build process consists of following steps:
 * 1. clean /build folder
 * 2. compile SASS files, minify and uncss compiled css
 * 3. copy and minimize images
 * 4. minify and copy all HTML files into $templateCache
 * 5. build index.html (adds cache-breaking hash to each static file)
 * 6. minify and copy all JS files
 * 7. copy fonts
 * 8. shows build folder size
 */

 gulp.task('build', function(callback) {
  runSequence(
    'clean:build',
    'sass:build',
    'images',
    'favicons',
    'client-config:prod',
    'templates',
    'fonts',
    // 'fontastic',
    'usemin',
    'copy:build',
    'removeTemplates',
    'removeComments',
    'build:size',
    callback);
});

 /* Build-Electron
========================================================================== */
/**
 * The build process consists of following steps:
 * 1. clean /build folder
 * 2. compile SASS files, minify and uncss compiled css
 * 3. copy and minimize images
 * 4. minify and copy all HTML files into $templateCache
 * 5. build index.html (adds cache-breaking hash to each static file)
 * 6. build index.html (adds cache-breaking hash to each static file)
 * 7. minify and copy all JS files
 * 8. copy fonts
 * 9. shows build folder size
 */

 gulp.task('build:electron', function(callback) {
  runSequence(
    'clean:build',
    'sass:build',
    'images',
    'favicons',
    'client-config:electron',
    'templates',
    'fonts',
    // 'fontastic',
    'preload:electron',
    'usemin:electron',
    'clean:electron',
    'copy:electron',
    'fonts:electron',
    'build:size',
    callback);
});






 /* Version
========================================================================== */

//simply outputs the current version from package.json
gulp.task('version:show', function () {
    //log package json version
    gulpUtil.log(gulpUtil.colors.blue('Interloop Current Version:'), gulpUtil.colors.green('v' + pkg.version));
});

gulp.task('version', ['version:show']);

/* Version Update
========================================================================== */
/**
 * The version update steps are:
 * 1. Choose type of update (path, minor, major)
 * 2. Conventional Changelog will pull commits & append to CHANGELOG.md
 * 3. Gulp will commit updated changelog with appropriate commit semantics
 * 4. [Manual] - Be sure to sync changelog update before making further code updates
 */

 gulp.task('version:update', function(callback) {
  runSequence(
    'bump',
    'changelog',
    'message:version',
    callback);
});


 /* Release
========================================================================== */
/**
 * The release process consists of following steps:
 * 1. run the build task
 * 2. clear out _release/_tmp folder & release folder if same version
 * 3. copy base files (package.json, etc)
 * 4. copy client files to /client
 * 5. copy server & common folders
 * 6. create zip file in release folder
 * 7. create tar file in release folder
 * 8. message release complete
 */

//release with build
 gulp.task('release', function(callback) {
  runSequence(
    'reminder:release',
    'build',
    'clean:release-start',
    'copy-release:base',
    'copy-release:client',
    'copy-release:server',
    'zip-release',
    'tar-release',
    'clean:release-end',
    'message:release',
    callback);
});


