const symbolSelectElement = document.getElementById('symbol');
const intervalSelectElement = document.getElementById('interval');
const tradesListElement = document.querySelector('.trades-container__list');

let candlesWS = null, tradesWS = null;

const chart = LightweightCharts.createChart(document.getElementById('chart'), {
   layout: {
      backgroundColor: '#111111',
      textColor: '#ffffff',
   },
   grid: {
      vertLines: {
         color: '#ffffff',
      },
      horzLines: {
         color: '#ffffff',
      },
   },
   crosshair: {
      mode: LightweightCharts.CrosshairMode.Normal,
   },
   timeScale: {
      timeVisible: true,
   }, 

    });

    window.addEventListener('resize', () => {
      chart.resize(
      document.documentElement.clientWidth * 4 / 5,
      document.documentElement.clientHeight * 4 / 5,
      );
      
    });


const candlestickSeries = chart.addCandlestickSeries({
   upColor: '#11ff11',
   borderUpColor: '#11ff11',
   wickUpColor: '#11ff11',
   downColor: '#d3302a',
   borderDownColor: '#d3302a',
   wickDownColor: '#d3302a',
});

symbolSelectElement.addEventListener('change', () => {
   candlesWS.close();
   tradesWS.close();
   tradesListElement.innerHTML = '';

   const symbol = symbolSelectElement.value;
   const interval = intervalSelectElement.value;

   setHistoryCandles(symbol, interval)  
   streamCandles(symbol, interval);
   streamTrades(symbol)
});
intervalSelectElement.addEventListener('change', () => {
   candlesWS.close();
   
   const symbol = symbolSelectElement.value;
   const interval = intervalSelectElement.value;

   setHistoryCandles(symbol, interval)  
   streamCandles(symbol, interval);

});

const symbol = symbolSelectElement.value;
const interval = intervalSelectElement.value;

setHistoryCandles(symbol, interval)  
streamCandles(symbol, interval);
streamTrades(symbol)

function setHistoryCandles(symbol, interval) {

fetch(`https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=${interval}&limit=1500`)

.then(resp => resp.json())
.then(candlesArr => 
   candlestickSeries.setData(candlesArr.map(([time, open, high, low, close]) => ({
   time: time / 1000, open, high, low, close
}))));

}

function streamCandles(symbol, interval) {
   candlesWS = new WebSocket(`wss://fstream.binance.com/ws/${symbol.toLowerCase()}@kline_${interval}`);
   candlesWS.onmessage = event => {
      const {t: time, o: open, h: high, l: low, c: close} = JSON.parse(event.data).k;
      candlestickSeries.update({time: time / 1000, open, high, low, close});
}
}

function streamTrades(symbol) {
   tradesWS = new WebSocket(`wss://fstream.binance.com/ws/${symbol.toLowerCase()}@aggTrade`);
   tradesWS.onmessage = event => {
      const {m: isBuyerMaker, p: price, q: quantity} = JSON.parse(event.data);
      const tradeElement = document.createElement('div');
      tradeElement.classList.add('trade', isBuyerMaker ? 'sell' : 'buy');
      tradeElement.innerHTML = `
      <span>${price}</span>
      <span>${quantity}</span>
      <span>${(price * quantity).toFixed(2)}</span>
      `;

      tradesListElement.prepend(tradeElement);
      if (tradesListElement.children.length > 60) {
         tradesListElement.children[tradesListElement.children.length - 1].remove();
      }
   }
}


