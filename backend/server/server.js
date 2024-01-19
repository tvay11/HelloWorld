const express = require('express');
const Amadeus = require('amadeus');
const apollo = require('./apollo');
const functions = require('firebase-functions');
const config = require('./Amadeus/key.js');
const app = express();


app.get('/airports', async (req, res) => {
    const amadeus = new Amadeus({
        clientId: config.amadeusApiKey,
        clientSecret: config.amadeusApiSecret,
    });
    const { page, subType, keyword } = req.query;
    let response;
    do {
        try {
            response = await amadeus.client.get("/v1/reference-data/locations", {
              keyword,
              subType,
              "page[offset]": page * 10
            });
          } catch (error) {
            if (error.response?.statusCode === 429) {
                console.log('Rate limit exceeded, waiting before retrying...');
                await new Promise(resolve => setTimeout(resolve, 600));
            } else {
                console.log(error.response);
                console.log(error.response?.request);
                console.log(error.code);
                throw error;
            }
        }
    } while (!response);

    res.json(response);
})

app.get('/flights', async (req, res) => {
    console.log("/flights route called");

    const amadeus = new Amadeus({
        clientId: config.amadeusApiKey,
        clientSecret: config.amadeusApiSecret,
    });

    // Disable browser cache to ensure most recent results
    res.set('Cache-Control', 'no-store');
    res.set('Access-Control-Allow-Origin', '*');


    const departures = req.query.origin;
    const origins = departures.split(',');
    const arrivals = req.query.destination;
    const destinations = arrivals.split(',');
    const departureDate = req.query.departureDate;
    const returnDate = req.query.returnDate;
    const adults = req.query.adults;
    const flightClass = req.query.class;

    try {
        await new Promise(resolve => setTimeout(resolve, 600)).catch((error) => console.error(error));
        const responses = [];

        for(const origin of origins) {
            for(const destination of destinations) {
                console.log(`Requesting flight offers from ${origin} to ${destination}`);
                console.log(`From ${departureDate} to ${returnDate}`);
                let response;
                do {
                    try {
                        response = await amadeus.shopping.flightOffersSearch.get({
                            originLocationCode: origin,
                            destinationLocationCode: destination,
                            departureDate,
                            returnDate,
                            adults,
                            class: flightClass,
                        });
                    } catch (error) {
                        if (error.response?.statusCode === 429) {
                            console.log('Rate limit exceeded, waiting before retrying...');
                            await new Promise(resolve => setTimeout(resolve, 600));
                        } else {
                            console.log(error.response);
                            console.log(error.response?.request);
                            console.log(error.code);
                            throw error;
                        }
                    }
                } while (!response);

                responses.push(response.data);
                await new Promise(resolve => setTimeout(resolve, 600)).catch((error) => console.error(error));
            }
        }

        const combinedResponse = {
            offers: responses
        };
        res.json(combinedResponse);
    } catch (error) {
        console.error(`Request failed with status code ${error.response?.statusCode}: ${error.response?.request}`);
        res.status(500).send('An error occurred while fetching flight offers');
        throw error;
    }
});


app.listen(6000, () => {console.log("Server started on Port 5000")});

apollo.start().then(res => {
	apollo.applyMiddleware({ app, path: '/' });
	app.listen(5001 , () => 
	  console.log(`Gateway API running at port: 5001`)
	);  
  });
  exports.graphql = functions.https.onRequest(app);
  