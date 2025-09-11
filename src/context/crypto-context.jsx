import { createContext, useContext, useEffect, useState } from "react";
import { fakeFetchCrypto, FetchAssets } from '../api';
import { percentDifference } from '../utils';

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
})

export function CryptoContextProvider({ children }) {
    const [loading, SetLoading] = useState(false)
    const [crypto, SetCrypto] = useState([])
    const [assets, SetAssets] = useState([])

    useEffect(() => {
        async function preload () {
            SetLoading(true)
            const { result } = await fakeFetchCrypto()
            const assets = await FetchAssets()

            SetAssets(assets.map(asset =>{
                const coin = result.find((c) => c.id === asset.id)
                return{
                    grow: asset.price < coin.price, //boolean
                    growPercent: percentDifference(asset.price, coin.price),
                    totalAmount: asset.amount * coin.price,
                    totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                    ...asset
                }
            }))
            SetCrypto(result)
            SetLoading(false)
        }
        preload()
    }, [])

    return (
        <CryptoContext.Provider value={{ loading, crypto, assets }}>
          {children}
        </CryptoContext.Provider>
      );
}

export default CryptoContext

export function useCrypto() {
    return useContext(CryptoContext)
}