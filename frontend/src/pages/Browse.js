import React, { Component } from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import searchIcon from '../images/magnifying-glass.svg';
import map from '../images/ny-map.svg';
import FilterCategory from '../components/FilterCategory';
import CustomDropdown from '../components/CustomDropdown';
import { sortOptions, SortableList } from '../components/SortableList';
import styles from '../styles/Browse.module.css';
import api from '../services/api';

class Browse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            searchProjects: true,
            showAffiliation: true,
            showTopic: true,
            showStatus: true,
            showLocation: true,
            sortBy: "",
            searchResults: []
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
        this.setState({ searchProjects: category === "projects" });

        const { location, history } = this.props;
        let parsedURL = queryString.parse(location.search, { arrayFormat: "comma" });
        parsedURL.category = category === "projects"  ? "projects" : "partners";
        history.push(`/browse?${queryString.stringify(parsedURL, { arrayFormat: "comma" })}`);
        window.location.reload();
    }

    toggleFilterVisibility = filter => {
        this.setState(prevState => ({ [filter]: !prevState[filter] }));
    }

    setSort = event => {
        this.setState({ sortBy: event.target.value });
    }

    submitQuery = event => {
        event.preventDefault();

        const { location, history } = this.props;
        let parsedURL = queryString.parse(location.search, { arrayFormat: "comma" });
        parsedURL.q = this.state.query;

        history.push(`/browse?${queryString.stringify(parsedURL, { arrayFormat: "comma" })}`);
        window.location.reload();
    }

    componentDidMount() {
        const { location } = this.props;
        const parsedURL = queryString.parse(location.search, { arrayFormat: "comma" });
        this.setState({ query: parsedURL.q ? parsedURL.q : '' });

        if (parsedURL.category) {
            this.setState({ searchProjects: parsedURL.category === "projects" });
        }

        const noFiltersSelected = Object.keys(parsedURL).filter(param => param !== "category" && param !== "q").length === 0

        if(!parsedURL.q && noFiltersSelected) {
            if (parsedURL.category === "projects") {
                api.getProjects()
                    .then(projects => this.setState({ searchResults: projects }))
                    .catch(err => console.log(err));
            } else if (parsedURL.category === "partners") {
                api.getUsers()
                    .then(users => this.setState({ searchResults: users }))
                    .catch(err => console.log(err));
            } else {
                api.getProjects()
                    .then(projects => this.setState({ searchResults: projects }))
                    .catch(err => console.log(err));
            }
        }
    }

    render() {
        const parsedURL = queryString.parse(this.props.location.search, { arrayFormat: "comma" });
        const noFiltersSelected = Object.keys(parsedURL).filter(param => param !== "category" && param !== "q").length === 0
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
                    "Animal Science & Agriculture",
                    "Civic Engagement",
                    "Diversity, Equity & Inclusion",
                    "Education & Learning",
                    "Environment & Sustainability",
                    "Families",
                    "Health & Wellness",
                    "Peer Relationships",
                    "Positive Youth Development",
                    "Policy Analysis",
                    "Program Evaluation",
                    "Media & Technology",
                    "Motivation",
                    "Nutrition",
                    "Risk Behavior",
                    "Self & Identity",
                    "Science, Technology, Engineering & Math (STEM)",
                   "Youth/Adult Relationships"
                ],
                isVisible: this.state.showTopic,
                defaultValues: parsedURL.topic
            },
            {
                categoryName: "Status",
                filterOptions: [
                    "Not Started",
                    "In Progress",
                    "Completed",
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
            <div className={styles.container}>
                <div className={styles.browseWrapper}>
                    <h1 id={styles.pageHeader}>Browse projects and partners</h1>
                    <div className={styles.searchWrapper}>
                        <aside className={styles.filtersContainer}>
                            <h2>FILTER</h2>
                            <section>
                                <h3>CATEGORY</h3>
                                <ul>
                                    <li>
                                        <button
                                            className={this.state.searchProjects ? styles.activeCategory : ''}
                                            onClick={() => this.setCategory("projects")}
                                        >
                                            Research Projects
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className={!this.state.searchProjects ? styles.activeCategory : ''}
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
                            <form className={styles.searchForm} onSubmit={this.submitQuery}>
                                <div>
                                    <input
                                        type="text"
                                        name="q"
                                        value={this.state.query}
                                        onChange={this.handleQueryChange}
                                        placeholder={this.state.searchProjects ?
                                            "Search for research projects" :
                                            "Search for research partners"}
                                    />
                                    <input
                                        type="hidden"
                                        name="category"
                                        value={this.state.searchProjects ? "projects" : "partners"}
                                        hidden
                                    />
                                    <button type="submit" value="Submit">
                                        <img src={searchIcon} alt="Search icon" />
                                    </button>
                                </div>
                            </form>
                            {!this.state.searchProjects && <img className={styles.map} src={map} alt="New York map" />}
                            {
                                !parsedURL.q && noFiltersSelected ?
                                <>
                                    <header>
                                        <div>
                                            <h2>Browsing all { this.state.searchProjects ? "projects" : "partners" }{` (${this.state.searchResults.length} results)`}</h2>
                                        </div>
                                        <CustomDropdown
                                            handleChange={this.setSort}
                                            name="sort"
                                            label="SORT BY"
                                            options={sortOptions}
                                        />
                                    </header>
                                    <section className={styles.searchResults}>
                                        {
                                            <SortableList list={this.state.searchResults} sortBy={this.state.sortBy} />
                                        }
                                    </section>
                                </>
                                :
                                <>
                                    <header>
                                        <div>
                                            <h2>{`${this.state.searchResults.length} results`}</h2>
                                        </div>
                                        <CustomDropdown
                                            handleChange={this.setSort}
                                            name="sort"
                                            label="SORT BY"
                                            options={sortOptions}
                                        />
                                    </header>
                                    <section className={styles.searchResults}>
                                        {
                                            <SortableList list={this.state.searchResults} sortBy={this.state.sortBy} />
                                        }
                                    </section>
                                </>


                            }
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Browse);
