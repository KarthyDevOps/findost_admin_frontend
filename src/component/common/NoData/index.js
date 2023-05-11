import React from 'react';

export default function NoData({ grid }) {

    const style = {
        display: 'flex',
        height: '400px',
        alignItems: 'center',
        justifyContent: 'center',
        margin : '0 auto',
    };

    const gridStyle = {
        display: 'grid',
        placeItems: 'center',
        height: '400px',
        margin: 'auto'
    };

    return (
        <>
            {
                !grid &&
                <div style={style}>
                    No Data Found
                </div>
            }
            {
                grid &&
                <div style={gridStyle}>
                    No Data Found
                </div>
            }
        </>
    )
}