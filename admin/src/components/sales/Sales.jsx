import { useEffect, useState } from "react";
import "./sales.css";
import { userRequest } from "../../requestMethods";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

export default function Sales() {
  const [salesData, setSalesData] = useState({
    totalSales: 0,
    dailySales: 0,
    monthlySales: 0,
    yearlySales: 0,
  });

  useEffect(() => {

    const fetchSalesData = async () => {
      try {
        const res = await userRequest.get("orders/income"); 
        const incomeData = res.data;

        const monthlySales = incomeData.reduce((acc, item) => {
          return acc + item.total;
        }, 0);
        setSalesData((prevState) => ({
          ...prevState,
          monthlySales: monthlySales,
        }));
      } catch (err) {
        console.log("Error fetching monthly income:", err);
      }
    };

    fetchSalesData();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await userRequest.get("orders"); 
        const orders = response.data;

        let totalSales = 0;
        let dailySales = 0;
        let yearlySales = 0;

        const today = new Date();

        orders.forEach((order) => {
          const orderDate = new Date(order.createdAt);
          const amount = order.amount;


          totalSales += amount;


          if (orderDate.toDateString() === today.toDateString()) {
            dailySales += amount;
          }


          if (orderDate.getFullYear() === today.getFullYear()) {
            yearlySales += amount;
          }
        });

        setSalesData((prevState) => ({
          ...prevState,
          totalSales,
          dailySales,
          yearlySales,
        }));
      } catch (err) {
        console.log("Error fetching all orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="featured">

      <div className="featuredItem">
        <span className="featuredTitle">Total Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">BDT {salesData.totalSales}</span>
          <span className="featuredMoneyRate">
        
          </span>
        </div>
        <span className="featuredSub">Total sales across all time</span>
      </div>

    
      <div className="featuredItem">
        <span className="featuredTitle">Sales in the Last Year</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">BDT {salesData.yearlySales}</span>
          <span className="featuredMoneyRate">
          
          </span>
        </div>
        <span className="featuredSub">Compared to last year</span>
      </div>

  
      <div className="featuredItem">
        <span className="featuredTitle">Sales in the Last Month</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">BDT {salesData.monthlySales}</span>
          <span className="featuredMoneyRate">
      
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>


      <div className="featuredItem">
        <span className="featuredTitle">Sales in the Last Day</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">BDT {salesData.dailySales}</span>
          <span className="featuredMoneyRate">
       
          </span>
        </div>
        <span className="featuredSub">Compared to last day</span>
      </div>
    </div>
  );
}

