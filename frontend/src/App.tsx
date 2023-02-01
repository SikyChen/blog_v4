import { useSearchParams } from 'react-router-dom';
import './App.css';

function App() {

  let [searchParams, setSearchParams] = useSearchParams();

  function handleClick() {
    setSearchParams({abc: Math.floor(Math.random() * 100) + ''})
  }

  return (
    <div className="App">
      <h1>首页</h1>
      <div>参数abc的值为{searchParams.get('abc')}</div>
      <button onClick={handleClick}>点一下</button>
    </div>
  )
}

export default App;
