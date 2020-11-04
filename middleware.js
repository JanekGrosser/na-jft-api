const avaiableLanguages = ["pl"]

let language = req.query.lang || "pl"
		
if (!avaiableLanguages.includes(language)){
    return res.status(400).send(`Please check language query string. Avaiable values: ${avaiableLanguages}`)
}
