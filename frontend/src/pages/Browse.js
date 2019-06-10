import React, { Component } from 'react';
import searchIcon from '../images/magnifying-glass.svg';
import styles from '../styles/Browse.module.css';

class Browse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            searchOpportunities: true,
            showTopic: true,
            showStatus: true,
            showLocation: true,
            sortBy: 'name',
            searchResults: []
        };
    }

    handleQueryChange = event => {
        this.setState({ query: event.target.value });
    }

    handleSubmitQuery = event => {
        console.log(this.state.query);
    }

    componentDidMount() {
        const { location } = this.props;
        console.log(location);
        this.setState({ query: location.search.slice(3)})
    }

    render() {
        return (
            <>
                <form className={styles.searchForm} onSubmit={this.handleSubmitQuery}>
                    <div>
                        <input 
                            type="text"
                            name="q"
                            value={this.state.query}
                            onChange={this.handleQueryChange}
                            placeholder={this.state.searchOpportunities ?
                                "Search for research opportunities" :
                                "Search for research partners"}
                        />
                        <button type="submit" value="Submit">
                            <img src={searchIcon} alt="Magnifying glass" />
                        </button>
                    </div>
                </form>
                <div className={styles.searchWrapper}>
                    <aside className={styles.filtersContainer}>
                        <h1>FILTER</h1>
                        <section>
                            <h2>Category</h2>
                            <ul>
                                <li>Research Opportunities</li>
                                <li>Research Partners</li>
                            </ul>
                        </section>
                        <details>
                            <summary>TOPIC</summary>
                            <ul>
                                <li><input type="checkbox" />Purpose in Life</li>
                                <li><input type="checkbox" />asj lkfa lsd</li>
                                <li><input type="checkbox" />aflafjask sadf</li>
                            </ul>
                        </details>
                        <details>
                            <summary>STATUS</summary>
                            <ul>
                                <li><input type="checkbox" />Not Started</li>
                                <li><input type="checkbox" />In Progress</li>
                                <li><input type="checkbox" />Completed</li>
                            </ul>
                        </details>
                        <details>
                            <summary>LOCATION</summary>
                            <ul>
                                <li><input type="checkbox" />Ithaca</li>
                                <li><input type="checkbox" />Tompkins County</li>
                                <li><input type="checkbox" />Broome County</li>
                                <li><input type="checkbox" />Niagara County</li>
                                <li><input type="checkbox" />Cayuga County</li>
                            </ul>
                        </details>
                    </aside>
                    <section className={styles.searchResultsContainer}>
                        <header>
                            <h3>Results for "{this.props.location.search.slice(3)}"</h3>
                            <h4>{this.state.searchResults.length} results</h4>
                            <select name="sort">
                                <option value="" selected disabled>SORT BY</option>
                                <option value="name-asc">Name &uarr;</option>
                                <option value="name-desc">Name &darr;</option>
                            </select>
                        </header>
                    </section>
                </div>
            </>
        );
    }
}

export default Browse;
