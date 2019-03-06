import React from 'react';

const style = {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
}

const NotFound = () => (
    <div className="not-found-container" style={style}>
        <h1 style={{fontSize: '56px', fontWeight: 'bold', margin: 0}}>404</h1>
        <h2 style={{marginTop: '-15px', color: '#c3c3c3'}}>Not Found</h2>
    </div>
)

export default NotFound;