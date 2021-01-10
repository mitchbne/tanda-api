import fs from "fs"
import Papa from "papaparse"
import { CSV_FILE_PATH } from "./constants"
import DataHandler from "./DataHandlder"
import { SupportedUploadType } from "./types"
import Logger from "./utils/Logger"

export default class CSVParser {
  static handle(file: string){
    const type: any = file.split(".csv")[0]
    // @ts-ignore
    if (!SupportedUploadType[type]){ return }
    fs.readFile(`${CSV_FILE_PATH}/${file}`, "utf-8", (err, data) => {
      if (err){ Logger.error(err.toString()); return }
      this.parseData(type, data)
    })
  }

  static parseData(type: SupportedUploadType, data: string){
    Papa.parse(data, {
      dynamicTyping: true,
      header: true,
      skipEmptyLines: "greedy",
      complete: ({ data: dataRows }) => {
        const handleData: Record<SupportedUploadType, () => void> = {
          [SupportedUploadType.storestats]: () => { DataHandler.storestats(dataRows) },
          // [SupportedUploadType.departments]: () => { DataHandler.departments(dataRows) },
        }
        handleData[type]()
      },
    })
  }
}
