import { useState } from 'react';
import resetButton from '../../style/images/buttons/reset.png';
import rockButton from '../../style/images/buttons/rock-button.png';
import paperButton from '../../style/images/buttons/paper-button.png';
import scissorsButton from '../../style/images/buttons/scissor-button.png';
import rockLeft from '../../style/images/left-options/rock-left.png';
import rockRight from '../../style/images/right-options/rock-right.png';
import paperLeft from '../../style/images/left-options/paper-left.png';
import paperRight from '../../style/images/right-options/paper-right.png';
import scissorsLeft from '../../style/images/left-options/scissor-left.png';
import scissorsRight from '../../style/images/right-options/scissor-right.png';
import '../../style/shake.css';

function Shake() {
    const [fade, setFade] = useState(false);
    const [rockAni, setRockAni] = useState(false);
    const [paperAni, setPaperAni] = useState(false);
    const [scissorsAni, setScissorsAni] = useState(false);
    const [optionLeft, setOptionLeft] = useState(rockLeft);
    const [optionRight, setOptionRight] = useState(rockRight);
    const [playerScore, setPlayerScore] = useState(JSON.parse(localStorage.getItem('user')));
    const [computerScore, setComputerScore] = useState(JSON.parse(localStorage.getItem('computer')));
    const [result, setResult] = useState('');
    const [pick, setPick] = useState(false);
    const [reset, setReset] = useState(false);
    
    const triggerFade = (opR, opL) => {
      setFade(prevState => {
        return !prevState
      })
      setTimeout(() => { setOptionRight(opR) }, 1500);
      setTimeout(() => { setOptionLeft(opL) }, 1500);
      setTimeout(() => { setFade(false) }, 1500);
      setTimeout(() => { document.querySelectorAll('#p-btn').forEach((e) => {e.style.display = 'flex'})}, 1500)
      setTimeout(() => { setPick(true); }, 1500);
    }

    function setButtons() {
      setRockAni(false);
      setPaperAni(false);
      setScissorsAni(false);
      document.querySelectorAll('#p-btn').forEach((e) => {e.style.display = 'none'});
      setResult('');
      setPick(false);
    }

    function game(user) {
      setRockAni(true);
      setPaperAni(true);
      setScissorsAni(true);
      setOptionRight(rockRight);
      setOptionLeft(rockLeft);
      setResult('');
      const options = ['rock', 'paper', 'scissors'];
      const computer = Math.floor(Math.random() * 3) + 1;

      if (options[user - 1] === 'rock') {
        if (options[computer - 1] === 'rock') {
          triggerFade(rockRight, rockLeft);
          setTimeout(() => { setResult("It's a draw"); }, 1500);
        } else if (options[computer - 1] === 'paper') {
          triggerFade(rockRight, paperLeft);
          setTimeout(() => { setComputerScore(computerScore + 1); }, 1500);
          localStorage.setItem('computer', JSON.stringify(JSON.parse(localStorage.getItem('computer')) + 1));
          setTimeout(() => { setResult('You lose ☹️'); }, 1500);
        } else if (options[computer - 1] === 'scissors') {
          triggerFade(rockRight, scissorsLeft);
          setTimeout(() => { setResult('🕺🏽 You WIN! 🍾 🥂'); }, 1500);
          setTimeout(() => { setPlayerScore(playerScore + 1); }, 1500);
          localStorage.setItem('user', JSON.stringify(JSON.parse(localStorage.getItem('user')) + 1));
        }
      } else if (options[user - 1] === 'paper') {
        if (options[computer - 1] === 'rock') {
          triggerFade(paperRight, rockLeft);
          setTimeout(() => { setResult('🕺🏽 You WIN! 🍾 🥂'); }, 1500);
          setTimeout(() => { setPlayerScore(playerScore + 1); }, 1500);
          localStorage.setItem('user', JSON.stringify(JSON.parse(localStorage.getItem('user')) + 1));
        } else if (options[computer - 1] === 'paper') {
          triggerFade(paperRight, paperLeft);
          setTimeout(() => { setResult("It's a draw"); }, 1500);
        } else if (options[computer - 1] === 'scissors') {
          triggerFade(paperRight, scissorsLeft);
          setTimeout(() => { setResult('You lose ☹️'); }, 1500);
          setTimeout(() => { setComputerScore(computerScore + 1); }, 1500);
          localStorage.setItem('computer', JSON.stringify(JSON.parse(localStorage.getItem('computer')) + 1));
        }
      } else if (options[user - 1] === 'scissors') {
        if (options[computer - 1] === 'rock') {
          triggerFade(scissorsRight, rockLeft);
          setTimeout(() => { setResult('You lose ☹️'); }, 1500);
          setTimeout(() => { setComputerScore(computerScore + 1); }, 1500);
          localStorage.setItem('computer', JSON.stringify(JSON.parse(localStorage.getItem('computer')) + 1));
        } else if (options[computer - 1] === 'paper') {
          triggerFade(scissorsRight, paperLeft);
          setTimeout(() => { setResult('🕺🏽 You WIN! 🍾 🥂'); }, 1500);
          setTimeout(() => { setPlayerScore(playerScore + 1); }, 1500);
          localStorage.setItem('user', JSON.stringify(JSON.parse(localStorage.getItem('user')) + 1));
        } else if (options[computer - 1] === 'scissors') {
          triggerFade(scissorsRight, scissorsLeft);
          setTimeout(() => { setResult("It's a draw"); }, 1500);
        }
      }
    }

    function begin() {
      document.querySelectorAll('.bottom-con').forEach((e) => { e.style.display = 'flex'; });
      document.querySelectorAll('#begin').forEach((e) => { e.style.display = 'none'; });
    }

    function resetF() {
      setReset(true);
      localStorage.setItem('user', 0);
      localStorage.setItem('computer', 0);
      setComputerScore(0);
      setPlayerScore(0);
      setTimeout(() => { setReset(false); }, 1000);
    }

    return (
      <div className="container">
        <section className="scores">
          <div>
            <h2>ROCK</h2>
            <h2>PAPER</h2>
            <h2>SCISSORS</h2>
          </div>
            <div className='sub-con'>
              <div className='sub-reset'>
                <p>Reset scores</p>
                <img id={reset ? 'reset-ani' : 'reset'} src={resetButton} alt='reset button icon' onClick={() => {resetF()}} />
              </div>
          <section className="scores-con">
              <div>
                <p>User:</p>
                <p>{playerScore}</p>
              </div>
              <div>
                <p>Computer:</p>
                <p>{computerScore}</p>
              </div>
          </section>
            </div>
        </section>
        <div className="bottom-con">
        <section className="result">
          <h2>{result}</h2>
        </section>
        <section className="ani-con">
        <div
          className={fade ? 'fadedClass' : 'visibleClass'}
        >
          <p className={pick ? 'visible' : 'hidden'}>Computer picked</p>
          <img src={optionLeft} alt='rock' style={{width: '100px', height: '75px'}}/>
        </div>
        <div
          className={fade ? 'fadedClass2' : 'visibleClass'}
        >
        <p className={pick ? 'visible' : 'hidden'}>You picked</p>
          <img src={optionRight} alt='rock' style={{width: '110px', height: '75px'}}/>
        </div>
        </section>
        <section className="a-con">
          <button id='p-btn' onClick={() => { setButtons()}}>Play Again</button>
          <div className="t-a">
            <button onClick={() => { game(1) }}><img id={rockAni ? 'rock-ani' : 'rock'} src={rockButton} alt='rock icon' /></button>
          </div>
          <div className="t-b">
            <button onClick={() => { game(2) }}><img id={paperAni ? 'paper-ani' : 'paper'} src={paperButton} alt='paper icon' /></button>
            <button onClick={() => { game(3) }}><img id={scissorsAni ? 'scissors-ani' : 'scissors'} src={scissorsButton} alt='scissors icon' /></button>
          </div>
        </section>
        </div>
        <button id='begin' onClick={() => { begin()}}>Let's play</button>
      </div>
    )
}

export default Shake;