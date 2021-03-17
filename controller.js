"use strict";

const avaiableLanguages = ["pl"]
const getDayOfYear = require('date-fns/getDayOfYear')
const getYear = require ('date-fns/getYear')
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
    	filename: "./jft.db"
    }
  });

function calculatedDayNumber () {

    //If it's February 28th or before, just return day number
    let day_of_year = getDayOfYear(Date.now())
    if (day_of_year < 60) return day_of_year

    //If it's after February 28th check if yeaar is leap year 
    let is_leap_year
    if (getYear(Date.now()%4 === 0)){
        is_leap_year = true 
    } else {
        is_leap_year = false
    }

    //If it is, again just return day number
    if (is_leap_year) {
        return day_of_year

    //If it isn't return day number plus ofe to.. leap trough february 29th meditation.
    } else {
        return (day_of_year + 1)
    }
}
console.log (calculatedDayNumber())

exports.getJft = async (req,res) => {
    try {
		let language = req.query.lang || "pl"
		let today_number = calculatedDayNumber()
		
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
        let today_number = calculatedDayNumber()

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
