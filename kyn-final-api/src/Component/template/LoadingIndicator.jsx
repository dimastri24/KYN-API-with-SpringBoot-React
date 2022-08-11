import React from 'react';

export default function LoadingIndicator(props) {
    return (
        <div className="container my-5">
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="mt-3">
                    <h3>Loading...</h3>
                    <h4>Please wait for a couple second.</h4>
                </div>
            </div>
        </div>
    );
}