import axios from 'axios'
import Header from '../components/Header'

class Index extends React.Component {
  state = { activePostIndex: 0, question: '' }

  static async getInitialProps() {
    const { data } = await axios.get('http://localhost:3000/api/posts')
    return { posts: data }
  }

  handleChange = event => {
    this.setState({ question: event.target.value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.setState({ question: '' })
    const { data } = await axios.post('http://localhost:3000/api/posts', {  })
  }

  handleSkip = () => {
    const { activePostIndex } = this.state
    this.setState({ activePostIndex: activePostIndex + 1, question: '' })
  }

  render() {
    const { posts } = this.props
    const { activePostIndex } = this.state

    return (
      <div>
        <Header />
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
              <video autoplay controls loop>
                <source src={posts[activePostIndex].url} />
              </video>
            ) }
            <p className="post-prompt">What is the question on the tip of your tongue?</p>
            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="ask your magnificent question" onChange={this.handleChange} />
              <button type="submit">Ask your question and see others</button>
              <button onClick={this.handleSkip}>Skip</button>
            </form>
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
            padding-left: 80px;
            padding-right: 80px;
            box-shadow: 0px 4px 4px rgba(135, 135, 135, 0.05);
          }
          .post img, .post video {
            max-width: 590px;
            max-height: 400px;
            display: block;
            margin: 0 auto;
          }
          video {
            outline: none;
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
          .post-prompt {
            font-weight: bold;
          }
          .post input {
            width: 100%;
            padding: 1rem;
            outline: none;
            font-family: inherit;
            color: inherit;
            font-size: inherit;
            margin-bottom: 1rem;
          }
          button {
            font-weight: bold;
            background: #B7B7B7;
            font-family: inherit;
            font-size: inherit;
            border: none;
            outline: none;
            border-radius: 10px;
            min-width: 90px;
            padding: 0.5rem;
            padding-left: 1rem;
            padding-right: 1rem;
            cursor: pointer;
          }
          button[type="submit"] {
            background-color: #df29de;
            color: white;
            margin-right: 1rem;
          }
          button:hover {
            filter: brightness(105%);
          }
          button:active {
            filter: brightness(110%);
          }
        `}</style>
      </div>
    )
  }
}

export default Index
