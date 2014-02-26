module.exports = function(grunt) {
    "use strict";
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            date_version: '<%= grunt.template.today("yy.m.d.HMM")%>',
            version: '<%= pkg.version %>',
            banner:
                '/*!\n' +
                    ' * Build <%= pkg.name %> <%= meta.date_version %> <%= meta.version %> (<%= grunt.template.today("yyyy-mm-dd HH:MM") %>)\n' +
                    ' *\n' +
                    ' * Copyright 2013-<%= grunt.template.today("yyyy") %>\n' +
                    ' */'
        },
        //Очистить все
        clean: {
            build    : ['build/']
        },
        copy: {
            assets: {
                files: [
                    {
                        expand: true,
                        cwd: 'web/assets/',
                        src: [
                            '**/*'
                        ],
                        dest: 'build/assets/',
                        filter: 'isFile'
                    }
                ]
            },
            app: {
                files: [
                    {
                        expand: true,
                        cwd: 'web/app/',
                        src: [
                            '**/*'
                        ],
                        dest: 'build/app/',
                        filter: 'isFile'
                    }
                ]
            },
            config: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'web/config/**/*.js'
                        ],
                        dest: 'build/config/',
                        filter: 'isFile'
                    }
                ]
            },
            templates: {
                files: [
                    {
                        expand: true,
                        cwd: 'web/templates/',
                        src: [
                            '**/*.html'
                        ],
                        dest: 'build/templates/',
                        filter: 'isFile'
                    }
                ]
            },
            index: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'web/index.html'
                        ],
                        dest: 'build/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd:  'build/assets/images/',
                    dest: 'build/assets/images/',
                    src: ['**/*.png', '**/*.jpg']
                }]
            }
        },
        //Сжать стили
        cssmin: {
            options: {
                keepSpecialComments: 0,
                banner: '<%= meta.banner %>\n'
            },
            files: {
                expand: true,
                src   : 'build/assets/css/**/*.css'
            }
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>\n',
                width: 80,
                beautify: true
            },
            app: {
                files: [{
                    expand: true,
                    cwd: 'build/app/',
                    src: '**/*.js',
                    dest: 'build/app'
                }]
            },
            assets: {
                files: [{
                    expand: true,
                    cwd: 'build/assets/',
                    src: '**/*.js',
                    dest: 'build/assets'
                }]
            }
        },
        htmlcompressor: {
            'index.html': {
                files: {
                    'build/index.html': 'build/index.html'
                },
                options: {
                    type: 'html',
                    preserveServerScript: true,
                    removeScriptAttr: true,
                    removeLinkAttr: true,
                    removeStyleAttr: true,
                    simpleDoctype: true,
                    removeQuotes: true,
                    removeIntertagSpaces: true,
                    compressCss: true,
                    jsCompressor: 'closure',
                    compressJs: true
                }
            },
            'templates': {
                src: [
                    'build/templates/**/*.html'
                ],
                options: {
                    processName: function (path) {
                        return path;
                    },
                    type: 'html',
                    preserveServerScript: true,
                    removeScriptAttr: true,
                    removeLinkAttr: true,
                    removeStyleAttr: true,
                    simpleDoctype: true,
                    removeQuotes: true,
                    removeIntertagSpaces: true,
                    compressCss: true,
                    jsCompressor: 'closure',
                    compressJs: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-htmlcompressor');

    grunt.registerTask('build', ['clean', 'copy', 'imagemin', 'cssmin', 'uglify', 'htmlcompressor']);

    grunt.registerTask('default', function() {
        var _tasks, tasks, table;

        grunt.log.header('Available tasks');

        _tasks = [];
        Object.keys(grunt.task._tasks).forEach(function(name) {
            var task = grunt.task._tasks[name];
            if (task.meta.info === 'Gruntfile' && !task.multi && name !== 'default') {
                _tasks.push(task);
            }
        });

        tasks = _tasks.map(function(task) {
            var info = task.info;
            if (task.multi) { info += ' *'; }
            return [task.name, info];
        });

        table = function(arr) {
            arr.forEach(function(item) {
                grunt.log.writeln(grunt.log.table([30, 120], [item[0], item[1]]));
            });
        };

        table(tasks);
    });
};
