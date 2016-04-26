var cluster = require('cluster');

function startWorker () {
	var worker = cluster.fork();
	console.log('CLUSTER: worker %d started', worker.id);
}

if ( cluster.isMaster ) {
	require('os').cpus().forEach(function(){
		startWorker();
	});

	cluster.on('disconnect', function (worker) {
		console.log('CLUSTER: worker %d disconnected from the cluster.', worker.id);
	});

	cluster.on('exit', function (worker, code, signal) {
		console.log('CLUSTER: worker %d died with exit code %d (%s)', worker.id, code, signal);
		startWorker();
	});
} else {
	require('./case.js')();
}
