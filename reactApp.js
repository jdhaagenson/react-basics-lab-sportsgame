function Team(props) {
  // render() {
    let shotPercentageDiv
    if (props.stats.shots) {
      const shotPercentage = Math.round((props.stats.score / props.stats.shots)*100)
      shotPercentageDiv = (
        <div>
          <strong>Shooting %:</strong>{shotPercentage}
        </div>
      )
    }
      return (
          <div className="Team">
            <h2>{props.name}</h2>
            <div className="identity">
              <img src={props.logo} alt={props.name}/>
            </div>

            <div>
              <strong>Shots:</strong> {props.stats.shots}
            </div>
            <div>
              <strong>Score:</strong> {props.stats.score}
            </div>
            <button onClick={props.shotHandler}>Shoot!</button>
          </div>
      )
  }


class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resetCount:0,
      homeTeamStats:{
        shots:0,
        score:0
      },
      visitingTeamStats:{
        shots:0,
        score:0
      },
    }
    this.shotSound = new Audio('./BackBoard.mp3');
    this.scoreSound = new Audio('./cheers.wav');
    this.missedSound = new Audio('./missed.wav');

  }
  shoot = (team) => {
    const teamStatsKey = `${team}TeamStats`
    let score = this.state[teamStatsKey].score
    this.shotSound.play()
    if (Math.random() > 0.5) {
      score +=1

      setTimeout(() => {
        this.scoreSound.play()
      }, 500)
    } else {
      setTimeout(() => {
        this.missedSound.play()
      }, 500)
    }
    this.setState((state, props) => ({
      [teamStatsKey] : {
        shots: state[teamStatsKey].shots + 1,
        score
      }
    }))
  }
  resetGame = () => {
    this.setState((state, props) => ({
      resetCount:state.resetCount + 1,
      homeTeamStats: {
        shots:0,
        score:0
      },
      visitingTeamStats: {
        shots:0,
        score:0
      }
    }))
  }

  render() {
    return (
      <div className="Game">
        <div className="stats">
          <Team
            name={this.props.visitingTeam.name}
            logo={this.props.visitingTeam.logoSrc}
            stats={this.state.visitingTeamStats}
            shotHandler={() => this.shoot('visiting')}
          />

          <div className="versus">
            <h1>VS</h1>
            <div>
              <strong>Resets:</strong>{this.state.resetCount}
              <button onClick={this.resetGame}>Reset Game</button>
            </div>
          </div>

          <Team
            name={this.props.homeTeam.name}
            logo={this.props.homeTeam.logoSrc}
            stats={this.state.homeTeamStats}
            shotHandler={() => this.shoot('home')}
          />
        </div>
      </div>
    )
  }
}

// Default App component that all other components are rendered through
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