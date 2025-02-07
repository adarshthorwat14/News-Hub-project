import React, { Component } from "react";
import NewsItems from "./NewsItems";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "./Loader";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalArticles: 0,
    };

    document.title = `${this.capitalize(this.props.category)} - News Hub`;
  }

  async handlePages() {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json();
    this.props.setProgress(70)
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  }

  async componentDidMount() {
    this.handlePages();
  }

  // handlePevPage = async () => {

  //   this.setState({ page: this.state.page - 1 });
  //   this.handlePages();
  // };
  // handleNextPage = async () => {

  //   this.setState({ page: this.state.page + 1 });
  //   this.handlePages();
  // };

  fetchMoreData = async ()=> {
    this.setState({ page: this.state.page + 1 });

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9356a2341b1c4aa399cf6765aa7728cc&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalArticles: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
<>
        <h1 className="my-2 text-center" style={{ margin: "25px 0" }}>
          <span style={{ color: "red" }}>Top</span>{" "}
          {this.capitalize(this.props.category)} Headlines
        </h1>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loader/>}
        >
         <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItems title={element.title ? element.title : ""} 
                      description={element.description ? element.description : "" }
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                      />
                    </div>
                   
                  );
                  
                })}
                </div>
                </div>
        </InfiniteScroll>

        </>
    );
  }
}

export default News;
