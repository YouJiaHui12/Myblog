import React, { Component } from 'react';
import resume_head from '../../assets/resume-head.jpg';

export default class Resume extends Component {
  render() {
    return (
      <div
        className='resume-main'
        style={{ display: 'flex', justifyContent: 'space-around' }}
      >
        <table
          border='1px'
          style={{
            width: '930px',
            minHeight: '980px',
            textAlign: 'center',
            marginTop: '100px',
            marginBottom: '130px',
            fontSize: '18px'
          }}
        >
          <tr>
            <td colspan='7' border='0'>
              <h1 style={{ textAlign: 'center' }}>个人简历</h1>
            </td>
          </tr>

          <tr>
            <td>姓名</td>
            <td>尤嘉惠</td>
            <td>出生日期</td>
            <td>1997.10</td>
            <td>性别</td>
            <td>女</td>
            <td rowspan='4'>
              <img src={resume_head} alt='' />
            </td>
          </tr>
          <tr>
            <td>学历</td>
            <td>本科</td>
            <td>专业</td>
            <td>软件工程</td>
            <td>民族</td>
            <td>汉</td>
          </tr>
          <tr>
            <td>学校</td>
            <td>厦门理工学院</td>
            <td>政治面貌</td>
            <td>团员</td>
            <td>联系方式</td>
            <td>188××××8719</td>
          </tr>
          <tr>
            <td>籍贯</td>
            <td>福建</td>
            <td>邮箱</td>
            <td>2625240780@qq.com</td>
            <td colspan='2' style={{ border: '0px' }} />
          </tr>
          <tr>
            <td>主修课程</td>
            <td colspan='6'>
              HTML 计算机网络 Web-UI Python 软件工程 JavaScript
            </td>
          </tr>
          <tr>
            <td>技能证书</td>
            <td colspan='6'>
              <ul>
                <li>CET4</li>
                <li>驾驶证</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>项目经历</td>
            <td colspan='6'>
              <ul>
                <li>图书管理系统</li>
                <li>个人网站</li>
                <li>监测后台管理系统</li>
                <li>综合测评管理系统</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td colspan='7'>自我评价</td>
          </tr>
          <tr>
            <td colspan='7'>
              本人性格开朗、稳重、有活力，待人热情、真诚；
              工作认真负责，积极主动，能吃苦耐劳，用于承受压力，勇于创新；
              有很强的组织能力和团队协作精神，具有较强的适应能力；
              纪律性强，工作积极配合；意志坚强，具有较强的无私奉献精神。
            </td>
          </tr>
        </table>
      </div>
    );
  }
}
