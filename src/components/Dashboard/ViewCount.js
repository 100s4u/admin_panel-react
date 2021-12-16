import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostService from '../../api/post';

export const ViewCount = () => {
    const dispatch = useDispatch();

    const view = useSelector(state => ({
        totalView: state.totalViewCount,
        views: state.viewCount,
    }));
    async function getViews(token){
        const response = await PostService.GetViews(token);
        let views = [];
        let read = [];
        for(let item in response) { 
            views.push(response[item].views_count);
            read.push(response[item].read_count);
        }
        dispatch({
            type: "SET_VIEW_COUNT",
            payload: {
                views: views,
                read: read
            }
        });
    }
    function getDiffCount(array){
        const len = array.length-1;
        const diff = array[len] - array[len-1];
        return diff;
    }
    async function getTotalViews(token){
        const views = await PostService.GetTotalViews(token);
        const read = await PostService.GetTotalRead(token);
        dispatch({
            type: "SET_TOTAL_VIEW_COUNT",
            payload: {
                views: views,
                read: read
            }
        });
    }
    const isPositiveDiff = {
        views: {
            mark: getDiffCount(view.views.views)>=0?'n':'k',
            sign: getDiffCount(view.views.views)>=0?'+':'',
            style: getDiffCount(view.views.views)>=0?'up':'down',
            count: getDiffCount(view.views.views)?getDiffCount(view.views.views):0
        },
        read: {
            mark: getDiffCount(view.views.read)>=0?'n':'k',
            sign: getDiffCount(view.views.read)>=0?'+':'',
            style: getDiffCount(view.views.read)>=0?'up':'down',
            count: getDiffCount(view.views.read)?getDiffCount(view.views.read):0
        }
    };
    useEffect(() => {
        getTotalViews(localStorage.token);
        getViews(localStorage.token);
        // eslint-disable-next-line
    }, []);
    return (
        <div className='ViewCount util'>
            <div className='count_item'>
                <h2>{Intl.NumberFormat('en-In').format(view.totalView.views)}</h2>
                <div className='total'>
                    <span>Total View</span>
                    <div className={isPositiveDiff.views.style+' mark'}>
                        <span className='icon_font'>{isPositiveDiff.views.mark}</span>
                        <span>{isPositiveDiff.views.sign}</span>
                        <span>{isPositiveDiff.views.count}</span>
                    </div>
                </div>
            </div>
            <div className='separator'></div>
            <div className='count_item'>
                <h2>{Intl.NumberFormat('en-In').format(view.totalView.read)}</h2>
                <div className='total'>
                    <span>Total Read</span>
                    <div className={isPositiveDiff.read.style+' mark'}>
                        <span className='icon_font'>{isPositiveDiff.read.mark}</span>
                        <span>{isPositiveDiff.read.sign}</span>
                        <span>{isPositiveDiff.read.count}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
