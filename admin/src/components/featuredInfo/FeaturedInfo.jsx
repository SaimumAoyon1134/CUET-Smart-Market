
import { useEffect, useState } from "react";
import "./featuredInfo.css";
import { userRequest } from "../../requestMethods";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [cost, setCost] = useState(0);
  const [perc, setPerc] = useState(0);
  const [data, setData] = useState([]);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await userRequest.get("/orders/income"); 
          const chartData = res.data.map(item => ({
            name: `Month ${item._id}`, 
            sales: item.total, 
          }));
          setData(chartData);
        } catch (err) {
          console.error("Error fetching data for the chart:", err);
        }
      };
  
      fetchData();
    }, []);
  

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders"); 
        setIncome(res.data);

        if (res.data.length > 0) {
          const totalRevenue = res.data.reduce((sum, order) => sum + order.amount, 0);
          setRevenue(totalRevenue);

     
          const estimatedCost = totalRevenue * 0.75;
          setCost(estimatedCost);


          if (res.data.length > 1) {
            const lastMonthRevenue = res.data[res.data.length - 2]?.amount || 0;
            setPerc(((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100);
          }
        }
      } catch (error) {
        console.log("Error fetching income data", error);
      }
    };

    getIncome();
  }, []);

  return (
    <div style={{  marginLeft: "40px" }}>
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">BDT {revenue.toFixed(2)}</span>
          <span className="featuredMoneyRate">
            {perc.toFixed(2)}%{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">BDT {cost.toFixed(2)}</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Estimated cost based on revenue</span>
      </div>
     
    </div>
     <div className="stockMarketChart">
     <h3 className="chartTitle">Monthly Analysis of CUET SMART MARKET</h3>
     <ResponsiveContainer width="100%" height={300}>
       <LineChart data={data}>
         <CartesianGrid strokeDasharray="3 3" />
         <XAxis dataKey="name" />
         <YAxis />
         <Tooltip />
         <Legend />
         <Line
           type="monotone"
           dataKey="sales"
           stroke="#8884d8"
           activeDot={{ r: 8 }}
           strokeWidth={2}
         />
       </LineChart>
     </ResponsiveContainer>
   </div>
   </div>
  );
}