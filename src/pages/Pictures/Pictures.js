import React, { Component } from 'react';
import './Pictures.css';
import PicturesData from './PicturesData';
import { Row, Col, Icon, Divider, Modal } from 'antd';
import PersonalPart from '../../components/PersonalPart/PersonalPart';

export default class Pictures extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, imgUrl: null, picturesData: null };
  }
  componentWillMount() {
    const { data } = PicturesData;
    this.setState({
      picturesData: data
    });
    // console.log(data);
  }

  //展开大图
  showModal = value => {
    this.setState({
      visible: true,
      imgUrl: value
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    const { imgUrl, picturesData } = this.state;
    const { imgUrls1, imgUrls2 } = picturesData;
    // console.log(imgUrls1);
    return (
      <div className='picture'>
        <div className='main-left'>
          <PersonalPart />
        </div>
        <div
          className='main-right'
          style={{ backgroundColor: '#e7e7e7', borderRadius: '24px' }}
        >
          <div
            className='main-right1'
            style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              boxShadow: '4px 2px 15px 0px #838383'
            }}
          >
            <div className='photos1'>
              <div className='photos-top1'>
                <h1>绘画作品</h1>
                <div className='date'>
                  <Icon type='schedule' />
                  2019-05-03
                </div>
              </div>
              <Divider />
              <div className='photos-main'>
                <Row type='flex' justify='space-around'>
                  {imgUrls1.map((value, index) => {
                    return (
                      <Col span={4}>
                        <img
                          key={index}
                          src={value.imgname}
                          style={{ width: '100%' }}
                          onClick={() => this.showModal(value.imgname)}
                          alt=' '
                        />
                      </Col>
                    );
                  })}
                </Row>
              </div>

              <Modal
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={null}
                width={600}
              >
                <img src={imgUrl} style={{ width: '100%' }} alt=''/>
              </Modal>
            </div>
          </div>
          <div
            className='main-right2'
            style={{
              backgroundColor: 'white',
              marginTop: '30px',
              borderRadius: '24px',
              boxShadow: '4px 2px 15px 0px #838383'
            }}
          >
            <div className='photos2'>
              <div className='photos-top2'>
                <h1>摄影作品</h1>
                <div className='date'>
                  <Icon type='schedule' />
                  2019-05-08
                </div>
              </div>
              <Divider />
              <div className='photos-main'>
                <Row type='flex' justify='space-around'>
                  {imgUrls2.map((value, index) => {
                    return (
                      <Col span={4}>
                        <img
                          key={index}
                          src={value.imgname}
                          style={{ width: '100%' }}
                          onClick={() => this.showModal(value.imgname)}
                          alt=' '
                        />
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
