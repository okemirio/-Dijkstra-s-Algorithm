function dijkstra(graph, start) {
    const distances = {};
    const visited = {};
    const priorityQueue = new PriorityQueue();

    // Initialize distances to all vertices as Infinity except the start vertex
    for (let vertex in graph) {
        distances[vertex] = Infinity;
    }
    distances[start] = 0;

    // Add the start vertex to the priority queue
    priorityQueue.enqueue(start, 0);

    while (!priorityQueue.isEmpty()) {
        const { element: currentVertex } = priorityQueue.dequeue();

        if (visited[currentVertex]) continue;
        visited[currentVertex] = true;

        for (let neighbor in graph[currentVertex]) {
            const distance = graph[currentVertex][neighbor];
            const newDistance = distances[currentVertex] + distance;

            // Update the shortest distance to neighbor if a shorter path is found
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                priorityQueue.enqueue(neighbor, newDistance);
            }
        }
    }

    return distances;
}

// Priority Queue implementation using a MinHeap
class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    enqueue(element, priority) {
        const node = { element, priority };
        this.heap.push(node);
        this.bubbleUp();
    }

    dequeue() {
        if (this.isEmpty()) return null;
        const minNode = this.heap[0];
        const endNode = this.heap.pop();
        if (!this.isEmpty()) {
            this.heap[0] = endNode;
            this.sinkDown();
        }
        return minNode;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const element = this.heap[index];
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            if (parent.priority <= element.priority) break;
            this.heap[parentIndex] = element;
            this.heap[index] = parent;
            index = parentIndex;
        }
    }

    sinkDown() {
        let index = 0;
        const length = this.heap.length;
        const element = this.heap[0];
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }
}
