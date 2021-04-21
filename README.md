# Goldies Gym 

## Problem Statement

Goldies Gym has started business in 2018 as a specialized fitness center. It started operations from a 200 sqm floor area in the suburbs of Boston. Because of its uniquely designed fitness regimes, it was able to quickly raise memberships and currently operates with five centers and aggressively planning to open multiple centers across the country.
Goldies Gym wants to digitize its operation in a phased manner. 

The problem to solve for Goldies Gym is to garner a larger membership base and create a brand in the current competitive Health and Fitness domain.


## Proposed Solution

In the first phase, Goldies Gym needs a solution for their marketing campaign. 
The solution should help to reach out to users over the web and gather enquiry to its offered programs. 


## High Level Requirements

The system should allow integration with other fitness apps and portals as well as with their own Single Page Application (SPA). Therefore, the system should be based on the standard REST 2.0 API. 

As in the current phase, the business requirements are still abstract, the system is predicted to be highly evolvable based on their business requirements. Therefore, the system should be built on the Microservices architecture.

The Gym Admin team at Goldies Gym should be able to add the fitness programs they offer, remove any old program details from the portal or even update the program details through the system.

Third Party fitness portals, with whom Goldies gym has tied up, should be able to see the list of fitness programs available, select the details of a particular program and share their interest for it so that the marketing team can get in touch with them to resolve their queries and proceed with the payment.

Users who visits Goldies Gym Web application, should be able to register themselves and login to the application, find the current offerings, view the details of it, and finally share their interest for the same.  

The Marketing team should be able to see the list of users who have shared their interest for the fitness programs, call them back and close the ticket with their remarks.


### There would be three roles in this application. They would be allowed to perform activities based on their role: 
  - **Customer**: View details of the fitness programs and show interest by providing contact details
  - **Marketing Team**: View details of the fitness programs, customers who has shown interest, working on these tickets, and close the same
  - **GymAdmin**: Manage fitness programs

## Microservices

- **UserService**: Responsible for managing user accounts.
- **GymService**: Responsible for storing, retrieving, and deleting fitness programs as well as see the details of the same.
- **EnquiryService**: Responsible for storing details of customers who have shown interest for the marketing team to act, add their remarks on it, and close the tickets.

## Tech Stack

- loopback
- Database


## Flow of Modules

- Building the UserService
  1. Building a service to facilitate user registration and authentication using JWT token. This service uses PostGreSql as the persistent storage.

- Building the GymService
  1. Refactoring an existing express monolith to additionally support REST 2.0 API to manage fitness programs stored in PostGreSql database

- Building the EnquiryService
  1. Building a server in expressjs to facilitate CRUD operation over customer details of customers who has shown interest, stored in PostGreSql database
