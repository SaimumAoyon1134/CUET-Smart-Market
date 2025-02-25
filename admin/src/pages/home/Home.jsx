import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../../dummyData"
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import axios from "axios";

export default function Home() {
  const [userStats,setUserStats]=useState([]);
  const MONTHS =useMemo(()=>["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],[]);
  useEffect(()=>{
    const getStats =async ()=>{
      try{
        const res =await userRequest.get("/users/stats");
        res.data.map(item=>
          setUserStats(prev=>[
            ...prev,
            {name:MONTHS[item._id-1],"Active User":item.total},
          ])
        );
      }catch{

      }
    }
    getStats();
  },[MONTHS]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:2000/api/orders"); // Adjust API URL
        const orders = response.data;

        // Process data: Group by productId and sum amounts
        const productAmountMap = {};

        orders.forEach((order) => {
          order.products.forEach((product) => {
            const productId = product._id;
           
            const amount = order.amount;

            if (productAmountMap[productId]) {
              productAmountMap[productId] += amount;
              productAmountMap[productId] += amount;
            } else {
              productAmountMap[productId] = amount;
              productAmountMap[productId] += amount;
            }
          });
        });

        // Convert object to array format for Recharts
        const chartData = Object.keys(productAmountMap).map((productId) => ({
          productId,
          amount: productAmountMap[productId],
        }));

        setData(chartData);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrders();
  }, []);
  return (
    <>
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        {/* <WidgetSm/> */}
      {/* <WidgetLg/> */}
       
      </div>
      </div>
      <div style={{ width: "100%", height: 400 }}>
      <h3>Order Analysis: Product ID vs. Amount</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="productId" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </>
  );
 

}