/* @flow */
import {bind} from "decko"
import moment from "moment"
import CandlestickCollectorService from "../../domain/service/CandlestickCollectorService"

/**
 * Main collector service
 */
export default class CollectorService
{
    /**
     * Candlestick collector service
     */
    candlestickCollector:CandlestickCollectorService;

    /**
     * Constructor
     */
    constructor(candlestickCollector:CandlestickCollectorService)
    {
        this.candlestickCollector = candlestickCollector;
    }

    /**
     * Collect datas endlessly
     */
    @bind
    async endlessCollect():Promise<void>
    {
        await this.collect();

        let nowMoment = moment().utc();
        let seconds = nowMoment.seconds();
        let delay = 1000*60 - 1000*seconds;

        setTimeout(async () => {
            await this.collect();

            setInterval(async () => {
                await this.collect();
            }, 1000*60);
        }, delay);
    }

    /**
     * Collect datas
     */
    @bind
    async collect():Promise<void>
    {
        console.log(moment().utc().format("YYYY-MM-DD HH:mm:ss"), "collect");
        await this.candlestickCollector.collect("Binance", "BTC", "USDT");
    }

    /**
     * Collect datas for one pair and exchange
     */
    async collectByPair(exchange:string, baseAsset:string, quoteAsset:string):Promise<void>
    {
    }
}
