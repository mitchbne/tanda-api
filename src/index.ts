import path from "path"
import fs from "fs"
import Logger from "./utils/Logger"
import CSVParser from "./CSVParser"
import { SupportedUploadType } from "./types"
import { CSV_FILE_PATH } from "./constants"

require("dotenv").config() // Load in Environmental variables.

Logger.info("Hey there welcome to the Tanda API Upload tool.")

const directoryPath = path.join(CSV_FILE_PATH)
fs.readdir(directoryPath, function (err, files) {
  if (err) { return Logger.error("Unable to scan directory: " + err) }
  const validFileNames = Object.keys(SupportedUploadType)
  const csv_files = files.filter(file => file.endsWith(".csv") && validFileNames.includes(file.split(".csv")[0]) )
  if (csv_files.length === 0){ Logger.warning("There doesn't appear to be any CSV files in the csv_files/ directory")}
  csv_files.forEach(function (file) {
    Logger.info("Handling", file)
    CSVParser.handle(file)
  })
})
