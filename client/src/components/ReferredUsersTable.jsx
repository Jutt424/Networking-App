import React, { useEffect, useState } from "react";
import { userAPI } from "../services/api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ReferredUsersTable = () => {
      const { user } = useContext(AuthContext);
      const [referredUsers, setReferredUsers] = useState([]);
      useEffect(() => {
        const fetchReferredUsers = async () => {
          try {
            const response = await userAPI.getReferredUsers(user._id);
            console.log(response);
            setReferredUsers(response.data.referredUsers || []);
          } catch (error) {
            console.error('Error fetching referred users:', error);
          }
        };
        fetchReferredUsers();
      }, [user._id]);
    return (
        <div className="p-6 bg-[#0F172A] text-white mt-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-6 text-cyan-400">My Team</h2>
            {referredUsers.length === 0 ? (
                <p className="text-gray-400">No referred users yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-cyan-900/60 text-cyan-200 text-xs uppercase tracking-wider">
                                <th className="p-2 text-left">#</th>
                                <th className="p-2 text-left">Name</th>
                                <th className="p-2 text-left">Email</th>
                                <th className="p-2 text-left">Joined</th>
                                <th className="p-2 text-left">Deposited</th>
                            </tr>
                        </thead>
                        <tbody>
                            {referredUsers.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className="border-b border-cyan-800/30 hover:bg-cyan-800/20 transition duration-300"
                                >
                                    <td className="p-2">{index + 1}</td>
                                    <td className="p-2">{user.name}</td>
                                    <td className="p-2 text-cyan-300">{user.email}</td>
                                    <td className="p-2 text-gray-400">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-2 text-gray-400">
                                        {user.hasDeposited ? "Yes" : "No"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
                //     <ul className="divide-y divide-cyan-800/40 rounded-lg overflow-hidden">
        //   {users.map((user, index) => (
        //     <li key={user._id} className="p-4 bg-[#0F172A] hover:bg-cyan-800/20 transition">
        //       <div className="flex justify-between items-center">
        //         <div>
        //           <p className="font-semibold text-white">{user.name}</p>
        //           <p className="text-sm text-gray-400">{user.email}</p>
        //         </div>
        //         <span className="text-xs text-gray-500">
        //           {new Date(user.createdAt).toLocaleDateString()}
        //         </span>
        //       </div>
        //     </li>
        //   ))}
        // </ul>

    );
};

export default ReferredUsersTable;
