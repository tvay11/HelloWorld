/* eslint-disable require-jsdoc */
import BinaryHeap from "../utils/Heap.js";
var json = require("./data/example.json");


describe("HeapWithJSON", () => 
{
	test("insert root", () => 
	{
		const compFunc = (a, b) => parseFloat(a.price.grandTotal) < parseFloat(b.price.grandTotal);
		var heap = new BinaryHeap(compFunc);
        const flight1 = json.flights[1];
        const flight0 = json.flights[0];
    
        heap.insert(flight1); //950.14
        heap.insert(flight0); //800.14
        expect(heap.list[0].price.grandTotal).toBe("800.14");
	});


});