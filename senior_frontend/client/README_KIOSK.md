I have added another "client" folder for the Front-end app.

It fetches data from python/poetry endPoint

- cd to "kiosk_case_study/senior_frontend/client"
- run "npm install"
- then, type "npm run dev"
- Open http://localhost:5173/ in browser

Fetched data was formated/processed to look like this :

const formatedData = [
{
"country": "Germany",
"business_unit": "Manufacturing",
"date": "2023-12-01",
"indicator": "co2_emissions",
"value": 10668179
},
...
]

Then the formated data was displayed on MUI Table: country, Business Unit, Date, Indicator and Value.

==> "Indicator" and "Date"(Year) has dynamic value (user can select different values and apply filter).

==> I was not able to show/calculate "gender parity ratio" because the API returns just "male_headcount" or "female_headcount" (but we need both).
