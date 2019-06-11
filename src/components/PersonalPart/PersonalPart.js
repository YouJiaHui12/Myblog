import React, { Component } from 'react';
import './PersonalPart.css';
import { Avatar, Tag, Icon, Tooltip, Divider, Upload, message } from 'antd';
import MyHead from '../../assets/horse.jpg';

//上传头像
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

export default class PersonalPart extends Component {
  state = {
    loading: false,
    imageUrl: MyHead
  };

  handleGithub() {
    window.open('https://github.com/YouJiaHui12');
  }
  handleWebo() {
    window.open('https://weibo.com');
  }
  handleWechat() {
    window.open('https://weixin.qq.com');
  }
  handleQQ() {
    window.open('https://im.qq.com');
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl: imageUrl,
          loading: false
        })
      );
    }
  };

  render() {
    const uploadButton = (
      <div className='upload-button'>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className='ant-upload-text'>Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <div className='personal-part'>
        <div className='personalpart-head'>
          <Upload
            name='avatar'
            listType='picture-card'
            className='avatar-uploader'
            showUploadList={false}
            action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
          >
            {[uploadButton, <Avatar size={140} src={imageUrl} />]}
          </Upload>
        </div>
        <p style={{ fontSize: '36px', textShadow: '4px -1px 6px black' }}>
          YOUJH
        </p>
        <div
          style={{ fontSize: '18px', marginTop: '-18px', marginLeft: '18px' }}
        >
          放弃不难，但坚持一定很酷。
          <br />
          <div style={{ margin: '6px 0 0 85px' }}>——东野圭吾《解忧杂货店》</div>
        </div>
        <Divider>
          <div style={{ fontSize: '17px' }}>我的标签</div>
        </Divider>
        <div className='personalpart-tag'>
          <Tag color='red' style={{ height: '30px', fontSize: '16px' }}>
            还在前进的程序媛
          </Tag>
          <Tag color='gold' style={{ height: '30px', fontSize: '16px' }}>
            前端
          </Tag>
          <Tag color='blue' style={{ height: '30px', fontSize: '16px' }}>
            强迫症
          </Tag>
          <Tag color='green' style={{ height: '30px', fontSize: '16px' }}>
            记性差
          </Tag>
          <Tag color='geekblue' style={{ height: '30px', fontSize: '16px' }}>
            想养狗
          </Tag>
          <Tag color='purple' style={{ height: '30px', fontSize: '16px' }}>
            追星女孩
          </Tag>
        </div>
        <Divider>
          <div style={{ fontSize: '17px' }}>联系我</div>
        </Divider>
        <div className='some-links'>
          <Tooltip title='github'>
            <Icon
              type='github'
              className='links-icon'
              onClick={this.handleGithub}
            />
          </Tooltip>
          <Tooltip title='微博'>
            <Icon type='weibo-circle' className='links-icon' onClick={this.handleWebo} />
          </Tooltip>
          <Tooltip title='微信'>
            <Icon type='wechat' className='links-icon' onClick={this.handleWechat} />
          </Tooltip>
          <Tooltip title='QQ'>
            <Icon type='qq' className='links-icon' onClick={this.handleQQ} />
          </Tooltip>
        </div>
      </div>
    );
  }
}
