import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date} = this.props;
    return (
      <div className='my-3'>
        <div className="card">
         
            <img src={!imageUrl?"https://ichef.bbci.co.uk/ace/branded_news/1200/cpsprodpb/f0c7/live/d9180c60-d9b3-11ef-bc01-8f2c83dad217.jpg" : imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}  <span className='badge badge-secondary bg-secondary'> New</span></h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-dark">Read More</a>
            </div>
         </div>
      </div>
    )
  }
}

export default NewsItems
