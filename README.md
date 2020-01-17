## ✨ Tanda API Data Upload
This is just a simple little application that takes a CSV of data and uploads it through the Tanda API.

### Getting Started
```bash
git clone git@github.com:mitchbne/tanda-api.git

yarn install

# Add the data file that you want to the current project directory as 'data.csv'
.
├── README.md
├── data.csv # <-- like this
├── index.js
├── node_modules
├── package.json
└── yarn.lock

# From here, you will need to create an modify a new file called '.env'.
# Add the following lines:

AUTH_TOKEN="123456543234567876543245678765434567876543"
API_ENDPOINT="departments"

# You WILL need to modify the AUTH_TOKEN value to match your API KEY
# Update the API_ENDPOINT value to match your desired API endpoint.
# i.e. "https://my.tanda.co/api/v2/departments" --> API_ENDPOINT="departments"

yarn start
```

### Things to Note

_Ensure that your CSV file uses headers with column heading values corresponding to the expected key name in the Tanda API._

For example:

**Tanda API URL:**

<div style="display: flex; align-items: center">
<div style="background: #5cb85c; display: inline; color: white; padding: 0.1rem 0.5rem; border-radius: 0.25rem; height: max-content; margin-right: 1rem">POST</div>

```https://my.tanda.co/v2/departments```
</div>

_Body_

```json
{
  "name": "Waiters",
  "location_id": 111,
  "export_name": "WGB-32",
  "colour": "#FBB830"
}
```

**CSV File**
```csv
name,location_id,export_name,colour
Waiters,111,WGB-32,#FBB830
```

