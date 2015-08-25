module.exports = function(grunt) {

    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: {
            jekyllBuild: {
                command: 'jekyll build'
            },

            jekyllServe: {
                command: 'jekyll serve'
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
                tasks: ['shell:jekyllBuild', 'autoprefixer']
            },

            js: {
                files: [
                    '_js/*.js'
                ],
                tasks: ['uglify', 'shell:jekyllBuild']
            },

            jekyll: {
                files: [
                    '_includes/*.html',
                    '_layouts/*.html',
                    '_posts/*.md',
                    '_config.yml',
                    '*.html',
                    '*.md'
                ],
                tasks: ['shell:jekyllBuild']
            },

            options: {
                livereload: true
            }
        },

        uglify: {
            main: {
                files: {
                    'main.js': '_js/*.js'
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
                    remote: 'https://github.com/DevShelfBlog/DevShelf.git',
                    branch: 'gh-pages'
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
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-build-control');
    grunt.loadNpmTasks('grunt-svgstore');

    grunt.registerTask('default', ['uglify', 'svgstore', 'shell:jekyllBuild', 'postcss', 'express', 'watch']);
    grunt.registerTask('deploy',  ['uglify', 'svgstore', 'shell:jekyllBuild', 'postcss', 'buildcontrol:pages']);
};