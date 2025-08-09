import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./pieChartBox.scss"


const data = [
    { name: 'mobile', value: 400, color: "#0088FE" },
    { name: 'desktop', value: 300, color: "#00C49F" },
    { name: 'laptop', value: 300, color: "#FFBB28" },
    { name: 'Tablet', value: 200, color: "#FF8042" },
]



const PieChartBox = () => {
    return (
<div className="pieChartBox">
  <div className="chart-container">
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: "white", 
            borderRadius: "5px" 
          }}
        />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={"70%"}
          outerRadius={"90%"}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          
        >
          {data.map((item) => (
            <Cell 
              key={`cell-${item.name}`} 
              fill={item.color} 
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>
  
  <div className="options">
    {data.map((item) => (
      <div className="option" key={`option-${item.name}`}>
        <div className="title">
          <div 
            className="dot" 
            style={{ backgroundColor: item.color }} 
          />
          <span>{item.name}</span>
        </div>
        <span>{item.value}</span>
      </div>
    ))}
  </div>
</div>
    );
}

export default PieChartBox;