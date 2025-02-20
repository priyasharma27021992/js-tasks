class AsyncTaskExecutor {
  constructor(tasks = []) {
    this.tasks = tasks;
  }

  addTask(task) {
    if (typeof task !== "function") {
      throw new Error("Task must be a function returning a Promise");
    }
    this.tasks.push(task);
  }

  async runSeries() {
    const results = [];
    for (const task of this.tasks) {
      results.push(await task());
    }
    return results;
  }

  async runParallel() {
    return Promise.all(this.tasks.map((task) => task()));
  }

  async runThrottled(concurrency) {
    if (concurrency <= 0) throw new Error("Concurrency must be at least 1");

    const results = [];
    const queue = [...this.tasks];
    const executing = new Set();

    async function executeNext() {
      if (queue.length === 0) return;
      const task = queue.shift();
      const promise = task().then((result) => {
        results.push(result);
        executing.delete(promise);
      });
      executing.add(promise);
      await promise;
      await executeNext();
    }

    const workers = Array.from(
      { length: Math.min(concurrency, this.tasks.length) },
      () => executeNext()
    );
    await Promise.all(workers);
    return results;
  }
}

// Example Usage
async function exampleTask(id, delay) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(`Task ${id} done`), delay)
  );
}

const executor = new AsyncTaskExecutor([
  () => exampleTask(1, 1000),
  () => exampleTask(2, 500),
  () => exampleTask(3, 2000),
  () => exampleTask(4, 1500),
]);

// Run tasks in series
executor.runSeries().then(console.log);

// Run tasks in parallel
executor.runParallel().then(console.log);

// Run tasks with throttling (2 at a time)
executor.runThrottled(2).then(console.log);
