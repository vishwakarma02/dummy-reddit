import React, { Component } from 'react';

class Card extends Component {
  render() {
    const {data} = this.props;

    function getHoursDiff(){
      let postedOn = data.data.created_utc;
      let currentTime = (new Date()).getTime()/1000;
      let diffHours = (currentTime-postedOn)/3600  ;
      return (parseInt(diffHours)+'h');
    }
    return (
      // <div>card :{data.data.author}  </div>
      <article className='dr-card'>
        <div className='dr-d-flex'>
          {!(data.data.is_self) ? <div>
            <a
              href={data.data.permalink}
              className='dr-img-wrapper'
              style={
                {
                backgroundImage: 'url('+data.data.thumbnail+')',
                }
              }
            >
            </a>
          </div> : ''}
          <div>
            <div className='dr-article__header'>
              <a
                href={'https://www.reddit.com/'+data.data.subreddit_name_prefixed}
                target='_blank'
                rel="noopener noreferrer"
                className='dr-article__header__post-reddit-link dr-article__header__child'>
                  {data.data.subreddit_name_prefixed}
                </a>
              <span className='dr-article__header__child--separator'></span>
              <a
                href={'https://www.reddit.com/'+data.data.domain}
                className='dr-article__header__child'>
                {data.data.domain}
              </a>
              <span className='dr-article__header__child--separator'></span>
              <span className='dr-article__header__child'>{getHoursDiff()}</span>
              <span className='dr-article__header__child--separator'></span>
              <a
                href={'https://www.reddit.com/user/'+data.data.author}
                className='dr-article__header__child'>
                {'u/'+data.data.author}
              </a>
              {(data.data.link_flair_text) ? <span className='dr-article__header__child--separator'></span> : ''}
              {(data.data.link_flair_text) ? <span className='dr-article__header__child'>{data.data.link_flair_text}</span> : ''}
            </div>
            <div className='dr-article__body'>
              <a
                href={'https://www.reddit.com/'+data.data.permalink}
                target='_blank'
                rel="noopener noreferrer">
                  {data.data.title}
              </a>
            </div>
          </div>
        </div>
        <div className='dr-article__footer row'>
          <div className='col-6'>
            <div className='dr-article__footer__child dr-article__footer__child--left'>
              <button>Share</button>
              <a
                href={data.data.url}
                target='_blank'
                rel="noopener noreferrer"
                >
                {data.data.num_comments} Comments
              </a>
            </div>
          </div>

          <div className='col-6'>
            <div className='dr-article__footer__child dr-article__footer__child--right'>
              <button>. . .</button>
              <div>
                <button>up</button>
                <span>{data.data.score}</span>
                <button>Down</button>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default Card;