import './index.css'

const LanguageFilterItem = props => {
  const {languageFiltersData, clickLanguage} = props
  const {language, id} = languageFiltersData

  const onClickLanguage = () => {
    clickLanguage(id)
  }

  return (
    <li className="list-language-items">
      <button type="button" className="button" onClick={onClickLanguage}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
