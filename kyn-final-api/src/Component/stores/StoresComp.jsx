import React, { Component } from 'react'
import { listAllStores, searchByKey } from '../../service/KYNService'
import StoreCard from './StoresCard'

export class StoresComp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stores: [],
            keyword: ''
            //currentRole: ''
        }
    }

    loadListOfStores = () => {
        listAllStores()
            .then(response => {
                console.log(response)
                this.setState({
                    stores: response
                })
            })
    }

    // loadListFromSearch = () => {
    //     searchByKey(this.state.keyword)
    //         .then(response => {
    //             console.log(response)
    //             this.setState({
    //                 stores: response
    //             })
    //         })
    // }

    searchKeyHandler = event => {
        this.setState({
            keyword: event.target.value
        })
    }

    searchKeyStores = keyword => {
        this.props.history.push(`/search/${keyword}`)
        // this.props.history.push({
        //     pathname: `/search`,
        //     search: `?key=${keyword}`
        // })
    }

    // loadCurrentRole = () => {
    //     this.props.currentUser.roles.map(value => {
    //         //console.log(value.name)
    //         this.setState({
    //             currentRole: value.name
    //         })
    //     })
    // }

    componentDidMount() {
        this.loadListOfStores();
        // this.loadCurrentRole();
        // console.log(this.state.currentRole)
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row mt-3 justify-content-center">
                        <div className="col-md-4">
                            <form>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control input-keyword" id="search-input-key" placeholder="Search by key.."
                                        value={this.state.keyword} onChange={this.searchKeyHandler}></input>
                                    <div className="input-group-append">
                                        <button className="btn btn-dark search-button" id="search-button-key"
                                            onClick={() => this.searchKeyStores(this.state.keyword)}>Search</button>
                                    </div>
                                </div>
                            </form>
                            {/* <RenderButton item={this.state.currentRole} /> */}
                        </div>
                    </div>
                </div>
                <div className="album py-5 bg-light">
                    <div className="container">
                        <StoreCard onPassData={this.state.stores} />
                    </div>
                </div>
            </div>
        )
    }
}

// const RenderButton = item => {
//     const role = 'ROLE_ADMIN'
//     if (item == role) {
//         return (
//             <div className="justify-content-md-center d-grid gap-2 d-md-flex mb-3">
//                 <button className="btn btn-warning">Add Store</button>
//             </div>
//         )
//     }
//     return null;
// }

export default StoresComp;