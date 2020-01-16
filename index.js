const axios = require("axios")
const Papa = require("papaparse")
const fs = require("fs")

// Editable values
const AUTH_TOKEN = "" // <-- MAKE SURE YOU ADD YOUR AUTH_TOKEN HERE
const API_ENDPOINT = "departments" // <-- CHANGE THIS TO THE ENDPOINT THAT YOU WANT

// Setup default API connection configuration
axios.defaults.baseURL = "https://my.tanda.co/api/v2/"
axios.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`
axios.defaults.headers.post['Content-Type'] = 'application/json';

fs.readFile("./data.csv", "utf-8", (err, data) => {
  if (err) throw err
  else {
    Papa.parse(data, {
      dynamicTyping: true,
      header: true,
      complete: ({ data: dataRows }) => {
        var errors = []
        var newEntries = []
        Promise.all(
          dataRows.map((row, index) => new Promise((resolve, reject) => {
            const rowNumber = index + 1
            setTimeout(() => {
              axios.post(API_ENDPOINT, { ...row })
              .then(({ status, statusText, data }) => {
                const { id, name } = data
                newEntries.push({ id, name })
              })
              .catch(({ response: { data: { error }, config: { data }} }) => {
                errors.push({ error, data })
              })
              .finally(() => { resolve() })
            }, Math.floor(rowNumber / 100) * 60 * 1000)
          }))
        ).then(() => {
          console.log("New rows", newEntries)
          console.log("Errors", errors)
        })
      }
    })
  }
})

