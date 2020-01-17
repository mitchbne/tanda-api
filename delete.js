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
        const rowsDeleted = []
        Promise.all(
          dataRows.map((row, rowIndex) => new Promise((resolve) => {
            const { id } = row
            if (!id){errors.push({ error: `No id specified at row ${rowIndex + 1}` })}
            axios.delete(`${API_ENDPOINT}/${id}`)
              .then(({ status }) => {
                if (status >= 200 && status <= 205){
                  console.log("✅ Delete entry with id", id )
                  rowsDeleted.push({ id })
                }
              })
              .catch((error) => {
                errors.push({ error, id })
                console.log("❌ Error deleting entry with ID ")
              })
              .finally(() => { resolve() })
          }))
        ).then(() => {
          if (errors.length > 0){
            errors.forEach((e) => { console.log(e.error) })
            const output_rows = errors.map(line => line.id)
            const csv = Papa.unparse(output_rows)
            fs.writeFile("data_not_deleted.csv", csv, (err) => {
              if (err) {throw err}
              console.log("Entries that did not get deleted have been output to 'data_not_deleted.csv' ")
            })
          }
          console.log("\n\n")
          console.log("✨  Summary")
          console.log(`${rowsDeleted.length} entries deleted.`)
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

