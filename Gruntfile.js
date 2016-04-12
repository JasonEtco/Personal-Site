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
          }

    });

    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-build-control');
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');


    grunt.registerTask('default', ['svgstore', 'newer:imagemin', 'jekyll:working', 'uglify', 'postcss', 'express', 'watch']);
    grunt.registerTask('deploy',  ['svgstore', 'newer:imagemin', 'jekyll:deploy', 'uglify', 'postcss', 'buildcontrol:pages']);
    grunt.registerTask('img',  ['imagemin']);

    grunt.task.registerTask('post', 'Create new jekyll posts from templates.', function() {
      var name = grunt.option('name'),
          category = grunt.option('cat'),
          date = new Date(),
          today = grunt.template.date(date, 'yyyy-mm-dd'),
          template,
          formatedName,
          data,
          content;

      if (name) {
        formatedName = name.replace(/[^a-z0-9]|\s+|\r?\n|\r/gmi, '-').toLowerCase();
        category = category ? category : 'blog';
        data = {
          name: name,
        };
        template = grunt.file.read('_post-template-' + category + '.md');
        content = grunt.template.process(template, {
          data: data
        });
        grunt.file.write('_posts/' + today + '-' + formatedName + '.md', content);
      }
      else {
        grunt.fail.warn('Name Required: `grunt post --name "My Post Name"`');
      }
    });
};