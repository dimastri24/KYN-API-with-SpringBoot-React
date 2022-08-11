import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class StoresCard extends Component {
    viewStoreDetail = storeid => {
        this.props.history.push(`/store/${storeid}`)
    }

    render() {
        return (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {
                    this.props.onPassData.map(store =>
                        <div className="col" key={store.storeId}>
                            <div className="card shadow-sm">
                                <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg"
                                    role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                                    <title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" />
                                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                                <div className="card-body">
                                    <p className="card-text h4">{store.storeName}</p>
                                    <p className="card-text">{store.locationCity}, {store.locationProvince} | {store.contactPhone}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="card-text">Rating: {store.storeRating}</p>
                                        <div className="btn-group">
                                            <Link to={`/store/${store.storeId}`} className="btn btn-sm btn-outline-secondary">View detail</Link>
                                            {/* <button onClick={() => this.viewStoreDetail(store.storeId)} className="btn btn-sm btn-outline-secondary">View detail</button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default StoresCard