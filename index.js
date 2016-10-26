const notify   = require( 'gulp-notify' );
const gutil    = require( 'gulp-util' );
const plumber  = require( 'gulp-plumber' );

function errorReporter( error ) {
	const lineNumber = ( error.lineNumber ) ? 'LINE ' + error.lineNumber + ' -- ' : '';

	notify({
		title: 'Task Failed [' + error.plugin + ']',
		message: lineNumber + ' See console.',
		sound: 'Sosumi' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
	}).write( error );

	gutil.beep(); // Beep 'sosumi' again

	// Inspect the error object
	//console.log(error);

	// Easy error reporting
	//console.log(error.toString());

	// Pretty error reporting
	var report = '';
	var chalk = gutil.colors.white.bgRed;

	report += chalk('TASK:') + ' [' + error.plugin + ']\n';
	report += chalk('PROB:') + ' ' + error.message + '\n';
	if (error.lineNumber) { report += chalk('LINE:') + ' ' + error.lineNumber + '\n'; }
	if (error.fileName)   { report += chalk('FILE:') + ' ' + error.fileName + '\n'; }
	console.error(report);

	// Prevent the 'watch' task from stopping
	this.emit('end');
};

exports.reporter = function() { return errorReporter; };
exports.plumber = function() { return plumber({ errorHandler: errorReporter }); };
