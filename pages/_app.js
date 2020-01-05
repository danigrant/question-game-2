import App from 'next/app'
import Head from 'next/head'


class QuestionGame extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <div>
        <Head>
          <title>The Question Game</title>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Nunito:400,700&display=swap" rel="stylesheet" />
          <link rel="icon" href="https://globalmysteryinc.com/images/favicon.png" type="image/png" />
          <link rel="stylesheet" href="/css/utils.css" />
          <link rel="stylesheet" href="/css/styles.css" />
        </Head>
        <Component {...pageProps} />
        <style jsx global>{`
          body {
            background: url(/images/dinosaurs.png) no-repeat center center fixed;
            background-size: cover;
            font-family: 'Nunito', sans-serif;
            line-height: 1.5;
            color: #222;
          }

          a {
            text-decoration: none;
            color: #0f65ef;
          }

          a:hover {
            filter: brightness(105%);
          }

          a:active {
            filter: brightness(110%);
          }
        `}</style>
      </div>
    )
  }
}

QuestionGame.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps }
}

export default QuestionGame
