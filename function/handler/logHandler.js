const pool = require("../../db.config");
const application_log = require("../../models/applicationLog.model");

const log_handler = async (username, activity, status, target) => {
  try {
    const log = await application_log.create({
      username,
      activity,
      status,
      target,
    });

    // const forum =
    //   await pool.query(`INSERT INTO application_log (username, activity, status,target)
    //  VALUES ('${username}' ,'${activity}','${status}', '${target}' )`);
    return log.dataValues;
  } catch (error) {
    throw error;
  }
};

module.exports = { log_handler };
