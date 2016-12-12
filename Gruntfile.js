module.exports = function(grunt) {

    require('time-grunt')(grunt);
    var mozjpeg = require('imagemin-mozjpeg');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jekyll: {
            working: {
              options: {
                config: '_config.yml',
                drafts: true
              }
            },

            deploy: {
              options: {
                config: '_config.yml',
                drafts: false
              }
            }
        },

        express: {
            all: {
                options: {
                    port: 4000,
                    hostname: '0.0.0.0',
                    bases: ['_site'],
                    livereload: true
                }
            }
        },

        postcss: {
          options: {
            processors: [
              require('autoprefixer-core')({browsers: ['last 2 versions', '> 5%']})
            ]
          },

          dist: {
            src: '_site/css/styles.css',
            dest: '_site/css/styles.css'
          }
        },

        watch: {
            css: {
                files: [
                    '_sass/*.scss',
                    '_sass/**/*.scss',
                    'css/*.scss'
                ],
                tasks: ['jekyll:working', 'uglify', 'postcss']
            },

            js: {
                files: [
                    '_js/*.js'
                ],
                tasks: ['jekyll:working', 'uglify', 'postcss']
            },

            svg: {
                files: [
                    '_svgs/*.svg'
                ],
                tasks: ['svgstore', 'jekyll:working', 'uglify', 'postcss']
            },

            jekyll: {
                files: [
                    '**/*.html',
                    '**/*.md',
                    '_posts/*.md',
                    '_config.yml',
                    '*.html',
                    '*.md',
                    '!_site/**/*.html'
                ],
                tasks: ['jekyll:working', 'uglify', 'postcss']
            },

            options: {
                livereload: true
            }
        },

        uglify: {
            main: {
                files: {
                    '_site/main.js': '_js/*.js'
                }
            }
        },

        svgstore: {
            options: {
                prefix : '', // This will prefix each <g> ID
                includeTitleElement : false,
            },
            default : {
                files: {
                    '_includes/svg-defs.html': ['_svgs/*.svg'],
                }
            }
        },

        buildcontrol: {
            options: {
                dir: '_site',
                commit: true,
                push: true,
                message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
            },
            pages: {
                options: {
                    remote: 'https://github.com/JasonEtco/personal-site.git',
                    branch: 'gh-pages'
                }
            }
        },

        imagemin: {  
            tiles: {                          // Target
                  options: {                       // Target options
                    optimizationLevel: 3,
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [mozjpeg({quality: 85})]
                  },
                  files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'assets/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'assets/'                  // Destination path prefix
                  }]
                }
          },

          jekyll_post: {
            option: {
                dist: '_posts',
                format: 'markdown',
                comment: [
                    'shadow 	 - creates a box-shadow',
                    'rounded 	 - border-radius: 5px',
                    'full-width - removes max-width to be 100%',
                    'flex       - applicable on div wrapper'
                ]
            },
            questions: [
                {
                    config: 'title',
                    message: 'Title?',
                    default: 'Your Default Title'
                },
                {
                    config: 'tag',
                    message: 'Tag?',
                    default: 'web and front end'
                },
                {
                    config: 'shortname',
                    message: 'Shortened name, used in links',
                    default: 'short'
                },
                {
                    config: 'description',
                    message: 'Description',
                    default: 'bla bla bla'
                },
            ]
        },
    });

    grunt.loadNpmTasks('grunt-build-control');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-jekyll-post');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-svgstore');


    grunt.registerTask('default', ['svgstore', 'newer:imagemin', 'jekyll:working', 'uglify', 'postcss', 'express', 'watch']);
    grunt.registerTask('deploy',  ['svgstore', 'newer:imagemin', 'jekyll:deploy', 'uglify', 'postcss', 'buildcontrol:pages']);
    grunt.registerTask('img',  ['imagemin']);
    grunt.registerTask('post', ['jekyll_post']);
};