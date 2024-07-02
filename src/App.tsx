import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Input} from 'antd';
import Trade from './Components/Trade';
import AddTradeIcon from './Components/AddTradeIcon';
import DelteTradeIcon from './Components/DeleteTradeIcon';
import { useTranslation } from 'react-i18next';
import { serialize } from 'v8';

const { Header, Sider, Content } = Layout;
let serialNumber = 1

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [balancePrice, setBalancePrice] = useState(0);
  const [originalStock, setOriginalStock] = useState({
    price: '',
    sheet: ''
  });
  const [tradeList, setTradeList] = useState([{
    num: serialNumber,
    price: '',
    sheet: ''
  }]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { t } = useTranslation();
  const addTrade = () => {
    console.log(tradeList);
    console.log('before serialNumber', serialNumber);
    serialNumber += 1
    console.log('after serialNumber', serialNumber);
    setTradeList([...tradeList, {
      num: serialNumber,
      price: '',
      sheet: ''
      }]
    )
  }

  const deleteTrade = (id: number) => {
    console.log(tradeList);
    let deleteIndex = tradeList.findIndex((trade)=> trade.num === id)
    tradeList.splice(deleteIndex, 1);
    setTradeList([...tradeList])
  }

  const calculateResult = () => {
    let totalSheet = 0;
    let totalPrice = 0;
    const haveOriginalStock = originalStock.price === '' || originalStock.sheet === '' ? false : true
    let originalTotalStockPrice = 0
    if(haveOriginalStock){
      originalTotalStockPrice = parseFloat((parseFloat(originalStock.price) * parseFloat(originalStock.sheet)).toFixed(2))
    }
    tradeList.map((trade)=>{
      totalPrice += parseFloat(trade.price) * parseFloat(trade.sheet) * 1.001425 * 1.004425;
      totalSheet += parseFloat(trade.sheet);
      return {}
    })
    const balancePrice = haveOriginalStock ? parseFloat(((totalPrice + originalTotalStockPrice) / (totalSheet + parseFloat(originalStock.sheet))).toFixed(2)) : parseFloat((totalPrice / totalSheet).toFixed(2))
    setBalancePrice(balancePrice)
  }

  const inputPrice = (num: number, priceValue: string): void => {
    let index = tradeList.findIndex((trade)=> trade.num === num)
    tradeList[index].price = priceValue
    setTradeList([...tradeList])
  }
  const inputSheet = (num: number, sheetValue: string): void => {
    console.log(num);
    let index = tradeList.findIndex((trade)=> trade.num === num)
    tradeList[index].sheet = sheetValue
    setTradeList([...tradeList])
  }

  const clearCalculation = () => {
    serialNumber = 1
    setTradeList([{
      num: serialNumber,
      price: '',
      sheet: ''
    }])
    setBalancePrice(0)
  }

  const clearAllCalculation = () => {
    serialNumber = 1
    setTradeList([{
      num: serialNumber,
      price: '',
      sheet: ''
    }])
    setOriginalStock({
      price: '',
      sheet: ''
    })
    setBalancePrice(0)
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: t('stockBalanceCalculation'),
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 32,
            minHeight: '100vh',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div style={{ display: 'block', width: '100%' }}>
            <p  style={{ fontSize: '20px' }}>原持有股票</p>
            <Input placeholder={t('averagePrice')} style={{
            width: '48%',
            margin: '1% 1% 1% 0%'
            }}
            value={originalStock.price}
            onChange={(e)=> setOriginalStock({
              price: e.target.value,
              sheet: originalStock.sheet
            })}
            /> 
            <Input placeholder={t('numberOfSheets')} style={{
              width: '48%',
              margin: '1% 1%'
            }}
            value={originalStock.sheet}
            onChange={(e)=> setOriginalStock({
              price: originalStock.price,
              sheet: e.target.value
            })}
            />
            <hr className='divider' />
            {tradeList?.map((trade, index) => {
                const { num, price, sheet } = trade;
                return <div  key={num} style={{ display: 'flex', width: 'calc(100% - 62px)', alignItems: 'center'}}>
                    <Trade num={num}  listLength={tradeList.length} index={index} price={price} sheet={sheet} inputPrice={inputPrice} inputSheet={inputSheet} addTrade={addTrade} deleteTrade={deleteTrade}/>
                    {/* {index + 1 !== tradeList.length && <DelteTradeIcon id={num} deleteTrade={deleteTrade}/>} */}
                    {/* {index + 1 === tradeList.length  && <AddTradeIcon addTrade={addTrade}/>} */}
                    </div>;
            })}
          </div>
          <Button type="primary" onClick={()=>calculateResult()}>{t('calculation')}</Button><div className='clear' onClick={clearCalculation}>{t('clear')}</div><div className='clear' onClick={clearAllCalculation}>{t('clearAll')}</div>
          <div className='balancePrice'>{balancePrice}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;