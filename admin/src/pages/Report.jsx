
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const BASE_URL = "http://localhost:2000/api"; 

const UserOrdersChart = () => {
  const [users, setUsers] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(""); 
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users`);
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!selectedUser) return;
    const fetchOrders = async () => {
      setLoading(true);
      try {
        console.log("Fetching orders for user:", selectedUser);
        const res = await axios.get(`${BASE_URL}/orders/find/${selectedUser}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [selectedUser]);

  
  const colors = ["#4A90E2", "#50E3C2", "#F5A623", "#D0021B", "#BD10E0", "#417505"];


  const chartData = orders.map((order, index) => ({
    name: `Order ${index + 1}`,
    amount: order.amount || 0,
    fill: colors[index % colors.length], 
  }));

  return (
    <div style={{  marginLeft: "40px" }}>
      <h2 className="text-xl font-bold text-gray-700 mb-4">User Orders Chart</h2>

      
      <label className="block mb-2 text-gray-600">Select User:</label>
      <select
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">Choose a user</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.username}
          </option>
        ))}
      </select>

      {loading && <p className="text-gray-600">Loading orders...</p>}

      {!loading && orders.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {chartData.map((entry, index) => (
              <Bar key={index} dataKey="amount" fill={entry.fill} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      ) : (
        !loading && <p className="text-gray-500">No orders found.</p>
      )}
    </div>
  );
};

export default UserOrdersChart;