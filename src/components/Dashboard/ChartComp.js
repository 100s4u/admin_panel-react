import React, { useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
  } from "recharts";
import PostService from '../../api/post';
import { useSelector, useDispatch } from 'react-redux';

// viewStaticData
export const ChartComp = () => {
    const data = useSelector(state => state.viewStaticData);
    const dispatch = useDispatch();
    async function getData(token){
        const response = await PostService.GetViews(token);
        const data = Object.keys(response).map((item, i) => {
            return ({
                name: response[item].date,
                views: parseInt(response[item].views_count),
            });
        });
        dispatch({
            type: "SET_VIEW_STATIC",
            payload: data
        });
    }

    useEffect(() => {
        getData(localStorage.token);
        // eslint-disable-next-line
    }, []);
    return (
        <div className='ChartComp'>
            <div className='header'>
                <h4>View Static</h4>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                    top: 8,
                    right: 64,
                    left: 0,
                    bottom: 8,
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="8 8"
                        vertical={false}
                        horizontal={true} />
                    <XAxis
                        tickLine={false}
                        axisLine={false}
                        dataKey="name"
                        dy={16}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip 
                        cursor={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="views"
                        stroke="#1473E6"
                        activeDot={{ r: 10 }}
                        strokeWidth={2.5}
                        isAnimationActive={false}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
      );
}
