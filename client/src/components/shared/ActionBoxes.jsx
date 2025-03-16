export default function ActionBoxes() {
    return (
      <div className="flex flex-col space-y-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Cash rewards</h3>
              <p className="text-xs md:text-sm text-orange-100">Cash exchange code</p>
            </div>
            <div className="bg-orange-400/30 p-3 md:p-4 rounded-lg md:rounded-xl">
              <span className="text-2xl md:text-3xl">💰</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Free task</h3>
              <p className="text-xs md:text-sm text-orange-100">Complete a high reward task</p>
            </div>
            <div className="bg-orange-400/30 p-3 md:p-4 rounded-lg md:rounded-xl">
              <span className="text-2xl md:text-3xl">✨</span>
            </div>
          </div>
        </div>
      </div>
    );
  }