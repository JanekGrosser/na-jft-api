"use:strict";

const getDayOfYear = require('date-fns/getDayOfYear')
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./jft.db"
    }
  });

exports.getJft = async (req,res) => {
    try {
        let today_number = getDayOfYear(Date.now())
        let jft = await knex("jft_pl").select().where({"day_number": today_number})
        console.log(`${new Date()}: fetched maditation just for today number ${today_number}`)
        return res.status(200).json(jft)
    } catch (error) {
        console.log(`${new Date()}: ${error}`)
        return res.sendStatus(500)
    }
}
