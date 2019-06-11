import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AboutMe from './AboutMe';
import Resume from '../Resume/Resume';

export default class AboutMeIndex extends Component {
  render() {
    //获取上一层路由的url
    const {
      match: { url }
    } = this.props;
    return (
      //第二层路由
      <Switch>
        <Route path={`${url}/AboutMe`} component={AboutMe} />
        <Route path={`${url}/Resume`} component={Resume} />
        //重定向
        <Redirect from={`/`} to={`${url}/AboutMe`} />
      </Switch>
    );
  }
}
