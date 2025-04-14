import { useEffect, useState } from 'react'
import './App.css'
import styles from './App.module.css'
import { FaRegHandPaper, FaRegHandRock, FaRegHandScissors } from 'react-icons/fa'


function App() {
  const [playerHand, setPlayerHand] = useState(0)
  const [computerHand, setComputerHand] = useState(0)
  const [timer, setTimer] = useState(3)
  const [runTimer, setRunTimer] = useState(false)
  const [results, setResults] = useState( {
    winner: '',
    message: ''
  })
  const [score, setScore] = useState({
    player: 0,
    computer: 0
  })
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => { 
    if (runTimer && timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1)
      }, 1000)
    } else if (runTimer && timer < 1) {
      setRunTimer(false)
      setTimer(3)
      play()
    }
  }, [runTimer, timer])

  const options = [
    {name: 'Kő', icon: <FaRegHandRock size={60} />},
    {name: 'Papír', icon: <FaRegHandPaper size={60} />},
    {name: 'Olló', icon: <FaRegHandScissors size={60} />}
  ]


  const selectOption = (handIndex: number) => {
    setResults({
      winner: '',
      message: ''
    })
    setPlayerHand(handIndex)
  }

  const generateComputerHand = () => {
    const randomNumber = Math.floor(Math.random() * 3)
    setComputerHand(randomNumber)
  }

  const start = () => {
    setResults({
      winner: '',
      message: ''
    })
    setRunTimer(true)
    setIsPulsing(true)
    generateComputerHand()
  }

  const play = () => {
    setIsPulsing(false)

      //Döntetlenek
      if (options[playerHand].name === "Kő" && options[computerHand].name == "Kő") {
        setResults({winner: "Senki", message: "A játszma döntetlen."})
      } else if (options[playerHand].name === "Papír" && options[computerHand].name == "Papír") {
        setResults({winner: "Senki", message: "A játszma döntetlen."})
      } else if (options[playerHand].name === "Olló" && options[computerHand].name == "Olló") {
        setResults({winner: "Senki", message: "A játszma döntetlen."})
      }

      //Számítógép nyer
      if (options[playerHand].name === "Kő" && options[computerHand].name == "Papír") {
        setResults({winner: "Számítógép", message: "A papír becsomagolja a követ."})
        setScore({... score, computer: score.computer + 1})
      } else if (options[playerHand].name === "Papír" && options[computerHand].name == "Olló") {
        setResults({winner: "Számítógép", message: "Az olló elvágja a papírt."})
        setScore({... score, computer: score.computer + 1})
      } else if (options[playerHand].name === "Olló" && options[computerHand].name == "Kő") {
        setResults({winner: "Számítógép", message: "Az kő kicsorbítja az ollót."})
        setScore({... score, computer: score.computer + 1})
      }

      //Játékos nyer
      if (options[computerHand].name === "Kő" && options[playerHand].name == "Papír") {
        setResults({winner: "Játékos", message: "A papír becsomagolja a követ."})
        setScore({... score, player: score.player + 1})
      } else if (options[computerHand].name === "Papír" && options[playerHand].name == "Olló") {
        setResults({winner: "Játékos", message: "Az olló elvágja a papírt."})
        setScore({... score, player: score.player + 1})
      } else if (options[computerHand].name === "Olló" && options[playerHand].name == "Kő") {
        setResults({winner: "Játékos", message: "Az kő kicsorbítja az ollót."})
        setScore({... score, player: score.player + 1})
      }
    }

  return (
    <>

    <div className={`${styles.background} ${isPulsing ? styles.pulsing : ""} ${results.winner == "Játékos" ? styles.winner : ""} ${results.winner == "Számítógép" ? styles.loser : ""} ${results.winner == "Senki" ? styles.draw : ""}`} />
    <div className={styles.container}>
      <div className={styles.titleCtn}>
        <h1>Kő, papír, olló</h1>
        <h3>Készítette: Erdei Erik Martin</h3>
      </div>
      <div className={styles.scoreCtn}>
        <div className={styles.score}>
          <h3>Játékos</h3>
          <p>Pontszám: {score.player}</p>
        </div>
        <div className={styles.score}>
          <h3>Számítógép</h3>
          <p>Pontszám: {score.computer}</p>
        </div>
      </div>
        <div className={styles.results}>
          <div className={styles.playerHand}>
            {runTimer && <div className={styles.playerShake}>{options[0].icon}</div>}
            {results?.winner && (
              <>
              {options[playerHand].icon}
              <p>{options[playerHand].name}</p>
              </>
            )}
          </div>
          <div className={styles.midCol}>
            {runTimer && <p className={styles.timer}>{timer}</p>}
            {results?.winner && (
              <>
                <p className={styles.resultsWinner}>Győztes: {results.winner}</p>
                <p className={styles.resultsMessage}>{results.message}</p>
              </>
            )}
          </div>
          <div className={styles.computerHand}>
          {runTimer && <div className={styles.computerShake}>{options[0].icon}</div>}
          {results?.winner && (
              <>
              {options[computerHand].icon}
              <p>{options[computerHand].name}</p>
              </>
            )}
          </div>
      </div>
      <div className={styles.choiceBtnCtn}>
        <button className={`${styles.choiceBtn} ${styles.bounce} ${playerHand === 0 ? styles.activeChoice : ''}`} onClick={() => selectOption(0)}>
          <FaRegHandRock size={60} />
          Kő
        </button>
        <button className={`${styles.choiceBtn} ${styles.bounce} ${playerHand === 1 ? styles.activeChoice : ''}`} onClick={() => selectOption(1)}>
          <FaRegHandPaper size={60} />
          Papír
        </button>
        <button className={`${styles.choiceBtn} ${styles.bounce} ${playerHand === 2 ? styles.activeChoice : ''}`} onClick={() => selectOption(2)}>
          <FaRegHandScissors size={60} />
          Olló
        </button>
      </div>
      <button className={styles.playBtn} onClick={start}>Játék!</button>
    </div>
    </>
    
  )
}

export default App
