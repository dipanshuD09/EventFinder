# Project: commV1

Deployment Link: http://eventfinder.ap-south-1.elasticbeanstalk.com (Currently supports only http and not https)
(You can use this url as baseURL and test this API on Postman. For eg. http://eventfinder.ap-south-1.elasticbeanstalk.com/api/events/find?latitude=25.5169968004073&longitude=-173.22570039222800&page=1 will get all the for next 14 days.)
(Below you will find how to make requests, all endpoint details are mentioned.)

## Steps

1. npm install  (will install all the dependencies)
2. create a .env file to store the mongoDB uri
3. npm start (server will run)


## Description




1. Utilized cookies to store JWT.
2. TechStack - MongoDB Atlas for storage, Node.js, Express.js, Mongoose ODM, node-cache library.

## How I faced the challenges

1. I chose MongoDB for storage because its supports a feature known as compound indexes, using which we can significantly decrease the query fetch time.
2. I have used in-memory caching thanks to node-cache library. This prevented redundant API calls and improved the performance drastically.


# End-Points:

## 1. Fetch all the events within next 14 days with proper pagination
### Method: GET
>```
>{{baseURL}}/api/events/find
>```

### Params

| key    | value |
| -------- | ------- |
| latitude  | 25.5169968004073    |
| longitude | -173.22570039222800     |
| page    | 1    |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 2. Create Event
### Method: POST
>```
>{{baseURL}}/api/events
>```

### Body

| key    | value |
| -------- | ------- |
| event_name | Hello there    |
| city_name    | Ghaziabad    |
| latitude    | 45.754778    |
| longitude   |  76.65848746   |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________

