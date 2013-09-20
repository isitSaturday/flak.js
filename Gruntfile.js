module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			dist: {
				src: ['src/flak.js', 'src/flak.templateview.js', 'src/flak.stateview.js', 'src/flak.collectionview.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},

		uglify: {
			options: {
				// /*! normalize.css v2.1.3 | MIT License | git.io/normalize */
				banner: '/*!\n<%= pkg.name %>.js v<%= pkg.version %>\n\n<%= pkg.license %> License\nDeveloped by isitSaturday\n<%= grunt.template.today() %>\n*/\n'
			},
			dist: {
				files: {
				'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},

		jshint: {
			files: ['gruntfile.js', 'src/**/*.js'],
			options: {
				globals: {
					jQuery: true,
					console: true
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('build', ['jshint', 'concat', 'uglify']);

};
