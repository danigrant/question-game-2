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
        <div className="attribution">
          <img src="" />
        </div>
        <div className="post">
          <img src={posts[activePostIndex].url} alt="A very curious thing that puzzles many!" />
        </div>
        <style jsx>{`
          .post img {
            max-width: 400px;
          }
        `}</style>
      </div>
    )
  }
}

export default Index
