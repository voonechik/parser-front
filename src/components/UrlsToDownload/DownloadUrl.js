import React from 'react';
import './DownloadUrl.css';

const downloadUrl = (props) => (
    <div className='download-url'>
        <p>{props.text}</p>
        <button type='button' onClick={props.removeUrl} className="btn-floating btn-small waves-effect waves-light red">
            <i className="material-icons">remove</i>
        </button>
    </div>
);

export default downloadUrl;