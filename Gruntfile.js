module.exports = function(grunt) {
	grunt.initConfig({
		watch: {
			livereload: {
				files: ['*.shtml','assets/partials/*.shtml'],
				tasks: ['copy', 'ssi'],
				options: {
					livereload: true
				}
			}
		},
		connect: {
			server: {
				options: {
					hostname: '*',
					livereload: true
				}
			}
		},
		copy: {
			main: {
				files: [{
					src: 'index.shtml',
					dest: 'index.html'
				}]
			}
		},
		ssi: {
			options: {
				input: './',
				output: './',
				matcher: 'index.html'
			}
		},
		update_submodules: {
			default: {
				options: {
					params: '--init'
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-update-submodules');
	grunt.registerTask('ssi', 'Flatten SSI includes in your HTML files.', function() {

	var ssi = require( 'ssi' )
		, opts = this.options()
		, files = new ssi( opts.input, opts.output, opts.matcher )
		;

	files.compile();

	});
	grunt.registerTask('default', ['update_submodules', 'copy', 'ssi', 'connect', 'watch']);
};
