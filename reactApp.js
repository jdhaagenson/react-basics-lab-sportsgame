class Team extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      shots: 0,
      score: 0
    }
    this.shotSound = new Audio('./BackBoard.mp3');
    this.scoreSound = new Audio('./cheers.wav');
    this.missedSound = new Audio('./missed.wav');
    '                                                                                                                                                                                              '
  }
  shotHandler = () => {
    let score = this.state.score
    this.shotSound.play()
    if (Math.random() > 0.5) {
      score +=1

      setTimeout(() => {
        this.scoreSound.play()
      }, 500)
    }
    this.setState((state, props) => ({
      shots: state.shots + 1,
      score
    }))
  }
  render() {
    let shotPercentageDiv
    if (this.state.shots) {
      const shotPercentage = Math.round((this.state.score / this.state.shots)*100)
      shotPercentageDiv = (
        <div>
          <strong>Shooting %:</strong>{shotPercentage}
        </div>
      )
    }
      return (
          <div className="Team">
            <h2>{this.props.name}</h2>
            <div className="identity">
              <img src={this.props.logo} alt={this.props.name}/>
            </div>

            <div>
              <strong>Shots:</strong> {this.state.shots}
            </div>
            <div>
              <strong>Score:</strong> {this.state.score}
            </div>
            <button onClick={this.shotHandler}>Shoot!</button>
          </div>
      )
  }
}
function Game(props) {
  return (
    <div className="Game">
      <h1>Welcome to {props.venue}</h1>
      <div className="stats">
        <Team
          name={props.visitingTeam.name}
          logo={props.visitingTeam.logoSrc}
        />
        <div className="versus">
          <h1>VS</h1>
        </div>
        <Team
          name={props.homeTeam.name}
          logo={props.homeTeam.logoSrc}
        />
      </div>
    </div>
  )
}
// Deafault App component that all other compents are rendered through
function App(props){
  const raccoons = {
    name: "Russiaville Raccoons",
    logoSrc:'./raccoon.png'
  }
  const kobras = {
    name:"California Cobras",
    logoSrc: './snake.png'
  }
  const lions = {
    name: "Louisiana Lions",
    logoSrc: './lion-309219_640.png'
  }
  const wildcats = {
    name: "Waco Wildcats",
    logoSrc: './wildcat-309220_640.png'
  }
  return (
    <div className="App">
      <Game
        venue="Union 525 Gem"
        homeTeam={kobras}
        visitingTeam={raccoons}
      />
      <Game
        venue="Sheridan Arena"
        homeTeam={lions}
        visitingTeam={wildcats}
      />
    </div>
  )
}

//Render the application
ReactDOM.render(
  <App />,
  document.getElementById('root')
);