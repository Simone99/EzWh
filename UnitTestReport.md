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

### **Class *DAO* - method *addTestDescriptor***

**Criteria for method *addTestDescriptor*:**

 - Parameters type

**Predicates for method *addTestDescriptor*:**

| Criteria        | Predicate                     |
|-----------------|-------------------------------|
| Parameters type | Some parameters are undefined |
|                 | All parameters are specified  |

**Boundaries**:

| Criteria        | Boundary values          |
|-----------------|--------------------------|
| Parameters type | SKUID === undefined |


**Combination of predicates**:


| Parameters type              | Valid / Invalid | Description of the test case                       | Jest test case    |
|------------------------------|-----------------|----------------------------------------------------|-------------------|
| SKUID === undefined     | I               | Create a test descriptor with no SKUID         |                   |
| All parameters are specified | V               | Create a test descriptor with all correct parameters | get test descriptor |


### **Class *DAO* - method *editRestockOrderState***

**Criteria for method *editRestockOrderState*:**

 - Parameters type

**Boundaries**:

| Criteria        | Boundary values          |
|-----------------|--------------------------|
| Parameters type | ResOrderID === undefined |
|                 | newState === undefined   |


**Combination of predicates**:


| Parameters type              | Valid / Invalid | Description of the test case                       | Jest test case    |
|------------------------------|-----------------|----------------------------------------------------|-------------------|
| ResOrderID === undefined      | I               | Edit a restock order with no ID          |                   |
| newState === undefined       | I               | Edit a restock order with no state            |  |
| All parameters are specified | V               | Edit a restock order with all correct parameters | change restock order state |

### **Class *DAO* - method *editRestockOrderSkuItems***

**Criteria for method *editRestockOrderSkuItems*:**

 - Parameters type

**Predicates for method *editRestockOrderSkuItems*:**

| Criteria        | Predicate                     |
|-----------------|-------------------------------|
| Parameters type | Some parameters are undefined |
|                 | All parameters are specified  |

**Boundaries**:

| Criteria        | Boundary values          |
|-----------------|--------------------------|
| Parameters type | restockOrderID === undefined  |
|                 | SKUItemsList === undefined   |


**Combination of predicates**:


| Parameters type              | Valid / Invalid | Description of the test case                       | Jest test case    |
|------------------------------|-----------------|----------------------------------------------------|-------------------|
| restockOrderID === undefined      | I               | Edit a restock order with no ID          |                   |
| SKUItemsList === undefined       | I               | Edit a restock order with no sku items            |  |
| All parameters are specified | V               | Edit a restock order with all correct parameters | set SKUItems to restock order |

### **Class *DAO* - method *editRestockOrderTransportNote***

**Criteria for method *editRestockOrderTransportNote*:**

 - Parameters type

**Predicates for method *editRestockOrderTransportNote*:**

| Criteria        | Predicate                     |
|-----------------|-------------------------------|
| Parameters type | Some parameters are undefined |
|                 | All parameters are specified  |

**Boundaries**:

| Criteria        | Boundary values          |
|-----------------|--------------------------|
| Parameters type | ResOrderID === undefined  |
|                 | tNote === undefined   |


**Combination of predicates**:


| Parameters type              | Valid / Invalid | Description of the test case                       | Jest test case    |
|------------------------------|-----------------|----------------------------------------------------|-------------------|
| ResOrderID === undefined      | I               | Edit a restock order with no ID          |                   |
| tNote === undefined       | I               | Edit a restock order with no transport note            |  |
| All parameters are specified | V               | Edit a restock order with all correct parameters | set SKUItems to restock order |

### **Class *DAO* - method *getInternalOrder***

**Criteria for method *getInternalOrder*:**

 - Parameters type

**Predicates for method *getInternalOrder*:**

| Criteria        | Predicate                     |
|-----------------|-------------------------------|
| Parameters type | Some parameters are undefined |
|                 | All parameters are specified  |

**Boundaries**:

