const schedule = require("node-schedule");
const Message = require("../Models/message");

//Schedule messages to DB for more than 70%
const scheduleMessage = async (req, res) => {
  try {
    const { message, day, time } = req.body;
    const dateTime = new Date(`${day}T${time}:00`);

    if (isNaN(dateTime.getTime())) {
      return res.status(400).json({ message: "Invalid date or time format" });
    }

    schedule.scheduleJob(dateTime, async () => {
      try {
        const newMessage = new Message({ message, scheduleTime: dateTime });
        await newMessage.save();
        console.log(`Message saved: ${message}`);
      } catch (err) {
        console.error("Error saving message:", err.message);
      }
    });

    res.status(200).json({ message: "Message scheduled", dateTime });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { scheduleMessage };
