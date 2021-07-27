# api-deck-katana-challenge

## Run the application

> locally without docker

Make sure that you have node and npm installed =)

    npm i

After that just run

    npm run start

> if you have docker

Just run

    docker-compose up -d

To access the swagger enter on http://localhost:3000/swagger

## Testing the application

All test units and integration

    npm run test


## Rational used

For this project I din't persist it with relational database, in point of view this is a way to perform without it, just using the in-memory database.
To get the application abstraction I prefer to put all the core on the domain layer as one of the best practice over the DDD (Domain Driven Design) this is one of the best way to get rich domain that you can change all the framework and you are guaranteed that the domain business core is not anemic and tightly coupled with any framework.

## Folder Structure

This are folders that are outside of the framework

    ./src
       |- contracts // All the AJV contracts separed of the controller
       |- domains // The heart of the application
       |- exceptions // All exceptions for better control


## Interesting thing on this project

In this project I liked too much to make the domain class DecksCard.ts and the method makeCards has the  𝑂(𝑛²)  cause the suits enumeration segmentation.

## If you would like to talk about it
### Ernandes Leite de Almeida Guedes 😉 🤘

jocker.soad@gmail.com

[![Linkedin Badge](https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/ernandesguedes/)](https://www.linkedin.com/in/ernandesguedes/)

![enter image description here](https://pt.gravatar.com/userimage/165757987/cdea54560bc35b433e6402b6d923bb9b.jpeg)
