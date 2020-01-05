import axios from 'axios'

class Index extends React.Component {
  state = { activePostIndex: 0 }

  static async getInitialProps() {
    const { data } = await axios.get('http://localhost:3000/api/posts')
    return { posts: data }
  }

  render() {
    const { posts } = this.props
    const { activePostIndex } = this.state

    return (
      <div>
        <div className="container">
          <div className="attribution">
            <span className="attribution-avatar">
              <img src={posts[activePostIndex].avatar_image_url} />
            </span>
            <div className="attribution-info">
              <div className="attribution-name">{posts[activePostIndex].display_name}</div>
              <div className="attribution-date">Posted on {posts[activePostIndex].date_created}</div>
            </div>
          </div>
          <div className="post">
            { posts[activePostIndex].type == "image" && <img src={posts[activePostIndex].url} alt="A very curious thing that puzzles many!" /> }
            { posts[activePostIndex].type == "video" && (
              <video autoplay>
                <source src={posts[activePostIndex].url} />
              </video>
            ) }
          </div>
        </div>
        <style jsx>{`
          .container {
            width: 95%;
            max-width: 750px;
            background: white;
            border-radius: 10px;
            margin: 0 auto;
            box-sizing: border-box;
            padding: 30px;
            box-shadow: 0px 4px 4px rgba(135, 135, 135, 0.05);
          }
          .post img {
            max-width: 400px;
          }
          .attribution-avatar img {
            width: 3.125rem;
            height: 3.125rem;
            border-radius: 100px;
            position: relative;
            top: 5px;
          }
          .attribution-info {
            display: inline-block;
            margin-left: .5rem;
            margin-bottom: 1rem;
          }
          .attribution-name {
            font-weight: bold;
          }
          .attribution-date {
            color: #757575;
            font-size: .875rem;
            line-height: 1.3;
          }
        `}</style>
      </div>
    )
  }
}

export default Index
