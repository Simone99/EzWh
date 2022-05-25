# Integration and API Test Report

Date:

Version:

# Contents

- [Dependency graph](#dependency graph)

- [Integration approach](#integration)

- [Tests](#tests)

- [Scenarios](#scenarios)

- [Coverage of scenarios and FR](#scenario-coverage)
- [Coverage of non-functional requirements](#nfr-coverage)



# Dependency graph 

![Create SKU](./code/server/dependency_graph.png "Create SKU")

# Integration approach

    <Write here the integration sequence you adopted, in general terms (top down, bottom up, mixed) and as sequence
    (ex: step1: class A, step 2: class A+B, step 3: class A+B+C, etc)> 
    <Some steps may  correspond to unit testing (ex step1 in ex above), presented in other document UnitTestReport.md>
    <One step will  correspond to API testing>

    The approach we decided to follow is the bottom up one. Using unit tests we checked that our base units work properly. Then we moved up using no mock on the database, instead, before each test, we initialized the correct db state.
    - First step: test DAO methods (unit tests)
    - Second step: run API testing

#  Integration Tests

   <define below a table for each integration step. For each integration step report the group of classes under test, and the names of
     Jest test cases applied to them, and the mock ups used, if any>
     
          
      Jest test cases should be here code/server/unit_test

## Step 1
| Classes         | mock up used |        Jest test cases        |
|-----------------|--------------|:-----------------------------:|
| RestockOrder    | -            |       get restock order       |
|                 | -            |    get restock order issued   |
|                 | -            |   change restock order state  |
|                 | -            | set SKUItems to restock order |
|                 | -            |       add restock order       |
| InternalOrder   | -            |      get internal orders      |
|                 | -            |   get internal orders issued  |
|                 | -            |  get internal orders accepted |
|                 | -            |     editing internal order    |
|                 | -            |       add internal order      |
| Position        | -            |         get positions         |
|                 | -            |         edit position         |
|                 | -            |     edit position ID only     |
|                 | -            |        delete position        |
| Test Descriptor | -            |      get test descriptors     |
|                 | -            |      get test descriptor      |
|                 | -            |      edit test descriptor     |
|                 | -            |     delete test descriptor    |
| Item    |       -      | add item                                       |
|         |       -      | add duplicate item                             |
|         |       -      | get an item by id                              |
|         |       -      | get a non existing item by id                  |
|         |       -      | get all items                                  |
|         |       -      | Edit an existing item                          |
|         |       -      | Control content after editing an existing item |
|         |       -      | Edit a non existing item                       |
|         |       -      | delete an item                                 |
|         |       -      | check existance of deleted item                |
| Test result |       -      | Add a test result                                |
|             |       -      | get all test results of an SKUItem               |
|             |       -      | get a specific test result of a specific SKUItem |
|             |       -      | Edit a test result for a specific SKUItem        |
|             |       -      | Delete a test result by id                       |
| User    |       -      | get User            |
|         |       -      | get User null       |
|         |       -      | get Users           |
|         |       -      | get suppliers       |
|         |       -      | check inserted user |
|         |       -      | change user type    |
|         |       -      | delete user         |

# API testing - Scenarios


<If needed, define here additional scenarios for the application. Scenarios should be named
 referring the UC in the OfficialRequirements that they detail>

## Scenario UCx.y

| Scenario |  name |
| ------------- |:-------------:| 
|  Precondition     |  |
|  Post condition     |   |
| Step#        | Description  |
|  1     |  ... |  
|  2     |  ... |



# Coverage of Scenarios and FR


<Report in the following table the coverage of  scenarios (from official requirements and from above) vs FR. 
Report also for each of the scenarios the (one or more) API Mocha tests that cover it. >  Mocha test cases should be here code/server/test

| Scenario ID | Functional Requirements covered | Mocha  Test(s)         |
|-------------|---------------------------------|------------------------|
| UC2.2       | FR3.1.1                         | Testing UC 2.2         |
| UC2.3-UC2.4 | FR3.1.1                         | Testing UC 2.3 and 2.4 |
| UC2.5       | FR3.1.2                         | Testing UC 2.5         |
| UC5.1       | FR5.8                           | Testing UC5.1          |
| UC5.2       | FR5.8.2                         | Testing UC5.2          |
| UC9         | FR6.6                           | Testing UC9            |
| UC10        | FR6.8                           | Testing UC10           |
| UC12.1      | -                               | Testing UC 12.1        |
| UC12.2      | -                               | Testing UC 12.2        |
| UC12.3      | -                               | Testing UC 12.3        |

# Coverage of Non Functional Requirements


<Report in the following table the coverage of the Non Functional Requirements of the application - only those that can be tested with automated testing frameworks.>


### 

| Non Functional Requirement | Test name |
| -------------------------- | --------- |
|                            |           |

