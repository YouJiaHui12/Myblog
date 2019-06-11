import React, { Component } from 'react';
import './AboutMe.css';
import { Button, Table, Icon } from 'antd';

const columns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    render: text => <span>{text}</span>
  },
  {
    title: '事件',
    dataIndex: 'things',
    key: 'things'
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    key: 'remarks'
  }
];

const data = [
  {
    key: '1',
    time: '2019.03.18',
    things: '创建博客',
    remarks: '基本布局'
  },
  {
    key: '2',
    time: '2019.03.31',
    things: '博客导航基本成型',
    remarks: '可点击'
  },
  {
    key: '3',
    time: '2019.04.15',
    things: '博客主体风格成型',
    remarks: '简约'
  },
  {
    key: '4',
    time: '2019.04.24',
    things: '完成相册展示功能',
    remarks: '加载功能'
  },
  {
    key: '5',
    time: '2019.05.10',
    things: '完成关于我页面',
    remarks: '个人简历'
  },
  {
    key: '6',
    time: '2019.05.20',
    things: '完成留言板页面',
    remarks: '拖拽功能'
  },
  {
    key: '7',
    time: '2019.05.30',
    things: '完成首页的修改',
    remarks: '文章转发按钮，搜索框'
  },
  {
    key: '8',
    time: '2019.06.05',
    things: '基本完成整个博客',
    remarks: '代码注释，优化'
  }
];

export default class AboutMe extends Component {
  state = {
    host: '3000'
  };

  lzp = () => {
    const w = window.open('about:blank');
    const { host } = this.state;
    // 要打开的新页面的url
    w.location.href = `http://47.102.149.136/AboutMeaaa/Resume`;
    // 访问本地
    // w.location.href = `http://localhost:${host}/AboutMeaaa/Resume`;
  };

  render() {
    return (
      <div className='aboutMe'>
        <div className='aboutMe-main-left'>
          <div
            style={{
              fontSize: '26px',
              textAlign: 'center',
              marginTop: '18px',
              marginBottom: '18px'
            }}
          >
            关于我
          </div>
          <div
            className='details'
            style={{ marginLeft: '40px', marginRight: '42px' }}
          >
            <div>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '12px'
                }}
              >
                自述
              </div>
              <div style={{ fontSize: '18px', marginBottom: '12px' }}>
                在校大学生，新媒体工程专业，主要学习前端知识，从基本的HTML，JavaScript到react框架都有实际的项目经历。
              </div>
              <span style={{ fontSize: '18px', marginRight: '12px' }}>
                坐标：
                <Icon type='environment' />
                厦门
              </span>
              <Button onClick={this.lzp} style={{ marginBottom: '28px' }}>
                点我查看个人简历
              </Button>
            </div>
            <div>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '12px'
                }}
              >
                这个博客
              </div>
              <div style={{ fontSize: '18px', marginBottom: '28px' }}>
                一个技术相关的博客，分享个人见闻的网站，主要采用react +
                react-router-dom + ant
                Design进行项目搭建。如果喜欢的其中的内容，可以点个赞，或者分享给朋友。当然，也欢迎你与我分享技术上的见闻与心得。
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '12px'
                }}
              >
                联系我
              </div>
              <div style={{ fontSize: '18px', marginBottom: '12px' }}>
                友链、聊天、好友：
              </div>
              <div style={{ fontSize: '18px', marginBottom: '12px' }}>
                邮箱：2625240780@qq.com
              </div>
              <div style={{ fontSize: '18px', marginBottom: '12px' }}>
                微信：18859748719（加好友请备注）
              </div>
              <div style={{ fontSize: '18px', marginBottom: '12px' }}>
                GitHub：<a href='https://github.com/YouJiaHui12'>YouJiaHui12</a>
              </div>
              <div style={{ fontSize: '18px', marginBottom: '28px' }}>
                友情链接：
                <a href='https://cuiqingcai.com/'>静觅丨崔庆才的个人博客</a>
                <br />
                <a
                  href='http://www.ruanyifeng.com/home.html'
                  style={{ marginLeft: '88px' }}
                >
                  阮一峰的个人网站
                </a>
                <br />
                <a
                  href='http://blog.fiftykg.com/'
                  style={{ marginLeft: '88px' }}
                >
                  100斤的个人博客
                </a>
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '12px'
                }}
              >
                博客小事件
              </div>
              <div className='little-things'>
                <Table columns={columns} dataSource={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
