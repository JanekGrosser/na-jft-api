"use strict";

const avaiableLanguages = ["pl"]
const getDayOfYear = require('date-fns/getDayOfYear')
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
    	filename: "./jft.db"
    }
  });


exports.getJft = async (req,res) => {
    try {
		let language = req.query.lang || "pl"
		let today_number = getDayOfYear(Date.now())
		
		if (!avaiableLanguages.includes(language)){
			return res.status(400).send(`Please check language query string. Avaiable values: ${avaiableLanguages}`)
		}

        let data = await knex("jft_"+language)
        .select()
		.where({"day_number": today_number})
		
		console.log(`${new Date()}: Fetched meditation number: ${data[0].day_number}`)
		
        return res.status(200).json(data)

    } catch (error) {
        console.log(`${new Date()}: ${error}`)
        return res.sendStatus(500).end()
    }
}

exports.getMeditations = async (req,res) => {
    try {
		let language = req.query.lang || "pl"
        let today_number = getDayOfYear(Date.now())

		if (!avaiableLanguages.includes(language)){
			return res.status(400).send(`Please check language query string. Avaiable values: ${avaiableLanguages}`)
		}

        let data = await knex("jft_"+language)
        .select()
        .whereIn("day_number", [today_number, (today_number -1), (today_number +1)])

        for(let key in data) {
          	console.log(`${new Date()}: Fetched meditation number: ${data[key].day_number}`)
        }

		return res.status(200).json(data)
		
    } catch (error) {
        console.log(`${new Date()}: ${error}`)
        return res.sendStatus(500).end()
    }
}
