import React, { Component } from 'react';
import './App.css';
import Index from './pages/index/index';
import NavigationBar from './components/NavigationBar/NavigationBar';
import ProjectDisplay from './pages/ProjectDisplay/ProjectDisplay';
import GuestBook from './pages/GuestBook/GuestBook';
import Pictures from './pages/Pictures/Pictures';
import AboutMeIndex from './pages/AboutMe/AboutMeIndex';
import Article from './pages/Article/article';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div className='App'>
        <Router>
          <NavigationBar
            one='主页'
            two='相册展示'
            three='项目展示'
            four='关于我'
            five='留言本'
          />
          <Switch>
            <Route path={'/index'} component={Index} />
            <Route path={'/Pictures'} component={Pictures} />
            <Route path={'/ProjectDisplay'} component={ProjectDisplay} />
            <Route path={'/AboutMeaaa'} component={AboutMeIndex} />
            <Route path={'/GuestBook'} component={GuestBook} />
            <Route path={'/Article/:articleId'} component={Article} />
            <Redirect from='/' to='/index' />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
