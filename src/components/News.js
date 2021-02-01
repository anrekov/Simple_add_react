import React from 'react' // мы обязаны импортировать необходимые пакеты в каждом файле
import PropTypes from 'prop-types' // у Article это react и prop-types
import { Article } from './Article' // идти в components не нужно, так как мы уже в этой директории

class News extends React.Component {
  state = {
    filteredNews: this.props.data,
  }

  componentWillReceiveProps(nextProps) {
    let nextFilteredNews = [...nextProps.data]

    nextFilteredNews.forEach((item, index) => {
      if (item.bigText.toLowerCase().indexOf('pubg') !== -1) {
        item.bigText = 'СПАМ'
      }
    })
    this.setState({ filteredNew: nextFilteredNews })
  }

  renderNews = () => {
    const { filteredNews } = this.state;
    let newsTemplate = null;

    if (filteredNews.length) {
      newsTemplate = filteredNews.map(function (item) {
        return <Article key={item.id} data={item} />;
      });
    } else {
      newsTemplate = <p>К сожалению новостей нет</p>;
    }

    return newsTemplate;
  };
  render() {
    const { filteredNews } = this.state;

    return (
      <div className="news">
        {this.renderNews()}
        {filteredNews.length ? (
          <strong className={"news__count"}>
            Всего новостей: {filteredNews.length}
          </strong>
        ) : null}
      </div>
    );
  }
}

News.propTypes = {
  data: PropTypes.array.isRequired
};

export { News } // именованный экспорт