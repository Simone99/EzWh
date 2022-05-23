# Unit Testing Report

Date:

Version:

# Contents

- [Black Box Unit Tests](#black-box-unit-tests)




- [White Box Unit Tests](#white-box-unit-tests)


# Black Box Unit Tests

    <Define here criteria, predicates and the combination of predicates for each function of each class.
    Define test cases to cover all equivalence classes and boundary conditions.
    In the table, report the description of the black box test case and (traceability) the correspondence with the Jest test case writing the 
    class and method name that contains the test case>
    <Jest tests  must be in code/server/unit_test  >

 ### **Class *DAO* - method *addRestockOrder***

**Criteria for method *addRestockOrder*:**

 - Parameters type

**Predicates for method *addRestockOrder*:**

| Criteria        | Predicate                     |
|-----------------|-------------------------------|
| Parameters type | Some parameters are undefined |
|                 | All parameters are specified  |

**Boundaries**:

| Criteria        | Boundary values          |
|-----------------|--------------------------|
| Parameters type | issueDate === undefined  |
|                 | products === undefined   |
|                 | supplierId === undefined |


**Combination of predicates**:


| Parameters type              | Valid / Invalid | Description of the test case                       | Jest test case    |
|------------------------------|-----------------|----------------------------------------------------|-------------------|
| issueDate === undefined      | I               | Create a restock order with no issue date          |                   |
| products === undefined       | I               | Create a restock order with no products            | add restock order |
| supplierId === undefined     | I               | Create a restock order with no supplier id         |                   |
| All parameters are specified | V               | Create a restock order with all correct parameters | get restock order |

# White Box Unit Tests

### Test cases definition
    
    
    <Report here all the created Jest test cases, and the units/classes under test >
    <For traceability write the class and method name that contains the test case>


| Unit name | Jest test case |
|--|--|
|||
|||
||||

### Code coverage report

    <Add here the screenshot report of the statement and branch coverage obtained using
    the coverage tool. >


### Loop coverage analysis

    <Identify significant loops in the units and reports the test cases
    developed to cover zero, one or multiple iterations >

|Unit name | Loop rows | Number of iterations | Jest test case |
|---|---|---|---|
|||||
|||||
||||||



