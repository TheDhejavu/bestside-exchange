/* eslint-disable */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import "./index.css";
import './App.css';
import _  from 'lodash';

var formatAmount = amount => {
  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};


const  App = () => {
  const [socketUrl, setSocketUrl] = useState(process.env.REACT_APP_WEBSOCKET_URL);
  const messageHistory = useRef([]);
  const [tickers, setTickers] = useState([]);
  const [bestSides, setBestSides] = useState({});
  const [symbol, setSymbol] = useState("BTC-USD");

  const {
    readyState,
    lastMessage,
  } = useWebSocket(socketUrl);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState]

  messageHistory.current = useMemo(() =>
    messageHistory.current.concat(lastMessage),[lastMessage])

  
  useEffect(() => {
    messageHistory.current
    .map((message) => {
      if(message  && message.data){
        let messageTickers = []
        const messageData = JSON.parse(message.data)
       
        for(const k in messageData.exchanges){
          let currentMessageData = messageData.exchanges[k]
          
          if(!currentMessageData.data) continue
          const data = currentMessageData.data.filter(( d )=> d.symbol ==  symbol)
          
          currentMessageData = {
            ...currentMessageData,
            ...data[0]
          }
          messageTickers.push(currentMessageData)
        }
        
        if (tickers && !_.isEqual(tickers, messageTickers)) {
          setTickers(messageTickers)
        }

        if(bestSides && !_.isEqual(bestSides, messageData.best_sides)) {
          setBestSides(messageData.best_sides)
        }
      }
    })
    
  }, [lastMessage, symbol]);
  const toggleSymbol = (symbol)=> {
    setSymbol(symbol)
  }

  var navClassName = (current_symbol)=> {
    return symbol == current_symbol ? 
    '-green-500 bg-green-300 font-bold' :
    '-transparent hover:-green-500';
  }

  return (
  <div className="font-sans bg-white flex flex-col min-h-screen">
    
    <div>
      <div className="bg-black">
        <div className="container mx-auto px-4">
          <div className="flex items-center md:justify-between py-4">
            <div className="w-1/4 md:hidden">
              <svg className="fill-current text-white h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16.4 9H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zm0 4H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zM3.6 7h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1z"/></svg>
            </div>
            <div className="w-1/2 md:w-auto text-center text-white text-2xl font-medium">
              BestSide Exchange
            </div>
          </div>
        </div>
      </div>
      <div className="hidden bg-white-200 md:block md:bg-white-300 md:-b">
        <div className="container mx-auto px-4">
          <div className="md:flex">
            <div className="flex -mb-px mr-8 items-center self-center">
              <a href="#" className="self-center no-underline text-black md:text-blue-dark flex items-center py-4 -b -blue-dark">
                <svg className="h-6 w-6 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fillRule="evenodd" d="M3.889 3h6.222a.9.9 0 0 1 .889.91v8.18a.9.9 0 0 1-.889.91H3.89A.9.9 0 0 1 3 12.09V3.91A.9.9 0 0 1 3.889 3zM3.889 15h6.222c.491 0 .889.384.889.857v4.286c0 .473-.398.857-.889.857H3.89C3.398 21 3 20.616 3 20.143v-4.286c0-.473.398-.857.889-.857zM13.889 11h6.222a.9.9 0 0 1 .889.91v8.18a.9.9 0 0 1-.889.91H13.89a.9.9 0 0 1-.889-.91v-8.18a.9.9 0 0 1 .889-.91zM13.889 3h6.222c.491 0 .889.384.889.857v4.286c0 .473-.398.857-.889.857H13.89C13.398 9 13 8.616 13 8.143V3.857c0-.473.398-.857.889-.857z"/></svg>             
                Exchange Buy & Sell Prices
                <span className="px-2 m-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">The WebSocket is currently {connectionStatus}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex-grow container mx-auto sm:px-4 pt-6 pb-8">
      <div className="bg-green-200 -t -b sm:-l sm:-r sm:rounded mb-6">
        <div className="-b -green-300">
          <div className="flex justify-between">
            
            <div className="flex">
              <button onClick={()=> { toggleSymbol("BTC-USD")}} type="button" className={`flex appearance-none py-4 -b  px-10 ${navClassName("BTC-USD")}`}>
                <img className="w-6 mr-2" src="https://img.icons8.com/color/48/000000/bitcoin--v1.png"/> 
                Bitcoin &middot; 
                {/* ${ Object.keys(bestSides).length > 0 ? formatAmount(bestSides["BTC-USD"].best_buy_side.price) : "0" } */}
              </button>
              <button onClick={()=> { toggleSymbol("ETH-USD")}}  type="button" className={`flex appearance-none py-4 -b px-10 ${navClassName("ETH-USD")}`}>
                <img className="w-6 mr-2" src="https://img.icons8.com/color/48/000000/ethereum.png"/> 
                Ethereum &middot; 
                {/* ${ Object.keys(bestSides).length > 0 ? formatAmount(bestSides["ETH-USD"].best_buy_side.price) : "0" } */}
              </button>
            </div>
      
          </div>
        </div>
        
        <div className="hidden lg:flex">
          <div className="w-1/2 text-center py-8">
            {
              Object.keys(bestSides).length > 0 ?
              <>
                <div className="-r -green-500">
                  <div className="text-grey-darker mb-2">
                      <span className="text-3xl align-top">$</span>
                      <span className="text-5xl">{formatAmount(bestSides[symbol].best_buy_side.price).toString().split(".")[0]}</span>
                      <span className="text-3xl align-top">.{bestSides[symbol].best_buy_side.price.toString().split(".")[1] || "00"}</span>
                  </div>
                  <div className="text-sm uppercase text-grey tracking-wide">
                    {symbol}  <br/>
                    <span className="px-2 m-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Best Exchange to buy - {bestSides[symbol].best_buy_side.exchange}</span>
                  </div>
                </div>
            </>
            : <></>
            }
          </div>
          <div className="w-1/2 text-center py-8">
          {
              Object.keys(bestSides).length > 0 ?
              <>
                <div className="-r -green-500">
                  <div className="text-grey-darker mb-2">
                      <span className="text-3xl align-top">$</span>
                      <span className="text-5xl">{formatAmount(bestSides[symbol].best_sell_side.price).toString().split(".")[0]}</span>
                      <span className="text-3xl align-top">.{bestSides[symbol].best_sell_side.price.toString().split(".")[1]}</span>
                  </div>
                  <div className="text-sm uppercase text-grey tracking-wide">
                    {symbol} <br/>
                    <span className="px-2 m-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Best Exchange to Sell - {bestSides[symbol].best_sell_side.exchange}</span>
                  </div>
                </div>
            </>
            : <></>
            }
          </div>
          
          
        </div>
      </div>
      <div className="flex flex-wrap -mx-4">
      
        <div className="w-full">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-5">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow-sm overflow-hidden -b -gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead className="">
                      <tr>
                        <th
                            scope="col"
                            className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                          S/N
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Exchange
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Symbol
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Ask Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Bid Price
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Action</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {tickers.map((ticker, idx) => (
                        
                        <tr key={ticker.exchange} className="">
                          
                          <td className="p-7 whitespace-nowrap">
                            <div className="text-lg text-gray-900">{idx+1}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                          
                              <div className="ml-4">
                                <div className="text-lg font-medium text-gray-900">{ticker.exchange}</div>
                                  
                                {bestSides && bestSides[ticker.symbol].best_buy_side.exchange == ticker.exchange ? (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" >
                                      BUY - Recommeded
                                  </span>
                                ) : (<span/>)
                                }
                                {bestSides && bestSides[ticker.symbol].best_sell_side.exchange == ticker.exchange ? (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800" >
                                      SELL - Recommeded
                                  </span>
                                ) : (<span/>)
                                }
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-lg text-gray-900 ">{ticker.symbol}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-lg text-gray-900 ">${ticker.ask}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-lg text-gray-900 ">${ticker.bid}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href={ticker.url} target="__blank" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                              Trade
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>

  </div>
  );
};

export default App