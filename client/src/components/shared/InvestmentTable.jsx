import React from "react";

const InvestmentTable = () => {
  const data = [
    { invest: "30", dailyIncome: "1.5", tasks: "4/25 Per Task" },
    { invest: "100", dailyIncome: "300", tasks: "6/80 Per Task" },
    { invest: "200", dailyIncome: "480", tasks: "8/60 Per Task" },
    { invest: "300", dailyIncome: "550", tasks: "7/78 Per Task" },
    { invest: "500", dailyIncome: "720", tasks: "6/120 Per Task" },
    { invest: "1000", dailyIncome: "1200", tasks: "6/200 Per Task" },
    { invest: "1800", dailyIncome: "2350", tasks: "10/225 Per Task" },
    { invest: "5000", dailyIncome: "2800", tasks: "8/350 Per Task" },
    { invest: "10000", dailyIncome: "3500", tasks: "10/440 Per Task" },
  ];

  return (
    <div className="p-6 flex justify-center bg-gray-100 min-h-screen">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-8 bg-gradient-to-r from-indigo-700 to-teal-500 text-white">
          <h1 className="text-3xl font-bold text-center">Investment Dashboard</h1>
          <p className="text-center mt-2 text-sm">
            Discover the most rewarding investment plans tailored for you.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm text-gray-700">
            <thead className="bg-gray-200 text-gray-600 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Investment</th>
                <th className="px-4 py-3 text-left">Daily Income</th>
                <th className="px-4 py-3 text-left">Tasks</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-teal-50 transition-all`}
                >
                  <td className="px-6 py-4 text-gray-800 font-medium">{row.invest}</td>
                  <td className="px-6 py-4">{row.dailyIncome}</td>
                  <td className="px-6 py-4">{row.tasks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-6 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            Last updated: <span className="font-semibold text-teal-600">2025</span>
          </p>
          <button className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow hover:bg-indigo-700 transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentTable;
