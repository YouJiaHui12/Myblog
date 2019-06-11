import React, { Component } from 'react';
import './article.css';
import articleDatas from './articleDatas';
// 导入解析MarkDown的第三方库
import remark from 'remark';
import remark2react from 'remark-react';

export default class article extends Component {
  constructor() {
    super();
    this.state = {
      articleDatas: null
    };
  }
  componentWillMount() {
    console.log(this.props.match.params);
    const { data } = articleDatas;
    this.setState({
      articleDatas: data
    });
  }
  render() {
    const { data } = articleDatas;
    const { articleId } = this.props.match.params;
    return (
      <div>
        //filter筛选数组，map遍历
        {data
          .filter(value => value.articleId === articleId)
          .map((value, index) => {
            return (
              <div className='articles'>
                <div
                  style={{
                    backgroundColor: 'white',
                    margin: '36px 36px 15px 36px',
                    borderRadius: '12px'
                  }}
                >
                  <div className='article-title'>{value.articleName}</div>
                  <div className='article-main'>
                    {
                      remark()
                        .use(remark2react)
                        .processSync(`${value.aricleDetail}`).contents
                    }
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}
