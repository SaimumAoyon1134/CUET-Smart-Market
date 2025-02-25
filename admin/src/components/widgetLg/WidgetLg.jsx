// import { useEffect, useState } from "react";
// import "./widgetLg.css";
// import { userRequest } from "../../requestMethods";
// import {format} from "timeago.js"
// export default function WidgetLg() {
//   const Button = ({ type }) => {
//     return <button className={"widgetLgButton " + type}>{type}</button>;
//   };
//    const [orders,setOrders]=useState([]);
//     useEffect(()=>{
//       const getOrders = async()=>{
//         try{
  
//           const res = await userRequest.get("orders");
//           setOrders(res.data);
//         }catch{
//           console.log("ERROR IS DETECTED");
//         }
//       }
//       getOrders();
//     },[])
//   return (
//     <div className="widgetLg">
//       <h3 className="widgetLgTitle">Latest transactions</h3>
//       <table className="widgetLgTable">
//         <tr className="widgetLgTr">
//           <th className="widgetLgTh">Customer</th>
//           <th className="widgetLgTh">Date</th>
//           <th className="widgetLgTh">Amount</th>
//           <th className="widgetLgTh">Status</th>
//         </tr>
//         {orders.map(order=>(

//           <tr className="widgetLgTr" key={order._id}>
//           <td className="widgetLgUser">
//              <img
//               src="https://png.pngtree.com/png-vector/20191113/ourmid/pngtree-green-check-mark-icon-flat-style-png-image_1986021.jpg"
//               alt=""
//               className="widgetLgImg"
//               /> 
//             <span className="widgetLgName">{order.userId}</span>
//           </td>
//           <td className="widgetLgDate">{format(order.createdAt)}</td>
//           <td className="widgetLgAmount">${order.amount}</td>
//           <td className="widgetLgStatus">
//             <Button type={order.status}/>
//           </td>
//         </tr>
//             ))}
      
//       </table>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import "./widgetLg.css"; // Ensure this file exists
import { userRequest } from "../../requestMethods";
import { format } from "timeago.js";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  // Fetch orders from backend
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };
    getOrders();
  }, []);

  // Handle Status Change (Pending → Approved)
  const handleStatusChange = async (orderId, currentStatus) => {
    if (currentStatus === "pending") {
      try {
        const updatedStatus = "Approved";

        // Optimistically update UI before the API call
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: updatedStatus } : order
          )
        );

        // Send update request to backend
        await userRequest.put(`orders/${orderId}`, { status: updatedStatus });
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    }
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Transactions</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Student ID</th>
            <th className="widgetLgTh">Hall Name</th>
            <th className="widgetLgTh">Room No</th>
       
            <th className="widgetLgTh">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr className="widgetLgTr" key={order._id}>
              <td className="widgetLgUser">
                <img
                  src="https://png.pngtree.com/png-vector/20191113/ourmid/pngtree-green-check-mark-icon-flat-style-png-image_1986021.jpg"
                  alt="User"
                  className="widgetLgImg"
                />
                <span className="widgetLgName">{order.userId}</span>
              </td>
              <td className="widgetLgDate">{format(order.createdAt)}</td>
              <td className="widgetLgAmount">${order.amount}</td>
              <td className="widgetLgAddress">{order.address.studentId}</td>
              <td className="widgetLgAddress">{order.address.hall}</td>
              <td className="widgetLgAddress">{order.address.room}</td>
       
              <td className="widgetLgStatus">
                <button
                  className={`widgetLgButton ${order.status.toLowerCase()}`}
                  onClick={() => handleStatusChange(order._id, order.status)}
                >
                  {order.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}