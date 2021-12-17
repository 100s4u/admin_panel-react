import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostService from '../../api/post';

export const ViewCount = () => {
    const dispatch = useDispatch();
    const [totalView, views] = useSelector((state) => [
        state.totalViewCount,
        state.viewCount
    ]);
    async function getViews(token){
        const response = await PostService.GetViews(token);
        const {views, read} = response.reduce((acc, cur)=>{
            return {views: [...acc.views, cur.views_count], read: [...acc.read, cur.read_count]}
        }, {views: [], read: []});
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
    const diffViews = getDiffCount(views.views);
    const diffRead = getDiffCount(views.read);
    const isPositiveDiff = {
        views: {
            mark: diffViews>=0?'n':'k',
            sign: diffViews>=0?'+':'',
            style: diffViews>=0?'up':'down',
            count: diffViews?diffViews:0
        },
        read: {
            mark: diffRead>=0?'n':'k',
            sign: diffRead>=0?'+':'',
            style: diffRead>=0?'up':'down',
            count: diffRead?diffRead:0
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
                <h3>{Intl.NumberFormat('en-In').format(totalView.views)}</h3>
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
                <h3>{Intl.NumberFormat('en-In').format(totalView.read)}</h3>
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
