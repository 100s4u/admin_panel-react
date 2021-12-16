import React from 'react';
import { ViewCount } from './ViewCount';
import { ChartComp } from './ChartComp.js';
import './Dashboard.scss';

export const Dashboard = () => {
    return (
        <div className='Dashboard'>
            <ViewCount />
            <ChartComp />
        </div>
    )
}
