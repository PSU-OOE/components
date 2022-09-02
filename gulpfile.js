const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const bulkSass = require('gulp-sass-bulk-import');
const sourcemaps = require('gulp-sourcemaps');
const svgSprite = require('gulp-svg-sprite');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const stripBOM = require('gulp-stripbom');
const MODULE_BASE_PATH = './docroot/modules/custom/';
const SASS_SRC_PATH = '/src/scss/*.scss';
const JS_SRC_PATH = '/src/js/app/';
const JS_SRC_FILE = 'app.js';

const CSS_DEST_PATH = '/css';
const JS_DEST_PATH = '/js/';

const JS_WATCH_PATHS = ['/src/js/*.js', '/src/js/**/*.js'];
const SASS_WATCH_PATHS = ['/src/scss/*.scss', '/src/scss/**/*.scss'];

const THEME_CONFIG = require('./gulp.theme.config.json');
const MODULE_CONFIG = require('./gulp.modules.config.json');

const scripts_module = function (done) {
  MODULE_CONFIG.modules.map(function(moduleName) {
    const js_src = MODULE_BASE_PATH + moduleName + JS_SRC_PATH + JS_SRC_FILE;
    gulp.src(js_src)
      .pipe(uglify())
      .pipe(gulp.dest(MODULE_BASE_PATH + moduleName + JS_DEST_PATH + JS_SRC_FILE));
  });
  done();
};

const sass_modules = function(done) {
  const tasks = MODULE_CONFIG.modules.map(function(moduleName) {
    return gulp.src(MODULE_BASE_PATH + moduleName + SASS_SRC_PATH)
      .pipe(sourcemaps.init())
      .pipe(bulkSass())
      .pipe(sass({
        outputStyle: 'compressed',
        includePaths: ['sass']
      })).on('error', sass.logError)
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(MODULE_BASE_PATH + moduleName + CSS_DEST_PATH));
  });
  done();
  return tasks;
};

const js_theme = function(done) {
  const fs = require('fs');
  const files = fs.readdirSync(THEME_CONFIG.source.js);

  files.forEach(function(file) {
    const js_src = THEME_CONFIG.source.js + "/" + file;
    gulp.src(js_src)
      .pipe(uglify())
      .pipe(gulp.dest(THEME_CONFIG.buildLocation.js));
  });
  done();
};

const sass_theme = function(done) {

  // Compile non-SASS.
  gulp.src(THEME_CONFIG.source.css)
    .pipe(gulp.dest(THEME_CONFIG.buildLocation.css));

  const result = gulp.src(THEME_CONFIG.source.sass)
    .pipe(sourcemaps.init())
    .pipe(bulkSass())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['sass']
    })).on('error', sass.logError)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(THEME_CONFIG.buildLocation.css))
    .pipe(gulp.dest(THEME_CONFIG.buildLocation.patternlab + '/source/css/worldcampus'));
  done();
  return result;
};

const patternlab_components = function(done) {

  const result = gulp.src(THEME_CONFIG.source.patternlab_components)
    .pipe(sourcemaps.init())
    .pipe(bulkSass())
    .pipe(sass({
      outputStyle: 'compressed',
      precision: 6,
      includePaths: ['sass']
    })).on('error', sass.logError)
    .pipe(stripBOM())
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(THEME_CONFIG.buildLocation.patternlab + '/source/css/worldcampus-components'));
  done();
  return result;
};

const components = function(done) {
  const fs = require('fs');
  const components = fs.readdirSync(THEME_CONFIG.source.components).filter(function(file) {
    return fs.statSync(THEME_CONFIG.source.components + '/' + file).isDirectory();
  });

  components.forEach(function(component) {

    const dist = THEME_CONFIG.source.components + '/' + component + '/dist';
    // Compile the SCSS.
    gulp.src(THEME_CONFIG.source.components + '/' + component + '/src/scss/*.scss')
      .pipe(sourcemaps.init())
      .pipe(bulkSass())
      .pipe(sass({
        outputStyle: 'compressed',
        precision: 6,
        includePaths: ['sass']
      })).on('error', sass.logError)
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(dist));

    // Compile the JS
    const js_src = THEME_CONFIG.source.components + '/' + component + '/src/js/scripts.js';
    if (fs.existsSync(js_src)) {
      gulp.src(js_src)
        .pipe(uglify())
        .pipe(gulp.dest(dist));
    }
  });
  done();
};

const sprites = function(done) {

  gulp.src(THEME_CONFIG.source.sprites + '/src/*.svg')
    .pipe(svgSprite({
      svg: {
        namespaceIDs: false,
        namespaceClassnames: false,
        xmlDeclaration: false,
        doctypeDeclaration: false,
      },
      mode: {
        defs: {
          inline: true,
        },
      },
      shape: {
        transform: [],
      }
    }))
    .pipe(gulp.dest(THEME_CONFIG.source.sprites + '/dist'));

  done();
};

const watch = function() {
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/scss/**/*.scss', ['sass']);

  THEME_CONFIG.watchPaths.sass.map(function(watchPath) {
    gulp.watch(watchPath, ['sass-theme']);
  });

  THEME_CONFIG.watchPaths.js.map(function(watchPath) {
    gulp.watch(watchPath, ['scripts-theme']);
  });

  MODULE_CONFIG.modules.map(function(moduleName) {
    JS_WATCH_PATHS.map(function(watchPath) {
      gulp.watch(MODULE_BASE_PATH + moduleName + watchPath, ['scripts-modules']);
    });

    SASS_WATCH_PATHS.map(function(watchPath) {
      gulp.watch(MODULE_BASE_PATH + moduleName + watchPath, ['sass-modules']);
    });
  });
};

gulp.task('default', gulp.series(
  gulp.series(sprites, sass_theme, js_theme, sass_modules, scripts_module, components, watch, patternlab_components)
));

gulp.task('components', gulp.series(components));
gulp.task('sprites', gulp.series(sprites));
gulp.task('patternlab_components', gulp.series(patternlab_components));
gulp.task('dist', gulp.series(sprites, sass_theme, js_theme, sass_modules, scripts_module, components, patternlab_components));
