
import "./single.scss"
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


type Props = {
    id: number | string;
    img?: string;
    title: string;
    info: object,
    chart: {
        dataKeys: { name: string; color: string }[];
        data: { name: string; visits: number; orders: number }[];
    }
    activities?: { time: string; text: string }[];
}

const Single: React.FC<Props> = (props: Props) => {


    return (
        <div className='single'>
            <div className="view">
                <div className="info">
                    <div className="topInfo">
                        {props.img &&
                            <img src={props.img} alt=""
                            />
                        }
                        <h1>{props.title}</h1>
                        <button>Update</button>
                    </div>
                    <div className="details">
                        {Object.entries(props.info).map(item => (
                            <div className="item" key={item[0]}>
                                <div className="itemTitle">{item[0]}</div>
                                <div className="itemValue">{typeof item[1] === 'object' ? JSON.stringify(item[1]) : item[1]}</div>
                            </div>
                        ))}

                    </div>
                </div>
                <hr />
                {props.chart && (
                    <div className="chart">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                width={500}
                                height={300}
                                data={props.chart.data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >

                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                {props.chart.dataKeys.map(dataKey => (
                                    <Line type="monotone" dataKey={dataKey.name} stroke={dataKey.color} activeDot={{ r: 8 }} />

                                ))}

                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
            <div className="activities">
                <h2>Latest Activities</h2>
                <ul>
                    {props.activities?.map(activity => (
                        <li key={activity.text}>
                            <div>
                                <p>
                                    {activity.text}
                                </p>
                                <time>{activity.time}</time>
                            </div>
                        </li>
                    ))}

                </ul>
            </div>

        </div>
    );
}
export default Single;

/*
    const data = [
        {
            ID: 1,
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            ID: 2,
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            ID: 3,
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            ID: 4,
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            ID: 5,
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            ID: 6,
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            ID: 7,
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
*/