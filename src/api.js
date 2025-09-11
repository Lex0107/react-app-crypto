import {cryptoAssets, cryptoData} from './data'

export function fakeFetchCrypto() { // Export a function named fakeFetchCrypto so it can be used in other files
    return new Promise(resolve => { // Return a new Promise that takes a "resolve" function as an argument
        setTimeout(() => { // Use setTimeout to simulate a delay (like waiting for data from an API)
            resolve(cryptoData) // After the delay, resolve the Promise with "cryptoData"
        }, 1) // Set the delay to 2000 milliseconds (2 seconds)
    }) // End of the Promise
} // End of the function

export function FetchAssets(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 1)
    })
}