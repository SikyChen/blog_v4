import { Link, Route } from 'react-router-dom';
import { Props } from './types';
import './App.css';
import List from './pages/List';
import withMenu from './components/Menu/withMenu';

function App(props: Props) {

  return (
    <div className="App">
      {/* <p>
        <Link to="/article/0" className="margin-right-8">文章页</Link>
        <Link to="/article/edit">编辑页</Link>
      </p> */}
      <div className="logo-image">
        <div className="title">SIKY的小站</div>
      </div>
      <List {...props} />
    </div>
  )
}

export default App;
