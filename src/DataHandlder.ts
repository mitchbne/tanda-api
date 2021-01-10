import Request from "./Request"
import Logger from "./utils/Logger"

export default class DataHandler {
  static storestats (dataRows: any[]){
    Logger.info("DataHandler.storestats()")
    Request.POST(Request.API_ENDPOINTS.storestats, { stats: dataRows })
      .then(({ data }) => {
        Logger.info("Successfully created the following rows", JSON.stringify(data))
      })
      .catch((err) => { Logger.error(JSON.stringify(err)) })
  }
}
