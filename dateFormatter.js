const fs = require("fs")
const Papa = require("papaparse")
const moment = require("moment")

// Expected format of 'dates.csv'

// start_date,start_time,finish_time
// 02/08/2018,13:00,22:00
// 03/08/2018,13:00,22:00
// 04/08/2018,10:00,19:00

const startTime = new Date().getTime()
fs.readFile("./dates.csv", "utf-8", (err, data) => {
  if (err) {throw err}
  else {
    Papa.parse(data, {
      dynamicTyping: true,
      header: true,
      complete: ({ data: dataRows }) => {
        const output = []
        Promise.all(
          dataRows.map(({ start_date, start_time, finish_time }) => new Promise((resolve) => {
            const next_day = moment(finish_time, "HH:mm").diff(moment(start_time, "HH:mm")) < 0
            const new_output = next_day ? {
              start: +moment(`${start_date} ${start_time}`, "DD/MM/YYYY HH:mm").format("X"),
              finish:+ moment(`${start_date} ${finish_time}`, "DD/MM/YYYY HH:mm").add(1, "day").format("X"),
            } : {
              start: +moment(`${start_date} ${start_time}`, "DD/MM/YYYY HH:mm").format("X"),
              finish:+ moment(`${start_date} ${finish_time}`, "DD/MM/YYYY HH:mm").format("X"),
            }
            output.push(new_output)
            resolve()
          }))
        ).then(() => {
          const outputCSV = Papa.unparse(output)
          fs.writeFile("dates_output.csv", outputCSV, (err) => {
            if (err) {throw err}
            console.log("Successfully sent output rows to 'dates_output.csv' ")
          })
          console.log("\n\n")
          console.log("✨  Summary")
          console.log(`${output.length} rows created in ${ new Date().getTime() - startTime }ms \n`)
        })
          .catch((err) => {
            console.log("It semes there was some dodgy CSV stuff parsed.")
            console.log(err)
          })
      },
    })
  }
})

