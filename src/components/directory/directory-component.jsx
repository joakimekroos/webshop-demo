import CategoryItem from '../category-item/category-item.components';

import './directory.styles.scss';

const Directory = (props) => {
  return (
    <div className="directory-container">
      { props.categories.map((c, id) => (
          <CategoryItem key={id} category={c} />
      ))}
    </div>
  )
}

export default Directory;