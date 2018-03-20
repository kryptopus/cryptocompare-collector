/* @flow */
import AbstractCommand from "solfegejs-cli/lib/Command/AbstractCommand"
import type ExchangeService from "../service/ExchangeService"

/**
 * Display available exchanges
 */
export default class DisplayExchangeListCommand extends AbstractCommand
{
    /**
     * Main exchange service
     */
    exchangeService:ExchangeService;

    /**
     * Constructor
     *
     * @param   {ExchangeService}   exchangeService     Exchange service
     */
    constructor(exchangeService:ExchangeService)
    {
        super();

        this.exchangeService = exchangeService;
    }

    /**
     * Configure the command
     */
    async configure()
    {
        this.setName("kryptopus:cryptocompare:display_exchange_list");
        this.setDescription("Display available exchanges");
    }

    /**
     * Execute the command
     */
    async execute(parameters:Array<string>)
    {
        let infos = await this.exchangeService.getExchangeInfos();
        console.log(infos);
    }
}