| Criteria        | Boundary values          |
|-----------------|--------------------------|
| Parameters type | internalOrderID === undefined  |


**Combination of predicates**:


| Parameters type              | Valid / Invalid | Description of the test case                       | Jest test case    |
|------------------------------|-----------------|----------------------------------------------------|-------------------|
| internalOrderID === undefined      | I               | Retrieving an internal order with no ID          |                   |
| All parameters are specified | V               | Retrieving an internal order with all correct parameters | editing internal order |

### **Class *DAO* - method *addInternalOrder***

**Criteria for method *addInternalOrder*:**

 - Parameters type

**Predicates for method *addInternalOrder*:**

| Criteria        | Predicate                     |
|-----------------|-------------------------------|
| Parameters type | Some parameters are undefined |
|                 | All parameters are specified  |

**Boundaries**:

| Criteria        | Boundary values          |
|-----------------|--------------------------|
| Parameters type | issueDate === undefined  |
|                 | internalOrderItemList === undefined   |
|                 | customerId === undefined   |


**Combination of predicates**:


| Parameters type              | Valid / Invalid | Description of the test case                       | Jest test case    |
|------------------------------|-----------------|----------------------------------------------------|-------------------|
| issueDate === undefined      | I               | Create an internal order with no issueDate          |                   |
| internalOrderItemList === undefined       | I               | Create an internal order with no internalOrderItemList            |  |
| customerId === undefined       | I               | Create an internal order with no customerId            |  |
| All parameters are specified | V               | Create an internal order with all correct parameters | add internal order |

### **Class *DAO* - method *editInternalOrder***

**Criteria for method *editInternalOrder*:**

 - Parameters type

**Predicates for method *editInternalOrder*:**

| Criteria        | Predicate                     |
|-----------------|-------------------------------|
| Parameters type | Some parameters are undefined |
|                 | All parameters are specified  |

**Boundaries**:

| Criteria        | Boundary values          |
|-----------------|--------------------------|
| Parameters type | internalOrderID === undefined  |
|                 | newState === undefined   |
|                 | products === undefined   |



**Combination of predicates**:


| Parameters type              | Valid / Invalid | Description of the test case                       | Jest test case    |
|------------------------------|-----------------|----------------------------------------------------|-------------------|
| internalOrderID === undefined      | I               | Edit an internal order with no ID          |                   |
| newState === undefined       | I               | Edit an internal order with no state            |  |
| products === undefined       | I               | Edit an internal order with no products            |  |
| All parameters are specified | V               | Edit a restock order with all correct parameters | editing internal order |


### **Class *DAO* - method *editPositionIDOnly***

**Criteria for method *editPositionIDOnly*:**

 - Parameters type

**Predicates for method *editPositionIDOnly*:**

| Criteria        | Predicate                     |
|-----------------|-------------------------------|
| Parameters type | Some parameters are undefined |
|                 | All parameters are specified  |

**Boundaries**:

| Criteria        | Boundary values          |
|-----------------|--------------------------|
| Parameters type | oldPositionID === undefined |


**Combination of predicates**:


| Parameters type              | Valid / Invalid | Description of the test case                       | Jest test case    |
|------------------------------|-----------------|----------------------------------------------------|-------------------|
| oldPositionID === undefined     | I               |          |                   |
| All parameters are specified | V               | Updates the position ID specified with the new one | get position |


# White Box Unit Tests

### Test cases definition

    <Report here all the created Jest test cases, and the units/classes under test >
    <For traceability write the class and method name that contains the test case>

| Unit name | Jest test case                |
|-----------|-------------------------------|
| DAO       | get restock order             |
|           | get restock order issued      |
|           | change restock order state    |
|           | set SKUItems to restock order |
|           | add restock order             |
|           | get internal orders           |
|           | get internal orders issued    |
|           | get internal orders accepted  |
|           | editing internal order        |
|           | add internal order            |
|           |                               |
|           |                               |
|           |                               |
|           |                               |

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



