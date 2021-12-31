import React from 'react';
import './menu-item.styles.scss';
import { withRouter } from 'react-router-dom';

// history and match prop is coming fom the withRouter in the bottom
// linkUrl prop is just coming from the data. It's hardcoded in there
const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
    <div
        className={`menu-item ${size}`}
        onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
        <div
            className="background-image"
            style={{
                backgroundImage: `url(${imageUrl})`,
            }}
        />
        <div className="content">
            <div className="title">{title.toUpperCase()}</div>
            <span className="subtitle">SHOP NOW</span>
        </div>
    </div>
);

export default withRouter(MenuItem);
