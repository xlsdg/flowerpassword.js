const srcCss = './src/less';
const dstCss = './entry/asset/css';

const srcJs = './src/js';
const dstJs = './entry/asset/js';

const srcHtml = './src';
const dstHtml = './entry';



const gulp = require('gulp');
const del = require('del');


const lesshint = require('gulp-lesshint');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const browsersync = require('browser-sync').create();



gulp.task('clean-css', function() {
    return del([dstCss + '/**/*.css'], {
        dryRun: true
    });
});

gulp.task('build-css', ['clean-css'], function() {
    return gulp.src([srcCss + '/**/*.less'])
        .pipe(lesshint({
            'attributeQuotes': {'enabled': true},
            'borderZero': {'enabled': true, 'style': 'zero'},
            'comment': {'enabled': false, 'allowed': '^!'},
            'decimalZero': {'enabled': true, 'style': 'none'},
            'depthLevel': {'enabled': true, 'depth': 3},
            'duplicateProperty': {'enabled': true, 'exclude': []},
            'emptyRule': {'enabled': true},
            'finalNewline': {'enabled': true},
            'hexLength': {'enabled': true, 'style': 'short'},
            'hexNotation': {'enabled': true, 'style': 'lowercase'},
            'hexValidation': {'enabled': true},
            'idSelector': {'enabled': false, 'exclude': []},
            'importantRule': {'enabled': false},
            'importPath': {'enabled': true, 'filenameExtension': false, 'leadingUnderscore': false, 'exclude': []},
            'propertyOrdering': {'enabled': false, 'style': 'alpha'},
            'propertyUnits': {'enabled': true, 'valid': [], 'invalid': [], 'properties': {}},
            'qualifyingElement': {'enabled': true, 'allowWithAttribute': true, 'allowWithClass': true, 'allowWithId': false},
            'selectorNaming': {'enabled': true, 'disallowUppercase': true, 'disallowUnderscore': true, 'disallowDash': false, 'exclude': []},
            'singleLinePerProperty': {'enabled': true},
            'singleLinePerSelector': {'enabled': true, 'style': '18f'},
            'spaceAfterPropertyColon': {'enabled': true, 'style': 'one_space'},
            'spaceAfterPropertyName': {'enabled': true, 'style': 'no_space'},
            'spaceAfterPropertyValue': {'enabled': true, 'style': 'no_space'},
            'spaceAroundComma': {'enabled': true, 'allowNewline': false, 'style': 'after'},,
            'spaceAroundOperator': {'enabled': true, 'style': 'both'},
            'spaceBeforeBrace': {'enabled': true, 'style': 'one_space'},
            'spaceBetweenParens': {'enabled': true, 'style': 'no_space'},
            'stringQuotes': {'enabled': true, 'style': 'single'},
            'trailingSemicolon': {'enabled': true},
            'urlFormat': {'enabled': true, 'style': 'relative'},
            'urlQuotes': {'enabled': true},
            'zeroUnit': {'enabled': true, 'style': 'no_unit', 'units': [], 'exclude': []},
            'fileExtensions': ['.less']
        }))
        .pipe(lesshint.reporter())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: [
                'ie >= 8',
                'ff >= 10',
                'chrome >= 20',
                'safari >= 7',
                'opera >= 10',
                'ios >= 7',
                'android >= 2.3'
            ]
        }))
        .pipe(cleancss({
            'compatibility': 'ie8',
            'noAdvanced': true
        }))
        .pipe(concat(dstCss + '/all.css'))
        .pipe(gulp.dest(dstCss + '/'));
});


gulp.task('clean-js', function() {
    return del([dstJs + '/**/*.js'], {
        dryRun: true
    });
});

gulp.task('build-js', ['clean-js'], function() {
    return gulp.src([srcJs + '/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(eslint({
            rules: {
                'strict': 2,
                'arrow-parens': 0,
                'no-debugger': 2,
                'no-extra-semi': 1,
                'no-inner-declarations': [2,'both'],
                'valid-jsdoc': [2,{'requireReturn':false,'prefer':{'returns':'return'}}],
                'curly': [2,'all'],
                'no-eval': 2,
                'no-extend-native': [2,{'exceptions':['Object']}],
                'no-new-wrappers': 2,
                'no-with': 2,
                'no-undef': 2,
                'no-unused-vars': [2,{"args":"none"}],
                'array-bracket-spacing': [2,'never',{}],
                'indent': [2,4,{'SwitchCase':1}],
                'no-array-constructor': 2,
                'no-mixed-spaces-and-tabs': [2,'smart-tabs'],
                'no-new-object': 2,
                'object-curly-spacing': [2,'never',{}],
                'semi': [2,'always'],
                'space-before-function-paren': [2,'never'],
                'max-len': [1,80,4,{'ignoreComments':true,'ignoreUrls':true}]
            },
            globals: [
                'jQuery',
                '$'
            ],
            envs: [
                'browser'
            ]
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(concat(dstJs + '/all.js'))
        .pipe(sourcemaps.write(dstJs + '/', {
            addComment: false
        }))
        .pipe(gulp.dest(dstJs + '/'));
});


gulp.task('clean-html', function() {
    return del([dstHtml + '/*.html'], {
        dryRun: true
    });
});

gulp.task('build-html', ['clean-html'], function() {
    return gulp.src([srcHtml + '/*.html'])
        .pipe(gulp.dest(dstHtml + '/'));
});


gulp.task('build-all', ['build-css', 'build-js', 'build-html'], function() {
    return console.log('Build-All task done.');
});

gulp.task('default', ['build-all'], function() {
    return console.log('Default task done.');
});


gulp.task('server', function() {
    browsersync.init({
        server: {
            baseDir: dstHtml + '/'
        },
        proxy: {
            target: '127.0.0.1:8899'
        }
    });

    gulp.watch(srcCss + '/**/*.less', ['build-css']);
    gulp.watch(srcJs + '/**/*.js', ['build-js']);
    gulp.watch(srcHtml + '/**/*.html').on('change', browsersync.reload);
});

gulp.task('watch', function() {
    return gulp.watch([srcCss + '/**/*.less', srcJs + '/**/*.js', srcHtml + '/**/*.html'], ['build-all']).on('change', function(event) {
        console.log('Type: ' + event.type);
        console.log('Path: ' + event.path);
    });
});
