import React from 'react';
import '../style/css/Loading.css';

function Loading() {
    return (
        <div role="status">
            {/* <span className="visually-hidden">Loading...</span> */}
            <div className="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}

export default Loading;

