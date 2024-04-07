import axios from "axios";

import { generateEndpointUrl } from "../../config/Endpoint";

export default function useBlockchainService() {
  const endpoint = generateEndpointUrl(3002);

  const verifyPatchBlock = async (transactionHashId) => {
    try {
      return await axios.get(endpoint + "/patch-blockchain", {
        params: { transactionHashId },
      });
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };
  return { verifyPatchBlock };
}
