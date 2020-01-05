export default ({  }) => (
  <div className="header-wrapper">
    <img className="logo" src="/images/logo.png" />
    <div className="menu-items" >
      <div>About</div>
      <div>Submit</div>
      <div>Leaderboard</div>
      <div className="button">Login With Twitter</div>
    </div>
    <style jsx>{`
      .header-wrapper {
        margin: 1rem;
      }
      .logo {
        width: 300px;
      }
      .menu-items {
        float: right;
      }
      .menu-items div {
        background-color: #FFE7E9;
        border-radius: 10px;
        font-weight: bold;
        margin-left: 1rem;
        display: inline-block;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
      }
      .menu-items div:hover {
        filter: brightness(105%);
      }
      .menu-items div:active {
        filter: brightness(110%);
      }
    `}</style>
  </div>
)
