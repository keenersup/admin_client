import Fingerprint2 from 'fingerprintjs2'


// export async function getFingerprint() {
//   return new Promise((res) => {
//     const innerFunction =  (components) => {
//       const murmur =  Fingerprint2.x64hash128(components.map(function (pair) {
//         return pair.value
//       }).join(), 31)
//       res(murmur)
//     }
//     Fingerprint2.get(innerFunction)
//   })
// }

/********* ********* ********* ********* ********* ********* ********* ********* *********
 Fingerprint asynchronous function
 ********* ********* ********* ********* ********* ********* ********* ********* *********/

export const getFingerprint = () => {
  if (window.requestIdleCallback) {
    return new Promise((resolve,reject) => {
      requestIdleCallback(function () {
        Fingerprint2.get((components) => {
          const murmur = Fingerprint2.x64hash128(components.map(function (pair) {
            return pair.value
          }).join(), 31)
          resolve(murmur)
        })
      })
    })
  } else {
    setTimeout(function () {
      return new Promise((resolve) => {
        Fingerprint2.get((components) => {
          const murmur = Fingerprint2.x64hash128(components.map(function (pair) {
            return pair.value
          }).join(), 31)
          resolve(murmur)
        })
      })
    }, 500)
  }
}
