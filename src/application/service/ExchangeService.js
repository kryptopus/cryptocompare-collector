/* @flow */
import {bind} from "decko"
import type ExchangeFinderService from "../../domain/service/ExchangeFinderService"

/**
 * Exchange service
 */
export default class ExchangeService
{
    /**
     * Exchange finder service
     */
    exchangeFinder:ExchangeFinderService;

    /**
     * Constructor
     *
     * @param   {ExchangeFinderService}     exchangeFinder  Exchange finder service
     */
    constructor(exchangeFinder:ExchangeFinderService)
    {
        super();

        this.exchangeFinder = exchangeFinder;
    }

    /**
     * Get exchange informations
     */
    @bind
    async getExchangeInfos()
    {
    }
}
