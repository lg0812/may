import React, {Component} from 'react';
import styled from 'styled-components';
import bg from "../partner/bg.png";
import phone from "../partner/phone.png";
import titleLeft from "../partner/title_left.png";
import titleRight from "../partner/title_right.png";
import staples from "../partner/staples.png";
import man from "../partner/man.png";
import women from "../partner/women.png";

const Wrap = styled.div`
  height: 100%;
  color: #fff;
  p {
    word-wrap: break-word;
    word-break: break-all;
  }
`;
const Content = styled.div`
  position: relative;
  padding: 0;
  margin: 0;
  height: calc(100% - 50px);
  -webkit-overflow-scrolling : touch;
  overflow: auto;
`;

const Bg = styled.img`
  position: absolute;
  z-index: -1;
  top: -13px;
  left: 0;
  width: 100%;
  height: auto;
`;

const Button = styled.button`
  height: 50px;
  position: absolute;
  font-size: .9rem;
  width: 100%;
  bottom: 0;
  background-color: #fcc020;
  border: none;
  outline: none;
`;

const Section = styled.header`
  text-indent:1.5rem;
  margin:.75rem;
  background-color: #3417a3;
  border-radius: 4px;
  padding: 1.3rem 1rem;
  font-size: .75rem;
`;

const ListWrap = styled.div`
  margin-top: 24rem;
`;

const Left = styled.div`
  width: .9rem;
  height: .9rem;
  background: url(${titleLeft}) no-repeat;
  background-size: 100% 100%;
  background-position: center;
`;

const Right = styled.div`
  width: .9rem;
  height: .9rem;
  background: url(${titleRight}) no-repeat;
  background-size: 100% 100%;
  background-position: center;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.2rem;
  margin-top: 2rem;
  & > span {
    font-size: .9rem;
    color: #f8fa31;
    font-weight: bold;
    position: relative;
    display: block;
    margin:0 .5rem;
  }
`;
const List = styled.div`
  position: relative;
  margin: .6rem .75rem;
  .staples {
    display: none;
  }
  &:not(:last-child){
    .staples {
      display: block;
      width: 100%;
      &> img:first-child{
        position:absolute;
        z-index:10;
        bottom: -1.6rem;
        left: .75rem;
        width: .4rem;
        height: 2.6rem;
      }
      &> img:last-child{
        position:absolute;
        z-index:10;
        bottom: -1.6rem;
        right: .75rem;
        width: .4rem;
        height: 2.6rem;
      }
    }
  }
`;

const ListItem = styled.div`
  display: flex;
  background-color:#fff;
  border-radius: 4px;
  padding: 1.3rem 1rem;
  position: relative;
  color:#233ecb;
  & > div:first-child{
    flex: 0;
    margin-right: .75rem;
    img{
      width: 2.rem;
      height: 2.5rem;
    }
  }
  & > div:last-child{
    .name{
      font-size: .8rem;
      font-weight: bold;
    }
    .desc{
      font-size: .7rem;
      margin-top: .4rem;
    }
    flex: 3;
  }
 
}`;

const HotLine = styled.a`
  margin: 1.3rem 1.75rem auto;
  font-size: .7rem;
  color: #fff;
  display: flex;
  align-items: center;
  color: #fff;
  &> img{
    width: 1rem;
    height: 1rem;
    margin-right: .5rem;
  }
`;

class Partner extends Component {
  constructor(props) {
    super(props);
    this.redirectTo = this.redirectTo.bind(this);
    this.list = [
      {
        head: women,
        name: '张晓贤',
        desc: '我自己是爱客进销存的用户，成为合伙人快3个星期了，已经成功将爱客进销存推荐给我的3个客户，并且也付费购买了。获得的返利已经快赶上我一个月的工资了。希望我的客户用得好，后面他们续费我还可以继续拿返利。',
      },
      {
        head: man,
        name: '周平',
        desc: '以前售卖其他厂商的单机版进销存，但随着科技进步，单机版已经没有市场了。我偶然发现了爱客进销存这个软件，做代理要求较高，不适合我这种个体户。现在有合伙人这种模式，加入1个多月，我也用心在跑本地的市场，单爱客进销存就给我带来1万元的收入了。下个月的目标是翻一番。加油！',
      },
    ];

    this.sections = [{
      title: '返利规则',
      content: ['单笔交易最高可获得45%的返利，被推荐用户后期若续费，可获得续费费用的20%返利。', '举个例子：售卖4000元，可获得1800元返利，用户后期以4000元续费，则可获得800的续费返利。'],
    }, {
      title: '如何成为合伙人',
      content: ['个人，不管是否为爱客进销存的用户、不管你是做什么工作的，只要你愿意将爱客进销存推荐出去并引导购买，你都可以成为合伙人。点击底部【成为合伙人】按钮，提交信息即可成为合伙人'],
    }];
  }

  getUrlByEnv() {
      window.location.href = 'http://www-test.ikcrm.com/ikjxc/m002_copartner';
    }
  }

  redirectTo() {
  }

  render() {
    return (
      <Wrap>
        <Content>
          <ListWrap>
            <Title>
              <Left />
              <span>他们都获得丰厚的返利</span>
              <Right />
            </Title>
            {
              this.list.map((item, index) => {
                return (
                  <List key={index}>
                    <ListItem>
                      <div>
                        <img src={item.head} />
                      </div>
                      <div>
                        <p className="name">{item.name}</p>
                        <p className="desc">{item.desc}</p>
                      </div>
                    </ListItem>
                    <section className="staples">
                      <img src={staples} />
                      <img src={staples} />
                    </section>
                  </List>
                );
              })
            }

          </ListWrap>
          {
            this.sections.map((item, index) => {
              return (
                <div key={index}>
                  <Title>
                    <Left />
                    <span>{item.title}</span>
                    <Right />
                  </Title>
                  <Section>
                    {
                      item.content.map((content, index_) => <p key={index_}>{content}</p>)
                    }
                  </Section>
                </div>
              );
            })
          }
          <HotLine href="tel:400-618-0177">
            <img src={phone} />客服热线：400-618-0177
          </HotLine>
          <Bg src={bg} />
        </Content>

        <Button onClick={this.redirectTo}>立即成为合伙人</Button>
      </Wrap>
    );
  }

}

export default Partner;