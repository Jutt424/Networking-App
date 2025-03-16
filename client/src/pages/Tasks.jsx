import React from 'react';

const Tasks = () => {
  return ( 
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Heading for Task List */}
      <h1 className="text-3xl font-bold text-black text-center mb-6">Task List</h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 gap-6">
        {/* PK-A Card */}
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl p-6 relative overflow-hidden shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-500 rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-white font-bold">K</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-black">PK-A</h2>
                <span className="bg-black text-white text-[10px] px-1.5 py-0.5 rounded-sm">Upgradation</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <span className="text-gray-500 block mb-1">Daily task</span>
              <span className="font-medium text-black">0/5</span>
            </div>
            <div className="text-center">
              <span className="text-gray-500 block mb-1">Unit price</span>
              <span className="font-medium text-black">20</span>
            </div>
            <div className="text-center">
              <span className="text-gray-500 block mb-1">Daily income</span>
              <span className="font-medium text-black">100</span>
            </div>
            <div className="text-center">
              <span className="text-gray-500 block mb-1">Total revenue</span>
              <div className="text-gray-600 text-xs mb-1">PKR 4980</div>
              <div className="bg-green-500 text-white text-xs px-4 py-1 rounded-full mb-1">Start task</div>
              <span className="font-medium text-black">3000</span>
            </div>
          </div>
        </div>

        {/* PK-1 Card */}
        <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-3xl p-6 relative overflow-hidden shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-500 rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-white font-bold">K</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold text-black">PK-1</h2>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <span className="text-gray-500 block mb-1">Daily task</span>
              <span className="font-medium text-black">11</span>
            </div>
            <div className="text-center">
              <span className="text-gray-500 block mb-1">Unit price</span>
              <span className="font-medium text-black">20</span>
            </div>
            <div className="text-center">
              <span className="text-gray-500 block mb-1">Daily income</span>
              <span className="font-medium text-black">220</span>
            </div>
            <div className="text-center">
              <span className="text-gray-500 block mb-1">Total revenue</span>
              <div className="text-gray-600 text-xs mb-1">PKR 7900</div>
              <div className="bg-orange-500 text-white text-xs px-4 py-1 rounded-full mb-1">Payment agreement</div>
              <span className="font-medium text-black">6600</span>
            </div>
          </div>
        </div>

        {/* PK-2 Card */}
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl p-6 relative overflow-hidden shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-500 rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-white font-bold">K</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold text-black">PK-2</h2>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <span className="text-gray-500 block mb-1">Daily task</span>
              <span className="font-medium text-black">15</span>
            </div>
            <div className="text-center">
              <span className="text-gray-500 block mb-1">Unit price</span>
              <span className="font-medium text-black">35</span>
            </div>
            <div className="text-center">
              <span className="text-gray-500 block mb-1">Daily income</span>
              <span className="font-medium text-black">525</span>
            </div>
            <div className="text-center">
              <span className="text-gray-500 block mb-1">Total revenue</span>
              <div className="text-gray-600 text-xs mb-1">PKR 34320</div>
              <div className="bg-orange-500 text-white text-xs px-4 py-1 rounded-full mb-1">Payment agreement</div>
              <span className="font-medium text-black">15750</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
