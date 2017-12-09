module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Copy web assets from bower_components to more convenient directories.
        copy: {
            main: {
                files: [
                    // Vendor scripts.
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap-sass/assets/javascripts/',
                        src: ['**/*.js'],
                        dest: 'scripts/bootstrap-sass/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/jquery/dist/',
                        src: ['**/*.js', '**/*.map'],
                        dest: 'scripts/angular/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/jquery/dist',
                        src: ['**/*.js', '**/*.map'],
                        dest: 'scripts/jquery/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular/',
                        src: ['**/*.js', '**/*.map'],
                        dest: 'scripts/angular/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-route/',
                        src: ['**/*.js', '**/*.map'],
                        dest: 'scripts/angular-route/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-bootstrap/',
                        src: ['**/*.js', '**/*.map'],
                        dest: 'scripts/angular-bootstrap/'
                    },                    
                    // Fonts.
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        cwd: 'bower_components/',
                        src: ['bootstrap-sass/assets/fonts/**'],
                        dest: 'fonts/bootstrap/'
                    },
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        cwd: 'bower_components/',
                        src: ['font-awesome/scss/**'],
                        dest: 'scss/font-awesome/'
                    },
                    // Stylesheets
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap-sass/assets/stylesheets/',
                        src: ['**/*.scss'],
                        dest: 'scss/'
                    }
                ]
            },
        },

        // Compile SASS files into minified CSS.
        sass: {
            options: {
                includePaths: ['bower_components/bootstrap-sass/assets/stylesheets']
            },
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'css/app.css': 'scss/app.scss'
                }
            }
        },

        concat: {
          options: {
            separator: '\n\n\n'
          },
          venderscripts: {
            src: [
                'scripts/jquery/jquery.min.js',
                'scripts/bootstrap-sass/bootstrap.min.js',
                'scripts/angular/angular.min.js',
                'scripts/angular-route/angular-route.min.js',
                'scripts/angular-bootstrap/ui-bootstrap-tpls.min.js'
            ],
            dest: 'scripts/vender.js'
          },        
          codescripts: {
            src: [
                'app.module.js',
                'app.config.js',
                'scripts/controllers/*.js',
                'services/*.js',
                'scripts/directives/*.js'
            ],
            dest: 'scripts/app.js'
          }
        },
        // Watch these files and notify of changes.
        watch: {
            grunt: {
                files: ['Gruntfile.js'],
                tasks: ['concat']
            },
            sass: {
                files: [
                    'scss/**/*.scss'
                ],
                tasks: ['sass']
            },
            scripts: {
                files: [
                    'app.config.js',
                    'app.module.js',
                    'scripts/controllers/*.js',
                    'services/*.js',
                    'scripts/directives/*.js'
                ],
                tasks: ['concat']
            }
        }
    });

    // Load externally defined tasks.
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Establish tasks we can run from the terminal.
    grunt.registerTask('build', ['copy', 'sass', 'concat']);
    grunt.registerTask('default', ['build', 'watch']);
}
