import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    repositoryItems: [],
    activeId: languageFiltersData[0].id,
    apiState: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCoursesData()
  }

  getCoursesData = async () => {
    const {activeId} = this.state
    this.setState({apiState: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarCrl: each.avatar_url,
      }))

      this.setState({
        repositoryItems: updatedData,
        apiState: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({apiState: apiStatusConstants.failure})
    }
  }

  clickLanguage = activeId => {
    this.setState({activeId}, this.getCoursesData)
  }

  renderLoadingView = () => (
    <>
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    </>
  )

  renderFailureView = () => (
    <>
      <div className="failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt=" failure view"
          className="failure-img"
        />
        <h1 className="failure-heading">SOMETHING WENT WRONG</h1>
      </div>
    </>
  )

  renderSuccessView = () => {
    const {repositoryItems} = this.state
    return (
      <ul className="repository-ul-list">
        {repositoryItems.map(eachList => (
          <RepositoryItem key={eachList.id} repositoryItems={eachList} />
        ))}
      </ul>
    )
  }

  renderApiStatus = () => {
    const {apiState} = this.state

    switch (apiState) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="app-heading">Popular</h1>
        <ul className="language-filter-items">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              key={eachItem.id}
              languageFiltersData={eachItem}
              clickLanguage={this.clickLanguage}
            />
          ))}
        </ul>
        {this.renderApiStatus()}
      </div>
    )
  }
}

export default GithubPopularRepos
