import React from 'react';
import Head from './head';

export default props => {
    return (
        <div>
            <Head />
            <h1>I am a header</h1>
            {props.children}
            <h1>I am a footer</h1>
        </div>
    );
};
