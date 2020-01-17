const fs = require("fs")
const axios = require("axios")
const Papa = require("papaparse")
require("dotenv").config() // Load in Environmental variables.

// Editable values
// Add these variables in a .env file
const AUTH_TOKEN = process.env.AUTH_TOKEN
const API_ENDPOINT = process.env.API_ENDPOINT

// Setup default API connection configuration
axios.defaults.baseURL = "https://my.tanda.co/api/v2/"
axios.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`
axios.defaults.headers.post["Content-Type"] = "application/json"

fs.readFile("./data.csv", "utf-8", (err, data) => {
  if (err) {throw err}
  else {
    Papa.parse(data, {
      dynamicTyping: true,
      header: true,
      complete: ({ data: dataRows }) => {
        const errors = []
        const newEntries = []
        Promise.all(
          dataRows.map((row, rowIndex) => new Promise((resolve) => {
            axios.post(API_ENDPOINT, { ...row })
              .then(({ status, data }) => {
                if (status >= 200 && status <= 205){
                  newEntries.push({ id: data.id })
                  console.log("✅ Created new entry", data.id )
                }
              })
              .catch((error) => {
                errors.push({ error, row })
                console.log("❌ Error creating entry. CSV row ", rowIndex + 1)
              })
              .finally(() => { resolve() })
          }))
        ).then(() => {
          if (errors.length > 0){
            errors.forEach((e) => {
              console.log(e.error)
            })
            const output_rows = errors.map(line => line.row)
            const csv = Papa.unparse(output_rows)
            fs.writeFile("rows_not_sent.csv", csv, (err) => {
              if (err) {throw err}
              console.log("Rows that did not get created have been output to 'rows_not_sent.csv' ")
            })
          }
          console.log("\n\n")
          console.log("✨  Summary")
          console.log(`${newEntries.length} rows created.`)
          console.log(`${errors.length} errors occured.\n\n`)
        })
          .catch((err) => {
            console.log("It semes there was some dodgy CSV stuff parsed.")
            console.log(err)
          })
      },
    })
  }
})

