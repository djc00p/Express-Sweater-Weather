# Express Sweater Weather
By Deonte Cooper

Deployed on Heroku at: https://express-sweater-weather0312.herokuapp.com/

This solo project is a remake of a Ruby on Rails project called Sweater Weather:
https://github.com/djc00p/sweater-weather

#### EndpointsExample Endpoints

```
GET /api/v1/forecast?location=denver,co
POST /api/v1/users?email=example@email.com&password=PASSWORD&password_confirmation=PASSWORD
POST /api/v1/sessions?user[email]=example@email.com&user[password]=PASSWORD
POST /api/v1/favorites?api_key=USER_API_KEY&location=Denver,%20CO
GET /api/v1/favorites?api_key=USER_API_KEY
DELETE /api/v1/favorites?api_key=USER_API_KEY&location=Denver,%20CO
```

A weather app using JavaScript, built on NodeJS with the [Express](https://expressjs.com/) framework. [Sequelize](http://docs.sequelizejs.com/) is used for an ORM.

This project is a Mod 4 assignment from the Turing School of Software and Design. [Assignment details are available](https://github.com/turingschool/backend-curriculum-site/blob/66a39813572f453700ab944948ecf698b0b75d42/module4/projects/express_sweater_weather/express_sweater_weather_spec.md) in the [@turingschool](https://github.com/turingschool) curriculum repository.


### Setup
From the project root, run:
- `npm install`
- `npx sequelize db:create`
- `npx sequelize db:migrate`
- `npx sequelize db:seed`

To start the API server, run `npm start`, then access endpoints as described below. Default port on `localhost` is `3000`.

### Learning Goals
- Create an Express API given specified endpoints and response formats.
- Create RESTful API Routes in JavaScript.

### Endpoints
|             Express Sweater Weather            |
|------------------------------------------------|
|[Account Creation](#account-creation)           |
|[Login](#login)                                 |
|[Forecast](#forecast)                           |
|[Favoriting Location](#favoriting-location)     |
|[Favorites List](#favorites-list)               |
|[Favorite Removed](#favorite-removed)           |


---

#### Account Creation

Provide a valid email, password, and password confirmation. The user will then be provided an api_key for use of the app.

##### Request

```http
POST /api/v1/users
```
###### Body
```json
{
  "email": "my_email@example.com",
  "password": "password",
  "password_confirmation": "password"
}
```
##### Successful Response

```http
HTTP/1.1 201 Created
```

###### Body

```json
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}

```

<details><summary>Failed Responses</summary>

##### Other

```http
HTTP/1.1 500 Internal Server Error
```

###### Body

```js
{"error": "Internal Server Error"}
```

</details>

---

#### Login

Given the `email` and `password` of an existing user should return that users api_key.

##### Request

```http
POST /api/v1/sessions
```

###### Body

```json
{
  "email": "my_email@example.com",
  "password": "password"
}
```

##### Successful Response

```http
HTTP/1.1 200 OK
```

###### Body

```json
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}

```

<details><summary>Failed Responses</summary>

##### Other

There are no other anticipated failure states. A failure for any other reason is unexpected and will follow the below format.

```http
HTTP/1.1 500 Internal Server Error
```

###### Body

```js
{"error": "Internal Server Error"}
```

</details>

---

#### Forecast

API key must be sent
If no API key or an incorrect key is provided returns 401 (Unauthorized)

##### Request

```http
GET /api/v1/forecast?location=denver,co
```
###### Body
```json
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
##### Successful Response

```http
HTTP/1.1 200 OK
```

###### Body
The Body should include 7 or more hourly and daily objects.

```json
{
  "location": "Denver, C0",
  "currently": {
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.91,
      "humidity": 0.65,
      "pressure": 1020.51,
      "windSpeed": 11.91,
      "windGust": 23.39,
      "windBearing": 294,
      "cloudCover": 1,
      "visibility": 9.12,
    },
  "hourly": {
    "summary": "Partly cloudy throughout the day and breezy this evening.",
    "icon": "wind",
    "data": [
      {
      "time": 1555016400,
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.9,
      "humidity": 0.65,
      "pressure": 1020.8,
      "windSpeed": 11.3,
      "windGust": 22.64,
      "windBearing": 293,
      "cloudCover": 1,
      "visibility": 9.02,
      },
    ]
  },
  "daily": {
    "summary": "No precipitation throughout the week, with high temperatures bottoming out at 58°F on Monday.",
    "icon": "clear-day",
    "data": [
      {
        "time": 1554966000,
        "summary": "Partly cloudy throughout the day and breezy in the evening.",
        "icon": "wind",
        "sunriseTime": 1554990063,
        "sunsetTime": 1555036947,
        "precipIntensity": 0.0001,
        "precipIntensityMax": 0.0011,
        "precipIntensityMaxTime": 1555045200,
        "precipProbability": 0.11,
        "precipType": "rain",
        "temperatureHigh": 57.07,
        "temperatureLow": 51.47,
        "humidity": 0.66,
        "pressure": 1020.5,
        "windSpeed": 10.94,
        "windGust": 33.93,
        "cloudCover": 0.38,
        "visibility": 9.51,
        "temperatureMin": 53.49,
        "temperatureMax": 58.44,
      },
    ]
  }
}
```

<details><summary>Failed Responses</summary>

##### Unable to find forecast without api_key

```http
HTTP/1.1 401 Unauthorized
```

###### Body

```js
{"message": "Unauthorized User"}
```

##### Other

There are no other anticipated failure states. A failure for any other reason is unexpected and will
follow the below format.

```http
HTTP/1.1 500 Internal Server Error
```

###### Body

```js
{"error": "Internal Server Error"}
```

</details>

---

#### Favoriting Location

API key must be sent
If no API key or an incorrect key is provided returns 401 (Unauthorized)

##### Request

```http
POST /api/v1/favorites
```
###### Body
```json
{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
##### Successful Response

```http
HTTP/1.1 200 OK
```

###### Body

```json
{
  "message": "Denver, CO has been added to your favorites"
}
```

<details><summary>Failed Responses</summary>

##### Unable to find forecast without api_key

```http
HTTP/1.1 401 Unauthorized
```

###### Body

```js
{"message": "Unauthorized User"}
```

##### Other

There are no other anticipated failure states. A failure for any other reason is unexpected and will
follow the below format.

```http
HTTP/1.1 500 Internal Server Error
```

###### Body

```js
{"error": "Internal Server Error"}
```

</details>

---

#### Favorites List

API key must be sent
If no API key or an incorrect key is provided returns 401 (Unauthorized)
Returns each favorite city plus Current weather of that city.

##### Request

```http
GET /api/v1/favorites
```
###### Body
```json
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
##### Successful Response

```http
HTTP/1.1 200 OK
```

###### Body

```json
[
  {
    "location": "Denver, CO",
    "current_weather": {
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.91,
      "humidity": 0.65,
      "pressure": 1020.51,
      "windSpeed": 11.91,
      "windGust": 23.39,
      "windBearing": 294,
      "cloudCover": 1,
      "visibility": 9.12,
    },
    "location": "Golden, CO",
    "current_weather": {
      "summary": "Sunny",
      "icon": "sunny",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 71.00,
      "humidity": 0.50,
      "pressure": 1015.10,
      "windSpeed": 10.16,
      "windGust": 13.40,
      "windBearing": 200,
      "cloudCover": 0,
      "visibility": 8.11,
    }
  }
]
```

<details><summary>Failed Responses</summary>

##### Unable to find forecast without api_key

```http
HTTP/1.1 401 Unauthorized
```

###### Body

```js
{"message": "Unauthorized User"}
```

##### Other

There are no other anticipated failure states. A failure for any other reason is unexpected and will
follow the below format.

```http
HTTP/1.1 500 Internal Server Error
```

###### Body

```js
{"error": "Internal Server Error"}
```

</details>

---

#### Favorite Removed

API key must be sent
If no API key or an incorrect key is provided returns 401 (Unauthorized)

##### Request

```http
DELETE /api/v1/favorites
```
###### Body
```json
{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
##### Successful Response

```http
HTTP/1.1 204 No Content
```

<details><summary>Failed Responses</summary>

##### Unable to find forecast without api_key

```http
HTTP/1.1 401 Unauthorized
```

###### Body

```js
{"message": "Unauthorized User"}
```

##### Other

There are no other anticipated failure states. A failure for any other reason is unexpected and will
follow the below format.

```http
HTTP/1.1 500 Internal Server Error
```

###### Body

```js
{"error": "Internal Server Error"}
```

</details>

---

