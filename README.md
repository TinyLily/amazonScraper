# Amazon Scraper
This is a nodejs backend that scrapes amazon product and product pages. If the requested product or page of reviews has already been scraped, it is returned from the database. If not, the product is scraped, and then saved.

## Getting Started

### Requirements
- Node 8.10+

### Prerequisites
- [Install MongoDB](https://docs.mongodb.com/manual/installation/) to your machine 
- Install server side 
```
cd server
npm i
```
- install client side
```
cd client
npm i
```
###Start
- Run Database
```
mongod --dbpath=./db
```
- Run Server
```
cd server
npm start
```
- Run Client
```
cd client
npm start
```
It will automatelly open a page in browser, if not go to http://localhost:3000/.

##Running the tests
I only writed unit test for backend. Therefore, go to the server floder and run 
```
npm test
```

