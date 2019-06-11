import React, { Component } from 'react';
import './ProjectDisplay.css';
import { BackTop } from 'antd';
import TestVideo from '../../assets/video.mp4';
import ReactPlayer from 'react-player';

import py1 from '../../assets/py1.png';
import py2 from '../../assets/py2.png';
import py3 from '../../assets/py3.png';
import py4 from '../../assets/py4.png';
import py5 from '../../assets/py5.png';
import py6 from '../../assets/py6.png';
import py7 from '../../assets/py7.png';
import py8 from '../../assets/py8.png';
import py9 from '../../assets/py9.png';
import py10 from '../../assets/py10.png';
import py11 from '../../assets/py11.png';
import py12 from '../../assets/py12.png';
import P1 from '../../assets/P1.jpg';
import P2 from '../../assets/P2.jpg';
import P3 from '../../assets/P3.jpg';
import P4 from '../../assets/P4.jpg';

export default class ProjectDisplay extends Component {
  //移动到指定的位置
  handleScroll = value => {
    let add = value;
    window.scrollTo(0, add); 
  };
  render() {
    return (
      <div className='ProjectDisplay'>
        <div className='projectDisplay-main-left'>
          <div
            style={{
              fontSize: '30px',
              textAlign: 'center',
              marginTop: '18px',
              marginBottom: '18px'
            }}
          >
            项目展示
          </div>
          <div
            className='details'
            style={{ marginLeft: '40px', marginRight: '42px' }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '12px'
              }}
            >
              jsp期末项目
            </div>
            <div style={{ fontSize: '20px' }}>
              <div style={{ fontSize: '24px' }}>开发步骤 </div>
              <div>
                <li>设计数据库并编写实体类</li>
                <li>设计需要的servlet,并配置</li>
                <li>数据库连接</li>
                <li style={{ marginBottom: '12px' }}>编写界面</li>
              </div>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>
                步骤一
              </div>
              <li style={{ marginBottom: '12px' }}>
                明确目标，设计数据库，本项目一共有以下四个实体：用户，版块，话题，回复，在Java中编写实体类
              </li>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>
                步骤二
              </div>
              <li>
                接着就是servlet 的配置需要 web.xml 文件，这个文件主要是由
                servlet-name，servlet-class，url-pattern 这三个组成， name
                可自定义，主要用于将 url 和 java 文件连接；url 指向 jsp
                界面访问的路径；class 指对应的 java 文件。
              </li>
              <pre
                style={{
                  backgroundColor: '#e4e4e4',
                  minHeight: '45px',
                  margin: '12px auto'
                }}
              >
                {`<servlet> 
                <servlet-name>delTopic </servlet-name>
                <servlet-class>com.Servlet.delTopic </servlet-class>
              </servlet>
              <servlet-mapping>
                <servlet-name>delTopic </servlet-name>
                <url-pattern>/delTopic </url-pattern>
              </servlet-mapping>`}
              </pre>
              <li>
                紧接着是 servlet 的类编写。这边的类是和 servlet-class
                中对应。这个类文件里面主要写的是 get 和 post 的方法。
              </li>
              <pre
                style={{
                  backgroundColor: '#e4e4e4',
                  minHeight: '45px',
                  margin: '12px auto'
                }}
              >
                {`public class Servlet extends HttpServlet {
@Override
protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

}

@Override
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
  // 设置响应内容类型
}
}`}
              </pre>
              <li style={{ marginBottom: '12px' }}>
                然后我们只要在 jsp 界面，通过请求方式访问/url-pattern
                中的参数就可以完成 servlet 的连接
              </li>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>
                步骤三
              </div>
              <li style={{ marginBottom: '12px' }}>
                连接数据库我用的是 JDBC，在我的项目中，我把 JDBC
                的连接方法封装成一个类
                Conn，这个类中写上了对数据库进行相关增删改查的方法。(PS：这里需要会
                sql 语句进行对数据库操作) 然后在 servlet 文件中，声明 Conn
                这个类，并调用其中的方法即可。
              </li>
              <pre
                style={{
                  backgroundColor: '#e4e4e4',
                  minHeight: '45px',
                  margin: '12px auto'
                }}
              >
                {`public class Conn {
private Connection conn = null;
/**lianJie*/
private Statement stmt = null;
/**shenmin*/
private ResultSet rs = null;
/**jieguo*/

String DriverName="sun.jdbc.obdc.JbdcObdcDriver";
private String DBURL = "jdbc:mysql://localhost:3306/bbs?useUnicode=true&characterEncoding=utf-8";
private String DBUSER = "root";
private String DBPASSWORD = "123456";

public Conn() throws ClassNotFoundException, SQLException {
Class.forName("com.mysql.jdbc.Driver");
conn = DriverManager.getConnection(this.DBURL,this.DBUSER,this.DBPASSWORD);
stmt=conn.createStatement();
// 实例化Statement对象

}


/**
 * 执行查询操作：select
 **/
public ResultSet executeQuery(String sql) {
try {
  rs = stmt.executeQuery(sql);
} catch (SQLException ex) {
System.err.println(ex.getMessage());
}
return rs;
}


/**
 * 执行更新操作：insert、update、delete
 * */
private int executeUpdate(String sql) {
int result = 0;
try {

stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
  ResultSet.CONCUR_READ_ONLY);
result = stmt.executeUpdate(sql);
} catch (SQLException ex) {
System.out.println(ex);
}
  return result;
}


/**
 * 关闭数据库连接
 * */
private void close() {
try {
  if (rs != null) {
rs.close();
}
} catch (Exception e) {
  e.printStackTrace(System.err);
}
try {
  if (stmt != null) {
stmt.close();
}
} catch (Exception e) {
  e.printStackTrace(System.err);
}
try {
  if (conn != null) {
conn.close();
  }
} catch (Exception e) {
  e.printStackTrace(System.err);
}
}

public User login(String uName,String uPass){
try{
  User user =new User();
  String strSql = "select * from t_user where uName = ?";
  PreparedStatement ps = conn.prepareStatement(strSql);
  ps.setString(1, uName);
  ResultSet rs =  ps.executeQuery();
  String pass = null;
  while (rs.next()){
pass = rs.getString(1);
assert false;
user.setuId(rs.getInt("uId"));
user.setGender(rs.getString("gender"));
user.setHead(rs.getString("head"));
user.setRegTime(rs.getString("regTime"));
user.setuPass(rs.getString("uPass"));
user.setuName(rs.getString("uName"));
}

return user;

}catch(Exception e){
  System.out.println(e);
  return null;
}finally {
{
this.close();
}
}
}
  }`}
              </pre>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>
                步骤四
              </div>
              <li>就剩下视图层的界面了，这里和前端 HTML，CSS 比较挂钩。</li>
              <li style={{ marginBottom: '12px' }}>
                调用 servlet，无非就是请求。这边介绍两种。
                一种是表单的提交，通过 form 表单的 action 属性指向一个 servelt
                的 url，即可完成请求。 第二种是通过 a 标签的 herf
                进行跳转，也是将 servelt 的 url 赋值给 herf 即可完成请求。
              </li>
              <div style={{ marginBottom: '36px' }}>
                通过以上步骤你就成完成一个简单的基于JSP的图书管理系统的搭建
              </div>
            </div>

            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '12px'
              }}
            >
              Python期末项目--从1000条模拟数据分析商店营业情况
            </div>
            <div style={{ fontSize: '20px' }}>
              <div>一、技术分析</div>
              <div>（1）数据来源：随机生成</div>
              <div>（2）总数据量：3000</div>
              <div>
                （3）分析工具：JetBrains PyCharm Community Edition 2017.2.3 x64
              </div>
              <div>（4）模块导入：</div>
              <img src={py1} className='pyPhotos' alt='' />
              <div>（5）解决中文乱码问题</div>
              <img src={py2} className='pyPhotos' alt='' />
              <div>（6）生成模拟数据</div>
              <img src={py3} className='pyPhotos' alt='' />
              <div>（7）将生成的数据写入csv文件</div>
              <img src={py4} className='pyPhotos' alt='' />
              <br />
              <img
                src={py5}
                className='pyPhotos'
                style={{ margin: '5px auto' }}
                alt=''
              />
              <div>（8）数据再清理可视化代码</div>
              <div>每天营业额折线图</div>
              <img src={py6} className='pyPhotos' alt='' />
              <div>每月营业额柱状图</div>
              <img src={py7} className='pyPhotos' alt='' />
              <div>各季度营业额饼图</div>
              <img src={py8} className='pyPhotos' alt='' />
              <div>（9）查找涨幅最大的月份，写入csv文件</div>
              <img src={py9} className='pyPhotos' alt='' />
              <div>二、数据分析</div>
              <div>1.每日营业额情况</div>
              <img src={py10} className='pyPhotos' alt='' />
              <div>
                从图中容易看出，营业额在12月左右达到最高，10月中下旬营业额最低，曲线大致在0到50000之间波动，其中在10000到20000之间较为密集，可见该商店的正常营业额应该是在10000到20000，销售数量低于10000说明营业额过低。
              </div>
              <div>2.每月营业额情况</div>
              <img src={py11} className='pyPhotos' alt='' />
              <div>
                从上图可以看出，2018年5月总营业额达到最高，其中生活用品的销售数量最多，2018年3月营业额最低，其中酒水饮料的销售数量最多。根据每个月不同商品的销售情况可以对下个月的销售情况进行预估，进而控制不同商品的进货量。
              </div>
              <div>3.各季度不同商品的销售情况</div>
              <img src={py12} className='pyPhotos' alt='' />
              <div>
                从上图可得知，休闲零食在第四季度的营业额最高，酒水饮料在第三季度的营业额最高，生活用品在第二季度的营业额达到最高值。对此可以对下一年各季度不同商品的销售情况进行预估，控制下一年各季度不同商品的进货量。
              </div>
              <div>三、总结</div>
              <div>
                1.由于所有数据均为随机生成的，所以与实际情况还是会有较大出入
              </div>
              <div>
                2.第一张折线图可进行优化，可以按不同商品分类，做出三张每日营业额情况的折线图
              </div>
              <div>
                3.第二张柱状图对不同商品的每月营业额情况的反应不够直观，只能看出大致的比例关系
              </div>
              <div style={{ marginBottom: '36px' }}>
                4.编写代码过程中，碰到许多问题，比如for循环的逻辑问题等，需要通过上网查询资料或询问同学得到解答。
              </div>
            </div>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '12px'
              }}
            >
              大三上小学期作品--利用3D Max制作游戏宣传视频
            </div>
            <div style={{ fontSize: '20px' }}>
              <div>
                此次小学期我们小组做了一个怒贺新春版愤怒的小鸟，两周的时间，我们主要分为3D模型场景道具的制作，视频合成，海报制作和文创产品的制作四个方面，较为全面地展示了游戏宣传的过程。
              </div>
              <img src={P1} className='junior' alt='' />
              <img src={P2} className='junior' alt='' />
              <img src={P3} className='junior' alt='' />
              <img src={P4} className='junior' alt='' />
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  margin: '12px'
                }}
              >
                怒贺新春版·愤怒的小鸟宣传视频
              </div>
              <ReactPlayer url={TestVideo} controls className='video-show' />
            </div>
          </div>
        </div>
        <div className='projectDisplay-main-right'>
          <div>快速到达指定位置</div>
          <div
            onClick={() => this.handleScroll(130)}
            //小手指
            style={{ cursor: 'pointer' }}
          >
            1.jsp期末项目
          </div>
          <div
            onClick={() => this.handleScroll(3450)}
            style={{ cursor: 'pointer' }}
          >
            2.Python期末项目
          </div>
          <div
            onClick={() => this.handleScroll(9200)}
            style={{ cursor: 'pointer' }}
          >
            3.大三上小学期作品
          </div>
        </div>
        <div>
          <BackTop />
        </div>
      </div>
    );
  }
}
