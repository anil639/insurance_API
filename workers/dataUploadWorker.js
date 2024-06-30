const { parentPort, workerData } = require("worker_threads");

const mongoose = require("mongoose");

const csvParser = require("csv-parser");
const fs = require("fs");
const path = require("path");
//Models
const Agent = require("../Models/agent");
const User = require("../Models/user");
const Account = require("../Models/account");
const LOB = require("../Models/lob");
const Carrier = require("../Models/carrier");
const Policy = require("../Models/Policy");

mongoose.connect("mongodb://localhost:27017/insuranceDB");

//upload data from CSV
const uploadData = async () => {
  const { filePath } = workerData;

  //for CSV file
  const stream = fs.createReadStream(filePath);
  const results = [];

  stream
    .pipe(csvParser())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      //process and save data to collections
      try {
        for (const row of results) {
          const agent = new Agent({ name: row["agent"] });
          await agent.save();

          const user = new User({
            firstName: row["firstname"],
            dob: new Date(row["dob"]),
            address: row["address"],
            phoneNumber: row["phone"],
            state: row["state"],
            zipCode: row["zip"],
            email: row["email"],
            gender: row["gender"],
            userType: row["userType"],
          });
          await user.save();

          const account = new Account({
            accountName: row["account_name"],
            userId: user._id,
          });
          await account.save();

          const lob = new LOB({ categoryName: row["category_name"] });
          await lob.save();

          const carrier = new Carrier({ companyName: row["company_name"] });
          await carrier.save();

          const policy = new Policy({
            policyNumber: row["policy_number"],
            policyStartDate: new Date(row["policy_start_date"]),
            policyEndDate: new Date(row["policy_end_date"]),
            policyCategoryId: lob._id,
            companyId: carrier._id,
            userId: user._id,
          });
          await policy.save();
        }
        parentPort.postMessage("Upload Complete.");
      } catch (error) {
        parentPort.postMessage(`Upload Failed: ${error.message}`);
      }
    });
};

uploadData();
