const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const bulkSass = require('gulp-sass-bulk-import');
const sourcemaps = require('gulp-sourcemaps');
const svgSprite = require('gulp-svg-sprite');
const uglify = require('gulp-uglify-es').default;

const components = function(done) {
  const fs = require('fs');
  const components = fs.readdirSync('packages').filter(function(file) {
    return fs.statSync('packages/' + file).isDirectory();
  });

  components.forEach(function(component) {

    const dist = 'packages/' + component + '/dist';

    // Compile the SCSS.
    gulp.src('packages/' + component + '/src/scss/*.scss')
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
    const js_src = 'packages/' + component + '/src/js/scripts.js';
    if (fs.existsSync(js_src)) {
      gulp.src(js_src)
        .pipe(uglify())
        .pipe(gulp.dest(dist));
    }
  });
  done();
};

const sprites = function(done) {

  gulp.src('packages/sprite/src/*.svg')
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
    .pipe(gulp.dest('packages/sprite/dist'));

  done();
};

const watch = function() {
  gulp.watch('packages/*/src/*', ['components']);
  gulp.watch('packages/sprite/src/*', ['sprite']);
};

gulp.task('default', gulp.series(
  gulp.series(sprites, components, watch)
));

gulp.task('components', gulp.series(components));
gulp.task('sprites', gulp.series(sprites));
gulp.task('dist', gulp.parallel(
  gulp.series(components),
  gulp.series(sprites)
));