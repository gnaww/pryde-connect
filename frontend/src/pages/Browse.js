import React, { Component } from 'react';
import queryString from 'query-string';
import searchIcon from '../images/magnifying-glass.svg';
import FilterCategory from '../components/FilterCategory';
import CustomDropdown from '../components/CustomDropdown';
import { sortProjectsOptions, sortUsersOptions, SortableList } from '../components/SortableList';
import styles from '../styles/Browse.module.css';
import api from '../services/api';

class Browse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            searchProjects: true,
            sortBy: '',
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
    }

    setCategory = category => {
        this.setState({ searchProjects: category === "projects" });

        const { location, history } = this.props;
        let parsedURL = queryString.parse(location.search, { arrayFormat: "comma" });
        parsedURL.category = category === "projects" ? "projects" : "partners";
        history.push(`/browse?${queryString.stringify(parsedURL, { arrayFormat: "comma" })}`);
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
    }

    retrieveResults = ({ location }) => {
        const parsedURL = queryString.parse(location.search, { arrayFormat: "comma" });
        this.setState({ query: parsedURL.q ? parsedURL.q : '' });

        if (parsedURL.category) {
            this.setState({ searchProjects: parsedURL.category === "projects" });
        }

        const noFiltersSelected = Object.keys(parsedURL).filter(param => param !== "category" && param !== "q").length === 0

        if (!parsedURL.q && noFiltersSelected) {
            if (parsedURL.category === "partners") {
                api.getUsers()
                    .then(users => this.setState({ searchResults: users }))
                    .catch(err => {
                        alert("There was an error getting your search results. Please refresh the page or try again later.");
                        console.log(err);
                    });
            } else {
                api.getProjects()
                    .then(projects => this.setState({ searchResults: projects }))
                    .catch(err => {
                        alert("There was an error getting your search results. Please refresh the page or try again later.");
                        console.log(err);
                    });
            }
        } else {
            api.search(parsedURL)
                .then(results => this.setState({ searchResults: results }))
                .catch(err => {
                    alert("There was an error getting your search results. Please refresh the page or try again later.")
                    console.log(err);
                });
        }
    }

    componentDidUpdate(prevProps, _prevState) {
        if (prevProps.location.search !== this.props.location.search) {
            this.retrieveResults(this.props);
        }
    }

    componentDidMount() {
        document.title = "PRYDE Connect | Browse";
        this.retrieveResults(this.props);
    }

    render() {
        const parsedURL = queryString.parse(this.props.location.search, { arrayFormat: "comma" });
        const noFiltersSelected = Object.keys(parsedURL).filter(param => param !== "category" && param !== "q").length === 0
        const filterProjectsCategories = [
            {
                categoryName: "Status",
                filterOptions: [
                    "Not Started",
                    "In Progress",
                    "Completed"
                ],
                defaultValues: parsedURL.status
            },
            {
                categoryName: "Research Topic",
                filterOptions: [
                    "Animal Science",
                    "Agriculture",
                    "Career Readiness",
                    "Civic Engagement",
                    "Diversity Equity & Inclusion",
                    "Education & Learning",
                    "Energy",
                    "Environment & Sustainability",
                    "Families",
                    "Gardening & Horticulture",
                    "Health & Wellness",
                    "Intergenerational Engagement",
                    "Life Skills",
                    "Media & Technology",
                    "Motivation",
                    "Nutrition",
                    "Outdoor Education",
                    "Parenting",
                    "Peer Relationships",
                    "Positive Youth Development",
                    "Policy Analysis",
                    "Program Evaluation",
                    "Risk Behavior",
                    "Self & Identity",
                    "Science Technology Engineering & Math (STEM)",
                    "Volunteer Engagement",
                    "Youth/Adult Relationships",
                    "Other"
                ],
                defaultValues: parsedURL.researchtopic
            },
            {
                categoryName: "Age Ranges",
                filterOptions: [
                    "Infants (0-1 year)",
                    "Toddlers (1-2 years)",
                    "Toddlers (2-3 years)",
                    "Preschoolers (3-5 years)",
                    "Early childhood (6-8 years)",
                    "Middle childhood (9-11 years)",
                    "Young teens (12-14 years)",
                    "Teenagers (15-17 years)",
                    "Young adults (18-24 years)",
                    "Adults (25-64 years)",
                    "Seniors (65+ years)"
                ],
                defaultValues: parsedURL.ageranges
            },
            {
                categoryName: "Delivery Modes",
                filterOptions: [
                    "Afterschool programs",
                    "Camps",
                    "Clubs",
                    "In-school Programming",
                    "Summer Youth Employment Opportunities",
                    "Special Interest/Short Term",
                    "Fair/Events",
                    "Other"
                ],
                defaultValues: parsedURL.deliverymodes
            }
        ];
        const filterUsersCategories = [
            {
                categoryName: "Research Interest",
                filterOptions: [
                    "Animal Science",
                    "Agriculture",
                    "Career Readiness",
                    "Civic Engagement",
                    "Diversity Equity & Inclusion",
                    "Education & Learning",
                    "Energy",
                    "Environment & Sustainability",
                    "Families",
                    "Gardening & Horticulture",
                    "Health & Wellness",
                    "Intergenerational Engagement",
                    "Life Skills",
                    "Media & Technology",
                    "Motivation",
                    "Nutrition",
                    "Outdoor Education",
                    "Parenting",
                    "Peer Relationships",
                    "Positive Youth Development",
                    "Policy Analysis",
                    "Program Evaluation",
                    "Risk Behavior",
                    "Self & Identity",
                    "Science Technology Engineering & Math (STEM)",
                    "Volunteer Engagement",
                    "Youth/Adult Relationships",
                    "Other"
                ],
                defaultValues: parsedURL.researchinterest
            },
            {
                categoryName: "Location",
                filterOptions: [
                    "Albany",
                    "Allegany",
                    "Bronx",
                    "Broome",
                    "Cattaraugus",
                    "Cayuga",
                    "Chautauqua",
                    "Chemung",
                    "Chenango",
                    "Clinton",
                    "Columbia",
                    "Cortland",
                    "Delaware",
                    "Dutchess",
                    "Erie",
                    "Essex",
                    "Franklin",
                    "Fulton",
                    "Genesee",
                    "Greene",
                    "Hamilton",
                    "Herkimer",
                    "Jefferson",
                    "Kings (Brooklyn)",
                    "Lewis",
                    "Livingston",
                    "Madison",
                    "Monroe",
                    "Montgomery",
                    "Nassau",
                    "New York (Manhattan)",
                    "Niagara",
                    "Oneida",
                    "Onondaga",
                    "Ontario",
                    "Orange",
                    "Orleans",
                    "Oswego",
                    "Otsego",
                    "Putnam",
                    "Queens",
                    "Rensselaer",
                    "Richmond (Staten Island)",
                    "Rockland",
                    "Saint Lawrence",
                    "Saratoga",
                    "Schenectady",
                    "Schoharie",
                    "Schuyler",
                    "Seneca",
                    "Steuben",
                    "Suffolk",
                    "Sullivan",
                    "Tioga",
                    "Tompkins",
                    "Ulster",
                    "Warren",
                    "Washington",
                    "Wayne",
                    "Westchester",
                    "Wyoming",
                    "Yates",
                    "Other"
                ],
                defaultValues: parsedURL.location
            },
            {
                categoryName: "Age Ranges",
                filterOptions: [
                    "Infants (0-1 year)",
                    "Toddlers (1-2 years)",
                    "Toddlers (2-3 years)",
                    "Preschoolers (3-5 years)",
                    "Early childhood (6-8 years)",
                    "Middle childhood (9-11 years)",
                    "Young teens (12-14 years)",
                    "Teenagers (15-17 years)",
                    "Young adults (18-24 years)",
                    "Adults (25-64 years)",
                    "Seniors (65+ years)"
                ],
                defaultValues: parsedURL.ageranges
            }
        ];
        const filterCategories = this.state.searchProjects ? filterProjectsCategories : filterUsersCategories;

        const sortOptions = this.state.searchProjects ? sortProjectsOptions : sortUsersOptions;

        return (
            <div className={styles.container}>
                <div className={styles.browseWrapper}>
                    <h1 id={styles.pageHeader}>Browse projects and partners</h1>
                    <div className={styles.searchWrapper}>
                        <aside className={styles.filtersContainer}>
                            <h2>FILTER</h2>
                            <div className={styles.box}>
                                <section>
                                    <h3>BROWSE</h3>
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
                                            handleClick={this.handleFilterSelect}
                                        />
                                    )
                                }
                            </div>
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
                            {
                                !parsedURL.q && noFiltersSelected ?
                                    <>
                                        <header>
                                            <div>
                                                <h2>Browsing all {this.state.searchProjects ? "projects" : "partners"}{` (${this.state.searchResults.length} results)`}</h2>
                                            </div>
                                            <CustomDropdown
                                                handleChange={this.setSort}
                                                name="sort"
                                                label="SORT BY"
                                                options={sortOptions}
                                                defaultValue={this.state.sortBy}
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
                                                defaultValue={this.state.sortBy}
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

export default Browse;
