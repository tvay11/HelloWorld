/**
 * 
 * @param {*} scoreFunction 
 */
function BinaryHeap(compFunc)
{	
	this.list =[];
	this.compFunc = compFunc; //comparison function to determine priority queue. min?max?
}


BinaryHeap.prototype = {
	/**
	 * 
	 * @param {item} to be inserted 
	 */
	insert: function(item) 
	{
		this.list.push(item);
		var insertPos = this.percolateUp(this.getSize() - 1, item);
		this.list[insertPos] = item;
	},
	/**
 	* 
 	* @returns 
 	*/
	removeRoot: function() 
	{

		if (this.isEmpty()) return;
		var ans = this.list[0]; // this is the root
		var lastNode = this.list.pop(); //get the last node
		var hole = this.percolateDown(0, lastNode); // start bubbling down
		this.list[hole] = this.list[this.getSize() -1 ];
		return ans;
	},
	/**
	 * 
	 * @returns bool
	 */
	isEmpty: function()
	{
		return (this.list.length === 0);
	},
	/**
	 * 
	 * @returns 
	 */
	getSize: function() 
	{
		return this.list.length;
	},

	/**
	 * 
	 * @param {*} n 
	 */
	percolateUp: function(holeIndex, val) 
	{
		while(holeIndex > 0 && this.compFunc(val, this.list[Math.floor((holeIndex - 1)/2)])) // if not root and has higher priority
		{
			this.list[holeIndex] = this.list[Math.floor((holeIndex - 1)/2)]; // swap parent and child
			holeIndex = Math.floor((holeIndex - 1)/2); // swap parent and child
		}
		return holeIndex;
	},
	/**
	 * 
	 * @param {*} n 
	 */
	percolateDown: function(holeIndex, val) 
	{
		while( (2* holeIndex + 1) <= this.getSize() ) // if still have children
		{
			var left = 2* holeIndex + 1; // left child
			var right = left + 1;	//right child
			var target = 0;
			if ((right > this.getSize()) || //if right child is ooB
				this.compFunc(this.list[left], this.list[right]))  // if left has higher priority
				target = left; //compare with left child
			else // if right has higher priority
				target = right; //compare with right
			if (this.compFunc(this.list[target], val))
			{ // if child has higher priority
				this.list[holeIndex] = this.list[target]; // swap child and parent
				holeIndex = target; //swap child and parent
			} 
			else
				break;
		}
		return holeIndex;
	},
};

module.exports = BinaryHeap;