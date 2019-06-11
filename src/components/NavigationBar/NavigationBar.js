import React, { Component } from 'react';
import { Menu, Input, Icon, Button, message } from 'antd';
import Logo from '../../assets/Logo.png';
import './NavigationBar.css';
import { Link, withRouter } from 'react-router-dom';

const info = () => {
  message.info('该功能尚未开发！');
};

class NavigationBar extends Component {
  constructor(){
    super()
    this.state = {
      current: 'home'
    };
  }

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  render() {
    const { one, two, three, four, five } = this.props;
    //withRouter自带属性
    const {
      location: { pathname }
    } = this.props;
    console.log(pathname);
    return (
      //判断url是否是关于我页面，选择是否隐藏导航栏
      <div
        className={
          pathname === '/AboutMeaaa/Resume'
            ? 'navigationBar-hide'
            : 'navigationBar'
        }
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={Logo} className='App-logo' alt='logo' />
          <div
            style={{
              fontSize: '30px',
              fontWeight: 'bold',
              margin: ' 0 25px 0 0'
            }}
          >
            You's Blog
          </div>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode='horizontal'
          >
            <Menu.Item key='home'>
              <Link to='/'>
                <Icon type='home' />
                {one}
              </Link>
            </Menu.Item>
            <Menu.Item key='picture'>
              <Link to='/Pictures'>
                <Icon type='picture' />
                {two}
              </Link>
            </Menu.Item>
            <Menu.Item key='project'>
              <Link to='/ProjectDisplay'>
                <Icon type='project' />
                {three}
              </Link>
            </Menu.Item>
            <Menu.Item key='user'>
              <Link to='/AboutMeaaa'>
                <Icon type='user' />
                {four}
              </Link>
            </Menu.Item>
            <Menu.Item key='edit'>
              <Link to='/GuestBook'>
                <Icon type='edit' />
                {five}
              </Link>
            </Menu.Item>
          </Menu>
        </div>

        <div>
          <Input
            placeholder='请输入搜索内容'
            style={{
              borderTopLeftRadius: '20px',
              borderBottomLeftRadius: '20px',
              height: '40px',
              width: '230px',
              textAlign: 'center',
              border: '1px solid #d5d5d5'
            }}
          />
          <Button
            onClick={info}
            type="primary"
            style={{
              borderTopRightRadius: '20px',
              borderBottomRightRadius: '20px',
              height: '40px',
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px'
            }}
          >
            搜索
          </Button>
        </div>
      </div>
    );
  }
}
export default withRouter(NavigationBar);
