import React, { Component } from 'react';

class Card extends Component {

  // constructor(props){
  //   super(props);
  // }

  render() {
    const {data} = this.props;

    function getHoursDiff(){
      let postedOn = data.data.created_utc;
      let currentTime = (new Date()).getTime()/1000;
      let diffHours = (currentTime-postedOn)/3600;
      return (parseInt(diffHours)+'h');
    }
    function getThumbnail(){
      if(data.data.thumbnail === 'default' || data.data.thumbnail==='nsfw'){
        return ((data.data.preview.images[0].resolutions[0].url).replace(/&amp;/g, '&'));
      }
      else{
        return data.data.thumbnail;
      }
    }
    return (
      // card template
      <article className='dr-card'>
        {/* header footer article wrapper */}
        <div className='dr-d-flex'>
          {/* thumbnail for post */}
          {!(!data.data.thumbnail_height || data.data.is_self) ? <div>
            <a
              href={data.data.permalink}
              className='dr-img-wrapper'
              style={
                {
                // backgroundImage: 'url('+ ((data.data.thumbnail === 'default') ? ' ' : data.data.thumbnail) +')',
                backgroundImage: ('url('+getThumbnail()+')')
                }
              }
            >
            </a>
          </div> : ''}
          {/* thumbnail for post end */}

          {/* post header and body */}
          <div className='dr-article__header-footer-wrapper'>

            {/* post header */}
            <div className='dr-article__header'>

              {/* subreddit_name */}
              <a
                href={'https://www.reddit.com/'+data.data.subreddit_name_prefixed}
                target='_blank'
                rel="noopener noreferrer"
                className='dr-article__header__post-reddit-link dr-article__header__child'>
                  {data.data.subreddit_name_prefixed}
                </a>
              {/* subreddit name ends */}

              <span className='dr-article__header__child--separator'></span>

              {/* source of post (id any) */}
              {(data.data.is_self) ? '' : (<a
                href={data.data.url}
                className='dr-article__header__child'>
                {data.data.domain}
              </a>)}
              {/* source of post ends */}

              {(data.data.is_self) ? '' : (<span className='dr-article__header__child--separator'></span>)}

              {/* time of post */}
              <span className='dr-article__header__child'>{getHoursDiff()}</span>
              {/* time of post ends */}

              <span className='dr-article__header__child--separator'></span>

              {/* author name */}
              <a
                href={'https://www.reddit.com/user/'+data.data.author}
                className='dr-article__header__child'>
                {'u/'+data.data.author}
              </a>
              {/* author name ends */}

              {/* link flair text */}
              {(data.data.link_flair_text) ? <span className='dr-article__header__child--separator'></span> : ''}
              {(data.data.link_flair_text) ? <span className='dr-article__header__child'>{data.data.link_flair_text}
              </span> : ''}
              {/* link flair text ends  */}
              <button className={"bookmark "+ (data.data.bookmark? 'active' : '')} onClick={this.props.toggleBookmark.bind(this, data, this.props.postIndex)}><i className='flaticon-bookmark'></i></button>

            </div>

            {/* article body */}
            <div className='dr-article__body'>
              <a
                href={'https://www.reddit.com/'+data.data.permalink}
                target='_blank'
                rel="noopener noreferrer">
                  {data.data.title}
              </a>
            </div>
            {/* article body ends */}

          </div>
          {/* post header and body end */}
        </div>
        {/* header footer article wrapper ends*/}

        {/* article footer */}
        <div className='dr-article__footer row'>
          <div className='col-6'>
            <div className='dr-article__footer__child dr-article__footer__child--left'>
              <button onClick={this.props.toggleModal}> <i className='flaticon-share'></i></button>
              <a
                href={data.data.url}
                target='_blank'
                rel="noopener noreferrer"
                className='dr-comments'
                >
                <i className='flaticon-chat'
                style={
                  {
                  // backgroundImage: 'url('+ ((data.data.thumbnail === 'default') ? ' ' : data.data.thumbnail) +')',
                  marginRight: '4px',
                  marginLeft: '4px',
                  }
                }
                ></i>
                {data.data.num_comments} Comments
              </a>
            </div>
          </div>

          <div className='col-6'>
            <div className='dr-article__footer__child dr-article__footer__child--right'>
              {/* <button><i className='flaticon-menu'></i></button> */}
              <div>
                <button 
                  onClick={this.props.toggleModal}
                >
                  <i className='flaticon-chevron-arrow-up'></i>
                </button>
                <span>{data.data.score}</span>
                <button
                  onClick={this.props.toggleModal}
                >
                  <i className='flaticon-chevron-arrow-down'></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* article footer ends */}
        
      </article>
      //card template end
    );
  }
}

export default Card;