const os = require("os-utils");
const pm2 = require("pm2");
const Message = require("../Models/message");

//CPU monitor for more than 70% usage and restart server
const checkCPUUsage = () => {
  os.cpuUsage(async function (v) {
    console.log("CPU Usage (%): " + v * 100);

    if (v > 0.7) {
      console.log(
        "CPU usage exceeded 70%, inserting high usage message and restarting server..."
      );
      const highUsageMessage = new Message({
        message: "CPU usage exceeded 70%",
        scheduleTime: new Date(),
      });
      try {
        await highUsageMessage.save();
        console.log("High usage message saved");
      } catch (err) {
        console.error("Error saving high usage message:", err.message);
      }

      pm2.restart("insurance-api", (err) => {
        if (err) {
          console.error("Error restarting server:", err);
        } else {
          console.log("Server restarted successfully.");
        }
      });
    }
  });
};
setInterval(checkCPUUsage, 60000);
