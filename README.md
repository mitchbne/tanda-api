## ✨ Tanda API Data Upload
This is just a simple little application that takes a CSV of data and uploads it through the Tanda API.

At the moment, this tool supports the following Tanda API endpoints:
- [Create StoreStats](https://my.tanda.co/api/v2/documentation#store-stats-create-store-stats-for-multiple-datastreams) `POST /api/v2/storestats/for_datastream` 

### Getting Started


1. You will need an `AUTH_TOKEN`. You can retrieve this when logged in at https://my.tanda.co/api/oauth/access_tokens.
 **Make sure that you have the necessary scopes**.

2. Clone the repository locally and install dependencies
```bash
git clone git@github.com:mitchbne/tanda-api.git

yarn install
```
3. Create and modify ENVIRONMENTAL VARIABLES in a `.env` file

```
# The current directory structure looks as follows:
.
├── csv_files/                     <-- Insert the files that you want to be uploaded into this directory.
├── csv_templates/                 <-- Use these templates to ensure your data is formatted correctly
├── src/
├── test/
├── .env                           <-- This is where you should include your .env file
├── README.md
├── package.json
└── yarn.lock

# From here, you will need to create and modify a new file called '.env'.
# Add the following lines:

AUTH_TOKEN=123456543234567876543245678765434567876543
```

4. Use the appropriate template that you need from the `csv_templates/` folder. Duplicate this into the `csv_files/` folder and modify the file so that it uses the data that you need. 

5. Start the application with the command `yarn dev`
