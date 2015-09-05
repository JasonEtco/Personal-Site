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
                    port: 8080,
                    hostname: '0.0.0.0',
                    bases: ['_site/'],
                    // livereload: true
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
        
        uglify: {
            main: {
                files: {
                    '_site/main.js': '_js/*.js'
                }
            }
        },

        watch: {
            css: {
                files: [
                    '_sass/*.scss',
                    '_sass/**/*.scss',
                    'css/*.scss'
                ],
                tasks: ['shell:jekyllBuild', 'postcss', 'uglify']
            },

            js: {
                files: [
                    '_js/*.js'
                ],
                tasks: ['uglify']
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
                tasks: ['shell:jekyllBuild', 'postcss', 'uglify']
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

        ftp_push: {
            your_target: {
              options: {
                authKey: "key1",
                host: "jasonetcovitch.com",
                dest: "/public_html/",
                port: 21
              },
              files: [
                {
                  expand: true,
                  cwd: '_site/',
                  src: [ "**/*" ]
                }
              ]
            }
          }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-ftp-push');

    grunt.registerTask('default', ['svgstore', 'shell:jekyllBuild', 'uglify', 'postcss', 'express', 'watch']);
    grunt.registerTask('deploy',  ['svgstore', 'shell:jekyllBuild', 'uglify', 'postcss', 'ftp_push']);
};