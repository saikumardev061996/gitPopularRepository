import './index.css'

const RepositoryItem = props => {
  const {repositoryItems} = props
  const {name, issuesCount, forksCount, starsCount, avatarCrl} = repositoryItems

  return (
    <li className="repository-list">
      <div className="item-background">
        <img src={avatarCrl} alt={name} className="avatar-image" />
        <h1 className="item-heading">{name}</h1>
        <div className="logo-count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="logo"
          />
          <p className="star-count">{starsCount} stars</p>
        </div>
        <div className="logo-count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="logo"
          />
          <p className="star-count">{forksCount} forks</p>
        </div>
        <div className="logo-count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            className="logo"
            alt="open issues"
          />
          <p className="star-count">{issuesCount} Open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
