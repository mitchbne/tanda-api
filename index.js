const axios = require("axios")
const Papa = require("papaparse")
const fs = require("fs")

const AUTH_TOKEN = ""

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
          dataRows.map((row) => new Promise((resolve, reject) => {
            axios.post("departments/", { ...row })
            .then(({ status, statusText, data }) => {
              const { id, name } = data
              newEntries.push({ id, name })
            })
            .catch(({ response: { data: { error }, config: { data }} }) => {
              errors.push({ error, data })
            })
            .finally(() => { resolve() })
          }))
        ).then(() => {
          console.log("New rows", newEntries)
          console.log("Errors", errors)
        })
      }
    })
  }
})

