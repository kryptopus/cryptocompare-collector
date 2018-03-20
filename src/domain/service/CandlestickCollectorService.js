/* @flow */
import {bind} from "decko"
import fetchUrl from "fetch-promise"
import Candlestick from "kryptopus-candlestick"

/**
 * Collect candlesticks
 */
export default class CandlestickCollectorService
{
    /**
     * Collect candlesticks on specific exchange
     *
     * @param   {string}    exchange    Exchange name
     * @param   {string}    baseAsset   Base asset
     * @param   {string}    quoteAsset  Quote asset
     */
    @bind
    async collect(exchange:string, baseAsset:string, quoteAsset:string):Promise<void>
    {
        const candles = await this.fetchFromApi(exchange, baseAsset, quoteAsset);

        await this.save(candles);
    }

    /**
     * Fetch candles from API
     *
     * @param   {string}            exchange    Exchange name
     * @param   {string}            baseAsset   Base asset
     * @param   {string}            quoteAsset  Quote asset
     * @return  {Candlestick[]}                 Candlesticks
     */
    @bind
    async fetchFromApi(exchange:string, baseAsset:string, quoteAsset:string):Promise<Array<Candlestick>>
    {
        let candles:Array<Candlestick> = [];

        try {
            const url = `https://min-api.cryptocompare.com/data/histominute?fsym=${baseAsset}&tsym=${quoteAsset}&limit=60&e=${exchange}`;
            const response = await fetchUrl(url);
            const buf = response.buf;
            const json = buf.toString();
            const content = JSON.parse(json);
            const serializedCandles = content.Data;
            // {
            //     time: 1521460560,
            //     close: 8340,
            //     high: 8347,
            //     low: 8334.77,
            //     open: 8335,
            //     volumefrom: 8.1,
            //     volumeto: 67543.48
            // }

            for (let serializedCandle of serializedCandles) {
                let candle:Candlestick = new Candlestick;
                candle.openTime = serializedCandle.time;
                candle.open = serializedCandle.open;
                candle.close = serializedCandle.close;
                candle.low = serializedCandle.low;
                candle.high = serializedCandle.high;
                candle.volume = serializedCandle.volumeto;

                candles.push(candle);
            }
        } catch (error) {
            console.error(error);
        }

        return candles;
    }

    /**
     * Save candles
     *
     * @param   {Candlestick[]}     candles     Candles to save
     */
    @bind
    async save(candles:Array<Candlestick>):Promise<void>
    {
    }
}
