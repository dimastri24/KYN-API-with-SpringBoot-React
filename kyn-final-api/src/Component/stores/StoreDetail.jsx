import React, { Component } from 'react'
import { getStoreById } from '../../service/KYNService'

export class StoreDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stores: {},
            storeid: this.props.match.params.storeid
        }
    }

    loadStoreDetail = () => {
        getStoreById(this.state.storeid)
            .then(response => {
                console.log(response)
                this.setState({
                    stores: response
                })
            })
    }

    componentDidMount() {
        this.loadStoreDetail();
    }

    render() {
        return (
            <div className="mt-5">
                <main className="container mb-5">
                    <div className="row g-5">
                        <div className="col-md-7 col-lg-8">
                            <h4 className="mb-3">Store Details</h4>
                            <div className="form-group row mb-1">
                                <h6 className="control-label col-4">Store Name: </h6>
                                <div className="col-8">{this.state.stores.storeName}</div>
                            </div>
                            <div className="form-group row mb-1">
                                <h6 className="control-label col-4">Contact Number: </h6>
                                <label className="col-8">{this.state.stores.contactPhone}</label>
                            </div>
                            <div className="form-group row mb-1">
                                <h6 className="control-label col-4">Contact Email: </h6>
                                <div className="col-8">{this.state.stores.contactEmail}</div>
                            </div>
                            <div className="form-group row mb-1">
                                <h6 className="control-label col-4">Location: </h6>
                                <div className="col-8">{this.state.stores.locationCity}, {this.state.stores.locationProvince}</div>
                            </div>
                            <div className="form-group row mb-1">
                                <h6 className="control-label col-4">Address: </h6>
                                <div className="col-8">{this.state.stores.storeAddress}</div>
                            </div>
                            <div className="form-group row mb-1">
                                <h6 className="control-label col-4">Rating: </h6>
                                <div className="col-8">{this.state.stores.storeRating}</div>
                            </div>
                            <div className="form-group row mb-1">
                                <h6 className="control-label col-4">Description: </h6>
                                <div className="col-8">{this.state.stores.storeDesc}</div>
                            </div>
                            <hr className="my-4" />
                        </div>
                        <div className="col-md-5 col-lg-4 order-md-last">
                            <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg"
                                role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                                <title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" />
                                <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default StoreDetail