import Request from "./Request"
import Logger from "./utils/Logger"

export default class DataHandler {
  static storestats (dataRows: any[]){
    Request.POST(Request.API_ENDPOINTS.storestats, { stats: dataRows })
      .then(({ data }) => {
        Logger.info("Successfully created the following rows", JSON.stringify(data))
      })
      .catch((err) => {
        if (err.response.status === 401){ Logger.error("Unauthorized. Double check that you have properly configured your API Token"); return }
        console.log(err.response.status); Logger.error(JSON.stringify(err)) })
  }
}
