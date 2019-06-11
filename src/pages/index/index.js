import React, { Component } from 'react';
import './index.css';
import { Icon, message } from 'antd';
import '../../components/PersonalPart/PersonalPart';
import articleData from './articleData';
import PersonalPart from '../../components/PersonalPart/PersonalPart';

const info = () => {
  message.info('该功能暂未开发');
};

export default class index extends Component {
  constructor() {
    super();
    this.state = {
      articleData: null
    };
  }
  //界面加载时执行
  componentWillMount() {
    const { data } = articleData;
    this.setState({
      articleData: data
    });
  }
  render() {
    const { articleData } = this.state;
    //用于页面跳转
    const {
      history: { push }
    } = this.props;
    return (
      <div className='top-container'>
        <div className='main' style={{ display: 'flex' }}>
          <div className='left-container'>
            <PersonalPart />
          </div>
          <div className='right-container'>
            {articleData.map((value, index) => {
              return (
                <div className='article' key={index}>
                  <div
                    className='articleTitle'
                    //页面跳转传值
                    onClick={() => push(`/Article/article${index + 1}`)}
                  >
                    {value.title}
                  </div>
                  <div
                    style={{
                      fontWeight: 'bold',
                      margin: '6px 0',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Icon type='calendar' style={{ fontSize: '24px' }} />
                    {value.date}
                    <Icon
                      type='read'
                      style={{ fontSize: '24px', marginLeft: '30px' }}
                    />
                    {value.read}
                  </div>
                  <div style={{ fontWeight: 'bold' }}>{value.main}</div>
                  <div
                    style={{
                      height: '1px',
                      border: '1px solid gainsboro',
                      background: 'gainsboro'
                    }}
                  />
                  <div
                    style={{
                      marginRight: '24px',
                      fontSize: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <span>分享到：</span>
                    <Icon
                      type='qq-circle'
                      theme='filled'
                      onClick={info}
                      style={{ color: '#dc3131e6', fontSize: '28px' }}
                    />
                    <Icon
                      type='wechat'
                      theme='filled'
                      onClick={info}
                      style={{ color: 'green', fontSize: '28px' }}
                    />
                    <Icon
                      type='weibo-circle'
                      theme='filled'
                      onClick={info}
                      style={{ color: '#f36d4e', fontSize: '28px' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
