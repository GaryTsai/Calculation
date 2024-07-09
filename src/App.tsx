import React, { useState } from 'react';
import Trade from './Components/Trade';
import AddTradeIcon from './Components/AddTradeIcon';
import DelteTradeIcon from './Components/DeleteTradeIcon';
import { useTranslation } from 'react-i18next';
import useRWD from './utils/useRWD';
import { Button, Layout, Menu, theme, Input} from 'antd';

const { Header, Sider, Content, Footer } = Layout;
let serialNumber = 1

const App: React.FC = () => {
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
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
    const { t } = useTranslation();
    const device = useRWD();
    const isMobile = device === 'mobile'
    const titleLable = ['stockBalanceCalculation']
    const items = new Array(1).fill(null).map((_, index) => ({
      key: index + 1,
      label: `${t(titleLable[index])}`,
    }));
    const addTrade = () => {
      serialNumber += 1
      setTradeList([...tradeList, {
        num: serialNumber,
        price: '',
        sheet: ''
        }]
      )
    }

    const deleteTrade = (id: number) => {
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
    const mobileStyleForBalancePrice = {
      display: 'flex',
      justifyContent: 'center',
      fontSize: '32px',
      color: 'rgb(231 133 133)'
    }
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          style={{ flex: 1, minWidth: 0, fontSize: 18 }}
        />
      </Header>
      <Content style={{ padding: '0 32px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: '86vh',
            padding: 24,
            margin: 8,
            borderRadius: borderRadiusLG,
          }}
        >
          <div style={{ display: 'block', width: '100%' }}>
             <p  style={{ fontSize: '20px' }}>{t('OriginalStock')}</p>
             <Input placeholder={t('enterStockName')} style={{
              display: 'block',
              width: '50%',
              borderWidth: '0px',
              borderBottom: '2px solid #b478ed',
              borderRadius: '0px'
            }}/>
             <Input placeholder={t('averagePrice')} style={{
            width: isMobile ?  '98%' : '48%',
            margin: '1% 1% 1% 0%'
            }}
            type='number'
            value={originalStock.price}
            onChange={(e)=> setOriginalStock({
              price: e.target.value,
              sheet: originalStock.sheet
            })}
            /> 
            <Input placeholder={t('numberOfSheets')} style={{
              width: isMobile ?  '98%' : '48%',
              margin: '1% 1%'
            }}
            type='number'
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
                    {index + 1 !== tradeList.length && isMobile && <DelteTradeIcon id={num} deleteTrade={deleteTrade}/>}
                    {index + 1 === tradeList.length  && isMobile && <AddTradeIcon addTrade={addTrade}/>}
                    </div>;
            })}
          </div>
          <Button type="primary" style={{width: isMobile ? '100%' :  'unset', margin: isMobile ?  '1% 0%': 'unset'}} onClick={()=>calculateResult()}>{t('calculation')}</Button>
            <span style={{ display:isMobile ? 'flex' : 'unset', justifyContent: isMobile? 'space-around' : 'unset'}}>
              <div className='clear' onClick={clearCalculation}>{t('clear')}</div>
              <div className='clear' onClick={clearAllCalculation}>{t('clearAll')}</div>
            </span>
          <div style={isMobile ? mobileStyleForBalancePrice : {color: 'rgb(231 133 133)', fontSize: '32px'}}>
            <div className='balancePrice'>{balancePrice}</div>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Calculation ©{new Date().getFullYear()} Created by Gary
      </Footer>
    </Layout>
  );
};


export default App;