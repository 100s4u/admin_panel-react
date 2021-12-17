import React, { useEffect, useState } from 'react';
import { InputNumber } from 'antd';
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

export const ChartComp = () => {
    const [data, limit, limit_status] = useSelector((state) => [
        state.viewStaticData,
        state.viewStaticLimit.value,
        state.viewStaticLimit.isNew
    ]);
    const [maxData, setMaxData] = useState(0);
    const dispatch = useDispatch();
    async function getData(token){
        const response = await PostService.GetViews(token);
        const maxData = response.length;
        setMaxData(maxData);
        let data = [];
        for (let i = maxData-limit; i < maxData; i++) {
            if(response[i]){
                data.push({
                    name: response[i].date,
                    views: parseInt(response[i].views_count)
                });
            }
        }
        dispatch({
            type: "SET_VIEW_STATIC",
            payload: data
        });
        if(limit_status){
            dispatch({
                type: "SET_VIEW_STATIC_LIMIT",
                payload: {
                    value: maxData,
                    isNew: false
                }
            });
        }
    }
    function changePeriod(e){
        dispatch({
            type: "SET_VIEW_STATIC_LIMIT",
            payload: {...limit, value: e}
        });
    }
    useEffect(() => {
        getData(localStorage.token);
        // eslint-disable-next-line
    }, [limit]);
    return (
        <div className='ChartComp'>
            <div className='header'>
                <h4>View Static</h4>   
                <InputNumber size="small" min={2} max={maxData} value={limit} onChange={(e)=>{changePeriod(e)}} /> 
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
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
      );
}
