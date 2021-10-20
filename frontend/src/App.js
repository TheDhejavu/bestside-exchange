import React from "react";
import "./index.css";
import './App.css';

/* eslint-disable */

const tickers = [
  {
    key: 1,
    name: 'Blockchain.com',
    ask: '$21,404.74',
    bid: '$21,404.74',
    best_buy: true,
    best_sell:false,
    url:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    key: 2,
    name: 'Blockchain.com',
    ask: '$21,404.74',
    bid: '$21,404.74',
    best_buy: true,
    best_sell:false,
    url:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    key: 3,
    name: 'Blockchain.com',
    ask: '$21,404.74',
    bid: '$21,404.74',
    best_buy: true,
    best_sell:false,
    url:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
]

class App extends React.Component {
 render() {
  return (
    <div class="font-sans bg-gray-50 flex flex-col min-h-screen">
  <div>
    <div class="bg-black">
      <div class="container mx-auto px-4">
        <div class="flex items-center md:justify-between py-4">
          <div class="w-1/4 md:hidden">
            <svg class="fill-current text-white h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16.4 9H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zm0 4H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zM3.6 7h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1z"/></svg>
          </div>
          <div class="w-1/2 md:w-auto text-center text-white text-2xl font-medium">
            BestSide Exchange
          </div>
        </div>
      </div>
    </div>
    <div class="hidden bg-white-200 md:block md:bg-white-300 md:border-b">
      <div class="container mx-auto px-4">
        <div class="md:flex">
          <div class="flex -mb-px mr-8 items-center self-center">
            <a href="#" class="self-center no-underline text-black md:text-blue-dark flex items-center py-4 border-b border-blue-dark">
              <svg class="h-6 w-6 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M3.889 3h6.222a.9.9 0 0 1 .889.91v8.18a.9.9 0 0 1-.889.91H3.89A.9.9 0 0 1 3 12.09V3.91A.9.9 0 0 1 3.889 3zM3.889 15h6.222c.491 0 .889.384.889.857v4.286c0 .473-.398.857-.889.857H3.89C3.398 21 3 20.616 3 20.143v-4.286c0-.473.398-.857.889-.857zM13.889 11h6.222a.9.9 0 0 1 .889.91v8.18a.9.9 0 0 1-.889.91H13.89a.9.9 0 0 1-.889-.91v-8.18a.9.9 0 0 1 .889-.91zM13.889 3h6.222c.491 0 .889.384.889.857v4.286c0 .473-.398.857-.889.857H13.89C13.398 9 13 8.616 13 8.143V3.857c0-.473.398-.857.889-.857z"/></svg>             
               Exchange Buy/Sell Prices
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex-grow container mx-auto sm:px-4 pt-6 pb-8">
    <div class="bg-green-200 border-t border-b sm:border-l sm:border-r sm:rounded shadow mb-6">
      <div class="border-b px-6 border-green-300">
        <div class="flex justify-between -mb-px">
          <div class="lg:hidden text-blue-dark py-4 text-lg">
            Price Charts
          </div>
          <div class="hidden lg:flex">
            <button type="button" class="appearance-none py-4 text-blue-dark border-b border-green-500 mr-6">
                Bitcoin &middot; $21,404.74
            </button>
            <button type="button" class="appearance-none py-4 text-grey-dark border-b border-transparent hover:border-green-500 mr-6">
                Ethereum &middot; $884.80
            </button>
          </div>
    
        </div>
      </div>
      <div class="flex items-center px-6 lg:hidden">
        <div class="flex-grow flex-no-shrink py-6">
          <div class="text-grey-darker mb-2">
            <span class="text-3xl align-top">$</span>
            <span class="text-5xl">21,404</span>
            <span class="text-3xl align-top">.74</span>
          </div>
          <div class="text-green-light text-sm">
            &uarr; $12,955.35 (154.16%)
          </div>
        </div>
       
      </div>
      <div class="hidden lg:flex">
        <div class="w-1/3 text-center py-8">
          <div class="border-r border-green-500">
            <div class="text-grey-darker mb-2">
              <span class="text-3xl align-top">$</span>
              <span class="text-5xl">21,404</span>
              <span class="text-3xl align-top">.74</span>
            </div>
            <div class="text-sm uppercase text-grey tracking-wide">
              Best Bitcoin Price
            </div>
          </div>
        </div>
        <div class="w-1/3 text-center py-8">
          <div class="border-r border-green-500">
            <div class="text-grey-darker mb-2">
              <span class="text-3xl align-top"><span class="text-green align-top">+</span>$</span>
              <span class="text-5xl">12,998</span>
              <span class="text-3xl align-top">.48</span>
            </div>
            <div class="text-sm uppercase text-grey tracking-wide">
              Since last month (CAD)
            </div>
          </div>
        </div>
        <div class="w-1/3 text-center py-8">
          <div>
            <div class="text-grey-darker mb-2">
              <span class="text-3xl align-top"><span class="text-green align-top">+</span></span>
              <span class="text-5xl">154.47</span>
              <span class="text-3xl align-top">%</span>
            </div>
            <div class="text-sm uppercase text-grey tracking-wide">
              Since last month (%)
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap -mx-4">
      <div class="w-full">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-5">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-white">
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
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tickers.map((ticker) => (
                      <tr key={ticker.email}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">#{ticker.key}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                        
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{ticker.name}</div>
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" >
                                  BUY - Recommeded
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-bold">{ticker.ask}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="text-sm text-gray-900 font-bold">{ticker.bid}</div>
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
  )
 }
}
export default App;