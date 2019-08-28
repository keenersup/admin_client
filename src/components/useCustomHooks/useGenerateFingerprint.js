import { useState, useEffect } from 'react';

export const useGenerateFingerprint = (props) => {
  const [clientId, setClientId] = useState('')
  useEffect(() => {
    let isSubscribed = true
    if (isSubscribed) {
      import("../../utils/getFingerprint").then(async ({ getFingerprint }) => {
        if (isSubscribed) {
          try {
            const result = await getFingerprint()
            if (isSubscribed) {
              setClientId(result)
            }
          } catch (err) {
            isSubscribed = false
            console.log(err);
          }

        }
      });
    }
    return () => isSubscribed = false
  }, [])

  return { clientId }
}



