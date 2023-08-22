/* eslint-disable require-jsdoc */
import BinaryHeap from "../utils/Heap.js";

describe("Heap", () => 
{
	test("insert once and return the root", () => 
	{
		const compFunc = (a, b) => a < b;
		var heap = new BinaryHeap(compFunc);
		heap.insert(1);
		expect(heap.list[0]).toBe(1);
	});

	test("removeRoot when empty and return undefined", () =>
	{
		const compFunc = (a, b) => a < b;
		var heap = new BinaryHeap(compFunc);
		expect(heap.removeRoot()).toBe(undefined);
	});


	test("getSize when empty and return 0", () =>
	{
		const compFunc = (a, b) => a < b;
		var heap = new BinaryHeap(compFunc);
		expect(heap.getSize()).toBe(0);
	});


	test("insert is maintaining priority and return the root node", () => 
	{
		const compFunc = (a, b) => a < b;
		var heap = new BinaryHeap(compFunc);
		heap.insert(1);
		heap.insert(0);
		heap.insert(3);
		expect(heap.list[0]).toBe(0);
	});


	test("insert is maintaing at the child level and return the left child at rank = 1", () => 
	{
		const compFunc = (a, b) => a < b;
		var heap = new BinaryHeap(compFunc);
		heap.insert(3);
		heap.insert(0);
		heap.insert(1);
		expect(heap.list[1]).toBe(3);
	});
	
	test("getSize when not empty and return the size", () =>
	{
		const compFunc = (a, b) => a < b;
		var heap = new BinaryHeap(compFunc);
		heap.insert(3);
		heap.insert(3);
		heap.insert(0);
		heap.insert(1);
		heap.removeRoot();
		expect(heap.getSize()).toBe(3);
	});
	
	test("removeRoot when not empty and return the root node after", () =>
	{
		const compFunc = (a, b) => a < b;
		var heap = new BinaryHeap(compFunc);
		heap.insert(3);
		heap.insert(3);
		heap.insert(0);
		heap.insert(1);
		expect(heap.removeRoot()).toBe(0);
	});

	test("percolateUp when heap is maintained", () =>
	{
		const compFunc = (a, b) => a < b;
		var heap = new BinaryHeap(compFunc);
		heap.insert(3);
		heap.insert(3);
		heap.insert(0);
		heap.insert(1);
		expect(heap.percolateUp(3,  1)).toBe(3);

	});

	test("percolateDown when heap is maintained", () =>
	{
		const compFunc = (a, b) => a < b;
		var heap = new BinaryHeap(compFunc);
		heap.insert(3);
		heap.insert(3);
		heap.insert(0);
		heap.insert(1);
		expect(heap.percolateUp(2,  3)).toBe(2);
	});


});
