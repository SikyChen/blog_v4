import { Link } from 'react-router-dom';
import { Props } from './types';
import './App.css';

function App(props: Props) {

  const handleTest = () => {
    props.post('test', { aa: 'bb' })
      .then((res: Object) => {
        console.log('res123', res);
      });
  }

  return (
    <div className="App">
      <h1>首页</h1>
      <p>
        <Link to="/article/1" className="margin-right-8">文章页</Link>
        <Link to="/article/edit">编辑页</Link>
      </p>
      <p>
        <button onClick={handleTest}>测试接口</button>
      </p>
    </div>
  )
}

export default App;
