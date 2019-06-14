import React, { Component } from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import searchIcon from '../images/magnifying-glass.svg';
import map from '../images/ny-map.svg';
import SearchResult from '../components/SearchResult';
import FilterCategory from '../components/FilterCategory';
import CustomDropdown from '../components/CustomDropdown';
import styles from '../styles/Browse.module.css';

class Browse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            searchOpportunities: true,
            showAffiliation: true,
            showTopic: true,
            showStatus: true,
            showLocation: true,
            sortBy: "name-asc",
            searchResults: [
                {
                    type: "project",
                    name: "Project Name",
                    owner: "John Smith",
                    status: 'complete',
                    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget neque in mauris tristique condimentum a quis mauris. THERE SHOULD BE A CHARACTER LIMIT ON THIS"
                },
                {
                    type: "project",
                    name: "totally a real project",
                    owner: "Foo Bar",
                    status: 'in progress',
                    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget neque in mauris tristique condimentum a quis mauris."
                },
                {
                    type: "partner",
                    name: "Mary Jane",
                    role: "Practitioner",
                    affiliation: "Cornell"
                },
                {
                    type: "partner",
                    name: "Mary Jane",
                    role: "Researcher",
                    affiliation: "Cornell"
                }
            ]
        };
    }

    handleQueryChange = event => {
        this.setState({ query: event.target.value });
    }

    handleFilterSelect = event => {
        const { location, history } = this.props;
        let parsedURL = queryString.parse(location.search, { arrayFormat: "comma" });
        let filter = parsedURL[event.target.name];

        if (filter) {
            if (Array.isArray(filter)) {
                if (event.target.checked) {
                    filter.push(event.target.value);
                } else {
                    const idx = filter.indexOf(event.target.value);
                    filter.splice(idx, 1);
                }
            } else {
                if (event.target.checked) {
                    const temp = filter;
                    filter = [temp];
                    filter.push(event.target.value);
                } else {
                    filter = undefined;
                }
            }
        } else {
            filter = [event.target.value];
        }

        parsedURL[event.target.name] = filter;
        history.push(`/browse?${queryString.stringify(parsedURL, { arrayFormat: "comma" })}`);
        window.location.reload();
    }

    setCategory = category => {
        this.setState({ searchOpportunities: category === "opportunities" });
    }
    
    toggleFilterVisibility = filter => {
        this.setState(prevState => ({ [filter]: !prevState[filter] }));
    }

    setSort = event => {
        this.setState({ sortBy: event.target.value });
    }

    componentDidMount() {
        const { location } = this.props;
        const parsedURL = queryString.parse(location.search, { arrayFormat: "comma" });
        this.setState({ query: parsedURL.q });
    }

    render() {
        const parsedURL = queryString.parse(this.props.location.search, { arrayFormat: "comma" });
        const filterCategories = [
            {
                categoryName: "Affiliation",
                filterOptions: [
                    "PRYDE Researcher",
                    "4-H Practitioner",
                    "Student",
                    "Cornell",
                    "CCE"
                ],
                isVisible: this.state.showAffiliation,
                defaultValues: parsedURL.affiliation
            },
            {
                categoryName: "Topic",
                filterOptions: [
                    "Purpose in Life",
                    "Health",
                    "skf"
                ],
                isVisible: this.state.showTopic,
                defaultValues: parsedURL.topic
            },
            {
                categoryName: "Status",
                filterOptions: [
                    "Not Started",
                    "In Progress",
                    "Completed"
                ],
                isVisible: this.state.showStatus,
                defaultValues: parsedURL.status
            },
            {
                categoryName: "Location",
                filterOptions: [
                    "Ithaca",
                    "Tompkins County",
                    "Broome County",
                    "Niagara County",
                    "Cayuga County"
                ],
                isVisible: this.state.showLocation,
                defaultValues: parsedURL.location
            }
        ]

        return (
            <div className={styles.browseWrapper}>
                <h1 id={styles.pageHeader}>Browse opportunities and partners</h1>
                <div className={styles.searchWrapper}>
                    <aside className={styles.filtersContainer}>
                        <h2>FILTER</h2>
                        <section>
                            <h3>CATEGORY</h3>
                            <ul>
                                <li>
                                    <button 
                                        className={this.state.searchOpportunities ? styles.activeCategory : ''}
                                        onClick={() => this.setCategory("opportunities")}
                                    >
                                        Research Opportunities
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        className={!this.state.searchOpportunities ? styles.activeCategory : ''}
                                        onClick={() => this.setCategory("partners")}
                                    >
                                        Research Partners
                                    </button>
                                </li>
                            </ul>
                        </section>
                        {
                            filterCategories.map((filterCategory, idx) => 
                                <FilterCategory 
                                    key={idx}
                                    {...filterCategory}
                                    toggleVisibility={this.toggleFilterVisibility}
                                    handleClick={this.handleFilterSelect} 
                                />
                            )
                        }
                    </aside>
                    <section className={styles.searchResultsContainer}>
                        <form className={styles.searchForm}>
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
                                    <img src={searchIcon} alt="Search icon" />
                                </button>
                            </div>
                        </form>
                        {!this.state.searchOpportunities && <img className={styles.map} src={map} alt="New York map" />}
                        {
                            parsedURL.q ?
                            <>
                                <header>
                                    <div>
                                        <h3>Results for "{parsedURL.q}"</h3>
                                        <h4>{this.state.searchResults.length} results</h4>
                                    </div>
                                    <CustomDropdown
                                        handleChange={this.setSort}
                                        name="sort"
                                        label="SORT BY"
                                        options={[
                                            {
                                                value: "name-asc",
                                                text: "Name ↑"
                                            },
                                            {
                                                value: "name-desc",
                                                text: "Name ↓"
                                            }
                                        ]}
                                    />
                                </header>
                                <section className={styles.searchResults}>
                                    {
                                        this.state.searchResults.map((searchResult, idx) => 
                                            <SearchResult key={idx} {...searchResult} />
                                        )
                                    }
                                </section>
                            </> :
                            <h2>Type something into the search bar above!</h2>
                        }
                    </section>
                </div>
            </div>
        );
    }
}

export default withRouter(Browse);