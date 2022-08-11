import React, { Component } from 'react'
import { searchByKey } from '../../service/KYNService'
import StoreCard from './StoresCard'

export class SearchByKeyComp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stores: [],
            keyword: this.props.match.params.keyword
        }
    }

    loadListFromSearch = () => {
        searchByKey(this.state.keyword)
            .then(response => {
                console.log(response)
                this.setState({
                    stores: response
                })
            })
    }

    componentDidMount() {
        this.loadListFromSearch();
    }

    render() {
        return (
            <div className="album py-5 bg-light">
                <div className="container">
                    <h3 className="mb-5">Result of your search for "{this.state.keyword}"</h3>
                    <StoreCard onPassData={this.state.stores} />
                </div>
            </div>
        )
    }
}

export default SearchByKeyComp