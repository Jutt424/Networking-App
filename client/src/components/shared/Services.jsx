import React from 'react';
import { Link } from 'react-router-dom';
import InvestmentTable from './InvestmentTable'
const Services = () => {
  const apps = [
    { title: 'Sharing code', icon: '🔄', className: 'bg-white' },
    { title: 'Cash rewards', subtitle: 'Cash exchange code', icon: '💰', className: 'bg-blue-400 text-white h-32' },
    { title: 'Free task', subtitle: 'Complete a high reward m', icon: '📱', className: 'bg-purple-400 text-white h-32' },
    { title: 'Question', icon: '❓', className: 'bg-green-500 text-white' },
    { title: 'Video creation', icon: '🎥', className: 'bg-white' },
    { title: 'App', icon: '📱', className: 'bg-white' },
    { title: 'Q&A', icon: '❗', className: 'bg-white' },
    { title: 'Website', icon: '🌐', className: 'bg-white' },
    { title: 'Withdrawal', icon: '💳', className: 'bg-white' },
    { title: 'Tutorial', icon: '📊', className: 'bg-white' },
    { title: 'Recharge', icon: '💳', className: 'bg-white', link: '/recharge' },
    { title: 'Team', icon: '👥', className: 'bg-white' },
  ];

  return (
    <div>
      {/* Main Content */}
      <main className="container mx-auto min-h-screen bg-gray-100 p-4">
        {/* Apps Grid */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">All Services</h2>
            <button className="text-blue-500 text-sm">View All</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {apps.map((app, index) => (
              <div
                key={index}
                className={`${app.className} rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-1`}
              >
                {app.link ? (
                  <Link to={app.link} className="block h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl">{app.icon}</span>
                        <span className="text-sm font-medium">{app.title}</span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">{app.icon}</span>
                      <span className="text-sm font-medium">{app.title}</span>
                    </div>
                    {app.subtitle && <p className="text-xs opacity-90 mt-1">{app.subtitle}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <InvestmentTable />
      </main>
    </div>
  );
};

export default Services;
