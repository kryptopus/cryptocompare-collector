/* @flow */
import AbstractCommand from "solfegejs-cli/lib/Command/AbstractCommand"
import type CollectorService from "../service/CollectorService"

/**
 * Collect datas from cryptocompare.com
 *
 * URL: https://min-api.cryptocompare.com/data/histohour?fsym=NEO&tsym=USDT&limit=10&e=Binance&aggregate=0&toTs=1512082800
 */
export default class CollectCommand extends AbstractCommand
{
    /**
     * Collector service
     */
    collector:CollectorService;

    /**
     * Constructor
     *
     * @param   CollectorService    collector   Collector service
     */
    constructor(collector:CollectorService)
    {
        super();

        this.collector = collector;
    }

    /**
     * Configure the command
     */
    async configure()
    {
        this.setName("kryptopus:cryptocompare:collect");
        this.setDescription("Collect datas from cryptocompare.com");
    }

    /**
     * Execute the command
     */
    async execute(parameters:Array<string>)
    {
        try {
            await this.collector.endlessCollect();
        } catch (error) {
            console.error("Unable to execute endless collect", error);
        }
    }
}
