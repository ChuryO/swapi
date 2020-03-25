import React, {Component} from 'react';

import './row.css';

const Row = ({itemListLeft, itemDetailsRight}) => {
    return (
        <div className="row mb-3">
            <div className="col-md-6 mt-4 mt-md-0">
                {itemListLeft}
            </div>
            <div className="col-md-6 mt-4 mt-md-0">
                {itemDetailsRight}
            </div>
        </div>
    );
};

export default Row;
