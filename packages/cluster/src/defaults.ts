export const defaults = {
	IMP_PROCESSES: 1, // 0 is auto
	IMP_WORKER_CRASH_DELAY: 4000, // Milliseconds to wait before restarting a worker process instead of counting towards crash max.
	IMP_WORKER_CRASH_MAX: 5, // Number of times a worker is allowed to crash before killing the server.
};
