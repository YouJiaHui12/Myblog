import React, { Component } from 'react';
import './GuestBook.css';

export default class GuestBook extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      content: null,
      today: null,
      comments: []
    };
  }

  // 在该生命周期中调用绘制函数
  componentDidMount() {
    this.drawman();
  }
  componentWillMount() {
    this._loadUsername();
    this._loadComments();
  }

  drawman() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var canvasW = canvas.width;
    var canvasH = canvas.height;

    setInterval(mdemo, 300);
    //声明布尔值
    var boo = true;
    close();
    function mdemo() {
      //布尔值判断
      if (boo) {
        ctx.clearRect(0, 0, canvasW, canvasH);
        open();
        boo = false;
      } else {
        ctx.clearRect(0, 0, canvasW, canvasH);
        close();
        boo = true;
      }
    }
    //闭嘴小人
    function close() {
      //绘制外圆
      ctx.arc(canvasW / 2, canvasH / 2, 50, 0, Math.PI * 2);
      ctx.stroke();

      //绘制眼睛
      ctx.beginPath();
      ctx.arc(80, 75, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(120, 75, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();

      //绘制嘴巴（直线）
      ctx.moveTo(70, 125);
      ctx.lineTo(130, 125);
      ctx.stroke();
      ctx.beginPath();
    }
    //张嘴小人
    function open() {
      //绘制外圆
      ctx.arc(canvasW / 2, canvasH / 2, 50, 0, Math.PI * 2);
      ctx.stroke();

      //绘制眼睛
      ctx.beginPath();
      ctx.arc(80, 75, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(120, 75, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();

      //绘制嘴巴（圆）
      ctx.arc(100, 120, 25, 0, Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(100, 120, 25, 0, Math.PI, true);
      ctx.stroke();
      ctx.beginPath();
    }
  }

  getUserName = e => {
    this.setState({
      username: e.target.value
    });
    this._saveUsername(e.target.value);
  };
  getContent = e => {
    this.setState({
      content: e.target.value
    });
  };
  handleSubmit = () => {
    const { username, content, comments } = this.state;
    var todays = new Date();
    var dd = todays.getDate();
    var mm = todays.getMonth() + 1; //一月是0
    var hour = todays.getHours();
    var minutes = todays.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    var timeString = `${mm}月${dd}日${hour}:${minutes}`;
    var comment = { username: username, content: content, today: timeString };
    //输入不能为空
    if (!comment) return;
    if (!comment.username) return alert('请输入用户名');
    if (!comment.content) return alert('请输入评论内容');
    comments.push(comment);
    this.setState({ comments: comments });
    this.setState({
      content: ''
    });
    this._saveComments(comments);
    console.log(this.state.comments);
  };

  _saveUsername(username) {
    localStorage.setItem('username', username);
  }
  _loadUsername() {
    const username = localStorage.getItem('username');
    if (username) {
      this.setState({ username });
    }
  }
  _saveComments(comments) {
    localStorage.setItem('comments', JSON.stringify(comments));
  }
  _loadComments() {
    let comments = localStorage.getItem('comments');
    if (comments) {
      comments = JSON.parse(comments);
      this.setState({ comments });
    }
  }

  render() {
    const { comments } = this.state;
    return (
      <div className='guestBook'>
        <div className='guestBook-main-left'>
          <div className='comment-input'>
            <div className='comment-field'>
              <span className='comment-field-name'>用户名：</span>
              <div className='comment-field-input'>
                <input
                  onChange={e => this.getUserName(e)}
                  value={this.state.username}
                />
              </div>
            </div>
            <div className='comment-field'>
              <span className='comment-field-name'>评论内容：</span>
              <div className='comment-field-input'>
                <textarea
                  onChange={e => this.getContent(e)}
                  value={this.state.content}
                />
              </div>
            </div>
            <div className='comment-field-button'>
              <button onClick={this.handleSubmit}>发布</button>
            </div>
          </div>
          <div className='comment'>
            {comments.map((value, index) => {
              return (
                <div key={`comment${index + 1}`} style={{ marginLeft: '24px' }}>
                  <div className='comment-username'>
                    <span style={{ color: '#00a3cf' }}>{`${
                      value.username
                    }`}</span>
                    ：<span>{`${value.content}`}</span>
                  </div>
                  <div className='comment-createdtime'>{`${value.today}`}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className='guestBook-main-right'>
          <canvas id='myCanvas' width='200' height='200' />
        </div>
      </div>
    );
  }
}
