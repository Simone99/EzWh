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

## **Class *DAO* - method *getSKUByID***

**Criteria for method *getSKUByID*:**

- Parameters type

**Predicates for method *getSKUByID*:**

| Criteria        | Predicate                     |
|-----------------|-------------------------------|
| Parameters type | Some parameters are undefined |
|                 | All parameters are specified  |

**Boundaries**:

| Criteria        | Boundary values          |
|-----------------|--------------------------|
| Parameters type | ID === undefined  |

**Combination of predicates**:

| Parameters type              | Valid / Invalid | Description of the test case                       | Jest test case    |
|------------------------------|-----------------|----------------------------------------------------|-------------------|
| ID === undefined      | I               | Return no SKU|                   |
| All parameters are specified | V               | Return an SKU | get sku |

## **Class *DAO* - method *updateSKU***

**Criteria for method *updateSKU*:**

- Parameters type
- Weight and Quantity value
  
**Predicates for method *updateSKU*:**

| Criteria        | Predicate                     |
|-----------------|-------------------------------|
| Parameters type | Some parameters are undefined |
|                 | All parameters are specified  |
| Weight and Quantity value | weight and quantity match constraints  |
|                 | weight and quantity do not match constraints |
| Volume and Quantity value | Volume and quantity match constraints  |
|                 | Volume and quantity do not match constraints |

**Boundaries**:

| Criteria        | Boundary values          |
|-----------------|--------------------------|
| Parameters type | ID === undefined  |
| Weight and Quantity value | weight*quantity > pos.maxWeight |
| Volume and Quantity value | Volume*quantity > pos.maxVolume |

**Combination of predicates**:

| Parameters type              | Weight and Quantity value |  Volume and Quantity value | Valid / Invalid | Description of the test case                       | Jest test case    |
|-----------------------|-------|-----------------|------------------------------|----------------------|-------------------|
| ID === undefined      | - | - | I               | Update no SKU|                   |
| All parameters are specified | weight*quantity > pos.maxWeight | - | I               | Abort update an SKU | put sku |
| All parameters are specified | weight*quantity <= pos.maxWeight | volume*quantity > pos.maxVolume | I               | Abort update an SKU | put sku |
| All parameters are specified | weight*quantity <= pos.maxWeight | volume*quantity > pos.maxVolume | V               | Update an SKU | put sku |

## **Class *DAO* - method *updateSKUPosition***

**Criteria for method *updateSKUPosition*:**

- Parameters type
- Weight and Quantity value
  
**Predicates for method *updateSKUPosition*:**

| Criteria        | Predicate                     |
|-----------------|-------------------------------|
| Parameters type | Some parameters are undefined |
|                 | All parameters are specified  |
| Weight and Quantity value | weight and quantity match constraints  |
|                 | weight and quantity do not match constraints |
| Volume and Quantity value | Volume and quantity match constraints  |
|                 | Volume and quantity do not match constraints |

**Boundaries**:

| Criteria        | Boundary values          |
|-----------------|--------------------------|
| Parameters type | skuID === undefined  |
|                 | positionID === undefined  |
| Weight and Quantity value | weight*quantity > pos.maxWeight |
| Volume and Quantity value | Volume*quantity > pos.maxVolume |

**Combination of predicates**:

| Parameters type              | Weight and Quantity value |  Volume and Quantity value | Valid / Invalid | Description of the test case                       | Jest test case    |
|-----------------------|-------|-----------------|------------------------------|----------------------|-------------------|
| skuID === undefined      | - | - | I               | Update no SKU|
| positionID === undefined      | - | - | I               | Update no SKU|                   |
| All parameters are specified | weight*quantity > pos.maxWeight | - | I               | Abort update an SKU | put sku |
| All parameters are specified | weight*quantity <= pos.maxWeight | volume*quantity > pos.maxVolume | I               | Abort update an SKU | put sku |
| All parameters are specified | weight*quantity <= pos.maxWeight | volume*quantity > pos.maxVolume | V               | Update an SKU | put sku |

## **Class *DAO* - method *deleteSKU***

**Criteria for method *deleteSKU*:**

- Parameters type

**Predicates for method *deleteSKU*:**

| Criteria        | Predicate                     |
|-----------------|-------------------------------|
| Parameters type | Some parameters are undefined |
|                 | All parameters are specified  |

**Boundaries**:

| Criteria        | Boundary values          |
|-----------------|--------------------------|
| Parameters type | ID === undefined  |

**Combination of predicates**:

| Parameters type              | Valid / Invalid | Description of the test case                       | Jest test case    |
|------------------------------|-----------------|----------------------------------------------------|-------------------|
| ID === undefined      | I               | Delete no SKU|                   |
| All parameters are specified | V               | Delete an SKU | delete sku |

## **Class *DAO* - method *getSKUItemsAvailable***

**Criteria for method *getSKUItemsAvailable*:**

- Parameters type

**Predicates for method *getSKUItemsAvailable*:**

| Criteria        | Predicate                     |
|-----------------|-------------------------------|
| Parameters type | Some parameters are undefined |
|                 | All parameters are specified  |
| Available value | Available match constraints |

**Boundaries**:

| Criteria        | Boundary values          |
|-----------------|--------------------------|
| Parameters type | ID === undefined  |
| Available value | available !== 0 or 1 |
|                 | available === 0 or 1 |

**Combination of predicates**:

| Parameters type              | Available value | Valid / Invalid | Description of the test case                       | Jest test case    |
|-----------------------|-------|-----------------|----------------------------------------------------|-------------------|
| ID === undefined      | - |  I               | Return no SKUItem |                   |
| All parameters are specified | available !== 0 or 1 | I               | Return no SKUItem |  |
| All parameters are specified | available === 0 or 1 | V               | Return an SKUItem | get sku item |

## **Class *DAO* - method *getSKUItemByRFID***

**Criteria for method *getSKUItemByRFID*:**

- Parameters type

**Predicates for method *getSKUItemByRFID*:**

| Criteria        | Predicate                     |
|-----------------|-------------------------------|
| Parameters type | Some parameters are undefined |
|                 | All parameters are specified  |

**Boundaries**:

| Criteria        | Boundary values          |
|-----------------|--------------------------|
| Parameters type | RFID === undefined  |

**Combination of predicates**:

| Parameters type              | Valid / Invalid | Description of the test case                       | Jest test case    |
|------------------------------|-----------------|----------------------------------------------------|-------------------|
| RFID === undefined      | I               | Return no SKUItem |                   |
| All parameters are specified | V               | Return an SKUItem | get skuitem |

## **Class *DAO* - method *addSKUItem***

**Criteria for method *addSKUItem*:**

- Parameters type

**Predicates for method *addSKUItem*:**

| Criteria        | Predicate                     |
|-----------------|-------------------------------|
| SKUID value     |SKUID match constraints |

**Boundaries**:

| Criteria        | Boundary values          |
|-----------------|--------------------------|
| SKUID value  | SKUID === `SKU.id`  |
|              |  SKUID !== `SKU.id`  |

**Combination of predicates**:
///////

| Parameters type              | Valid / Invalid | Description of the test case                       | Jest test case    |
|------------------------------|-----------------|----------------------------------------------------|-------------------|
| RFID === undefined      | I               | Return no SKUItem |                   |
| All parameters are specified | V               | Return an SKUItem | get skuitem |

## **Class *DAO* - method *editSKUItem***

**Criteria for method *editSKUItem*:**

- Parameters type
- Old RFID value
- New RFID value
  
**Predicates for method *editSKUItem*:**

| Criteria        | Predicate                     |
|-----------------|-------------------------------|
| Parameters type | Some parameters are undefined |
|                 | All parameters are specified  |
| old RFID value  | Value match constraints       |
| new RFID value  | Value match constraints       |

**Boundaries**:

| Criteria        | Boundary values          |
|-----------------|--------------------------|
| Parameters type | ID === undefined  |
| old RFID value  | old RFID do not exist |
|                 | old RFID exists |
| new RFID value  | new RFID do not exist |
|                 | new RFID exists |

**Combination of predicates**:

| Parameters type              | old RFID value | new RFID value | Valid / Invalid | Description of the test case                       | Jest test case    |
|--------------------|-|---------|-----------------|----------------------------------------------------|-------------------|
| ID === undefined      | - | - | I               | Update no SKUItem |                   |
| All parameters are specified | not exists | - | I | Update no SKUItem |
| Parameters are specified | exists | exists | I | Update no SKU |
| All parameters are specified | exists | not exists |  V               | Delete an SKUItem | edit sku item |

## **Class *DAO* - method *deleteSKUItem***

**Criteria for method *deleteSKUItem*:**

- Parameters type

**Predicates for method *deleteSKUItem*:**

| Criteria        | Predicate                     |
|-----------------|-------------------------------|
| Parameters type | Some parameters are undefined |
|                 | All parameters are specified  |

**Boundaries**:

| Criteria        | Boundary values          |
|-----------------|--------------------------|
| Parameters type | ID === undefined  |

**Combination of predicates**:

| Parameters type              | Valid / Invalid | Description of the test case                       | Jest test case    |
|------------------------------|-----------------|----------------------------------------------------|-------------------|
| ID === undefined      | I               | Delete no SKUItem|                   |
| All parameters are specified | V               | Delete an SKUItem | delete sku item |

## **Class *DAO* - method *getReturnOrder***

**Criteria for method *getReturnOrder*:**

- Parameters type

**Predicates for method *getReturnOrder*:**

| Criteria        | Predicate                     |
|-----------------|-------------------------------|
| Parameters type | Some parameters are undefined |
|                 | All parameters are specified  |

**Boundaries**:

| Criteria        | Boundary values          |
|-----------------|--------------------------|
| Parameters type | ID === undefined  |

**Combination of predicates**:

| Parameters type              | Valid / Invalid | Description of the test case                       | Jest test case    |
|------------------------------|-----------------|----------------------------------------------------|-------------------|
| ID === undefined      | I               | Return no ReturnOrder|                   |
| All parameters are specified | V               | Return a returnOrder | get return order |

## **Class *DAO* - method *addReturnOrder***

**Criteria for method *addReturnOrder*:**

- Parameters type

**Predicates for method *addReturnOrder*:**

| Criteria        | Predicate                     |
|-----------------|-------------------------------|
| Parameters type | Some parameters are undefined |
|                 | All parameters are specified  |

**Boundaries**:

| Criteria        | Boundary values          |
|-----------------|--------------------------|
| Parameters type | RestockOrderID === undefined  |
|                 | products === undefined |
|                 | ReturnDate === undefined |

**Combination of predicates**:

| Parameters type              | Valid / Invalid | Description of the test case                       | Jest test case    |
|------------------------------|-----------------|----------------------------------------------------|-------------------|
| RestockOrderID === undefined      | I               |Add no ReturnOrder|                   |
| products === undefined      | I               |Add no ReturnOrder|                   |
| ReturnDate === undefined      | I               |Add no ReturnOrder|                   |
| All parameters are specified | V               | Add ReturnOrder| add return order |

## **Class *DAO* - method *deleteReturnOrder***

**Criteria for method *deleteReturnOrder*:**

- Parameters type

**Predicates for method *deleteReturnOrder*:**

| Criteria        | Predicate                     |
|-----------------|-------------------------------|
| Parameters type | Some parameters are undefined |
|                 | All parameters are specified  |

**Boundaries**:

| Criteria        | Boundary values          |
|-----------------|--------------------------|
| Parameters type | ID === undefined  |

**Combination of predicates**:

| Parameters type              | Valid / Invalid | Description of the test case                       | Jest test case    |
|------------------------------|-----------------|----------------------------------------------------|-------------------|
| ID === undefined      | I               | Delete no ReturnOrder|                   |
| All parameters are specified | V               | Delete a ReturnORder | delete return order |

## **Class *DAO* - method *addTestDescriptor***

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

## **Class *DAO* - method *editRestockOrderState***

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

## **Class *DAO* - method *editRestockOrderSkuItems***

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

## **Class *DAO* - method *editRestockOrderTransportNote***

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

## **Class *DAO* - method *getInternalOrder***

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

## **Class *DAO* - method *addInternalOrder***

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

## **Class *DAO* - method *editInternalOrder***

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

## **Class *DAO* - method *editPositionIDOnly***

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

## <u>**Class UserDAO**</u>

### <u>METHOD</u> <i>UserDAO.getUserByTypeAndUsername(type, username);</i>

- **Criteria**
  - Parameters type
- **Predicates**

| Criteria        | Predicate                       |
|-----------------|---------------------------------|
| Parameters type | type === '  '                     |
|                 | type === undefined              |
|                 | type === 'invalid type'         |
|                 | type === 'valid type'         |
|                 | username === '  '                 |
|                 | username === undefined          |
|                 | username === 'invalid username' |
|                 | username === 'valid username' |

- **Equivalence classes and tests**

|  username |    type   | valid/invalid |          test case         |
|:---------:|:---------:|:-------------:|:--------------------------:|
| undefined | undefined |       I       | (B) : get User null |
|  invalid  | undefined |       I       |                            |
|     ''    | undefined |       I       |                            |
|   valid   | undefined |       I       |                            |
|   valid   |   valid   |       I       |                            |
|   valid   |     ''    |       I       |                            |
|   valid   |   valid   |       V       |          get User          |

### <u>METHOD</u> <i>UserDAO.InsertUser(user);</i>

- **Criteria**
  - Parameters type
- **Predicates**

| Criteria        | Predicate          |
|-----------------|--------------------|
| Parameters type | user === {}        |
|                 | user === undefined |
|                 | user === 'valid' |

- **Equivalence classes and tests**

|    User   | valid/invalid |      test case      |
|:---------:|:-------------:|:-------------------:|
|     {}    |       I       |                     |
| undefined |       I       |                     |
|   valid   |       V       | check inserted user |

### <u>METHOD</u> <i>UserDAO.editUser(username, oldType, newType);</i>

- **Criteria**
  - Parameters type
- **Predicates**

| Criteria        | Predicate                       |
|-----------------|---------------------------------|
| Parameters type | username === undefined          |
|                 | username === 'invalid'          |
|                 | username === 'valid'            |
|                 | oldType === undefined           |
|                 | oldType === 'invalid type'      |
|                 | oldType === 'valid type'        |
|                 | newType === undefined           |
|                 | newType === 'invalid type'      |
|                 | newType === 'valid type'        |

- **Equivalence classes and tests**

|  username |  oldType  |  newtype  | valid/invalid |     test case    |
|:---------:|:---------:|:---------:|:-------------:|:----------------:|
| undefined | undefined | undefined |       I       |                  |
|  invalid  | undefined | undefined |       I       |                  |
|   valid   | undefined | undefined |       I       |                  |
|   valid   |  invalid  | undefined |       I       |                  |
|   valid   |   valid   | undefined |       I       |                  |
|   valid   |   valid   |  invalid  |       I       |                  |
|   valid   |   valid   |   valid   |       v       | change user type |

### <u>METHOD</u> <i>UserDAO.deleteUser(username, type);</i>

- **Criteria**
  - Parameters type
- **Predicates**

| Criteria        | Predicate                       |
|-----------------|---------------------------------|
| Parameters type | type === '  '                   |
|                 | type === undefined              |
|                 | type === 'invalid type'         |
|                 | type === 'valid'                |
|                 | username === '  '               |
|                 | username === undefined          |
|                 | username === 'invalid username' |
|                 | username === 'valid username'   |

- **Equivalence classes and tests**

|  username |    type   | valid/invalid |  test case  |
|:---------:|:---------:|:-------------:|:-----------:|
| undefined | undefined |       I       |             |
|  invalid  | undefined |       I       |             |
|     ''    | undefined |       I       |             |
|   valid   | undefined |       I       |             |
|   valid   |   valid   |       V       | delete user |

## <u>**Class TestResultDAO**</u>

### <u>METHOD</u> <i>TestResultDAO.getTestResultByRFID(RFID);</i>

- **Criteria**
  - Parameters type
- **Predicates**

| Criteria        | Predicate               |
|-----------------|-------------------------|
| Parameters type | RFID === undefined      |
|                 | RFID === 'invaild RFID' |
|                 | RFID === 'valid' |

- **Equivalence classes and tests**

|    RFID   | valid/invalid |              test case             |
|:---------:|:-------------:|:----------------------------------:|
| undefined |       I       |                                    |
|  invalid  |       I       |                                    |
|   valid   |       V       | get all test results of an SKUItem |

### <u>METHOD</u> <i>TestResultDAO.getTestResultBYRFIDAndID(RFID, ID);</i>

- **Criteria**
  - Parameters type
- **Predicates**

| Criteria        | Predicate               |
|-----------------|-------------------------|
| Parameters type | RFID === undefined      |
|                 | RFID === 'invaild RFID' |
|                 | RFID === 'valid'        |
|                 | ID === undefined        |
|                 | ID === invalidID        |
|                 | ID === valid            |

- **Equivalence classes and tests**

|    RFID   |     ID    | valid/invalid |                     test case                    |
|:---------:|:---------:|:-------------:|:------------------------------------------------:|
| undefined | undefined |       I       |                                                  |
|  Invalid  | undefined |       I       |                                                  |
|   valid   | undefined |       I       |                                                  |
|   valid   |  invalid  |       I       |                                                  |
|   valid   |   valid   |       V       | get a specific test result of a specific SKUItem |
|           |           |               |                                                  |
|           |           |               |                                                  |

### <u>METHOD</u> <i>TestResultDAO.addTestResult(rfid, idTestDescriptor, Date, Result);</i>

- **Criteria**
  - Parameters type
- **Predicates**

| Criteria        | Predicate                      |
|-----------------|--------------------------------|
| Parameters type | RFID === undefined             |
|                 | RFID === 'invaild RFID'        |
|                 | RFID === 'valid'               |
|                 | idTestDescriptor === undefined |
|                 | idTestDescriptor === invalid   |
|                 | idTestDescriptor === valid     |
|                 | Date === ''                    |
|                 | Date === 'valid'               |
|                 | Result === 'wrong input'       |
|                 | Result === true                |
|                 | Result === false               |
|                 | Result === omitted             |

- **Equivalence classes and tests**

|    RFID   | idTestDescriptor |  Date |  Result | valid/invalid |        test case        |
|:---------:|:----------------:|:-----:|:-------:|:-------------:|:-----------------------:|
| undefined |     undefined    |   ''  | omitted |       I       |                         |
|  Invalid  |     undefined    |   ''  | omitted |       I       |                         |
|   valid   |     undefined    |   ''  | omitted |       I       |                         |
|   valid   |      invalid     |   ''  | omitted |       I       |                         |
|   valid   |       valid      |   ''  | omitted |       I       |                         |
|   valid   |       valid      |   ''  |   true  |       I       |                         |
|   valid   |       valid      |   ''  |  false  |       I       |                         |
|   valid   |       valid      | valid | omitted |       I       |                         |
|   valid   |       valid      | valid |   true  |       V       | Add a false test result |
|   valid   |       valid      | valid |  false  |       V       |  Add a true test result |

### <u>METHOD</u> <i>TestResultDAO.addTestResultxSKUitem(rfid, idTestResult);</i>

- **Criteria**
  - Parameters type
- **Predicates**

| Criteria        | Predicate                   |
|-----------------|-----------------------------|
| Parameters type | idTestResult === validId    |
|                 | idTestResult === undefined  |
|                 | idTestResult === invalid Id |
|                 | rfid === validRFID          |
|                 | rfid === undefined          |
|                 | rfid === invalidRFID        |

- **Equivalence classes and tests**

|    RFID   | idTestDescriptor | valid/invalid |                    test case                  |
|:---------:|:----------------:|:-------------:|:----------------------------------------------:|
| undefined |     undefined    |       I       |                                                |
|  Invalid  |     undefined    |       I       |                                                |
|   valid   |     undefined    |       I       |                                                |
|   valid   |      invalid     |       I       |                                                |
|   valid   |       valid      |       V       | Add a false test result, Add a true test result|

### <u>METHOD</u> <i>TestResultDAO.editTestResult(id, newIdTestDescriptor, newDate, newResult);</i>

- **Criteria**
  - Parameters type
- **Predicates**

| Criteria        | Predicate                         |
|-----------------|-----------------------------------|
| Parameters type | id === validId                    |
|                 | id === undefined                  |
|                 | id === invalidId                  |
|                 | newIdTestDescriptor === valid     |
|                 | newIdTestDescriptor === undefined |
|                 | newIdTestDescriptor === invalid   |
|                 | newDate === valid                 |
|                 | newDate === omitted               |
|                 | newResult === true                |
|                 | newResult === false               |
|                 | newResult === omitted             |

- **Equivalence classes and tests**

|     id    | newIdTestDescriptor | newDate | newResult | valid/invalid |                 test case                 |
|:---------:|:-------------------:|:-------:|:---------:|:-------------:|:-----------------------------------------:|
| undefined |      undefined      | omitted |  omitted  |       I       |                                           |
|  invalid  |      undefined      | omitted |  omitted  |       I       |                                           |
|   valid   |      undefined      | omitted |  omitted  |       I       |                                           |
|   valid   |       invalid       | omitted |  omitted  |       I       |                                           |
|   valid   |        valid        | omitted |  omitted  |       I       |                                           |
|   valid   |        valid        | omitted |    true   |       I       |                                           |
|   valid   |        valid        | omitted |   false   |       I       |                                           |
|   valid   |        valid        |  valid  |  omitted  |       I       |                                           |
|   valid   |        valid        |  valid  |    true   |       V       |                                           |
|   valid   |        valid        |  valid  |   false   |       V       | Edit a test result for a specific SKUItem |

### <u>METHOD</u> <i>TestResultDAO.deleteTestResult(id);</i>

- **Criteria**
  - Parameters type
- **Predicates**

| Criteria        | Predicate        |
|-----------------|------------------|
| Parameters type | id === validId   |
|                 | id === undefined |
|                 | id === invalidId |

- **Equivalence classes and tests**

|     id    | valid/invalid |              test case              |
|:---------:|:-------------:|:-----------------------------------:|
| undefined |       I       |                                     |
|  invalid  |       I       |                                     |
|   valid   |       V       | Delete a test result by rfid and id |

### <u>METHOD</u> <i>TestResultDAO.deleteTestResultxSKUitem(SKUId, id);</i>

- **Criteria**
  - Parameters type
- **Predicates**

| Criteria        | Predicate           |
|-----------------|---------------------|
| Parameters type | id === validId      |
|                 | id === undefined    |
|                 | id === invalidId    |
|                 | SKUId === valid     |
|                 | SKUId === undefined |
|                 | SKUId === invalid   |

- **Equivalence classes and tests**

|   SKUId   |     id    | valid/invalid |              test case              |
|:---------:|:---------:|:-------------:|:-----------------------------------:|
| undefined | undefined |       I       |                                     |
|  invalid  | undefined |       I       |                                     |
|   valid   | undefined |       I       |                                     |
|   valid   |  invalid  |       I       |                                     |
|   valid   |   valid   |       V       | Delete a test result by rfid and id |

## <u>**Class ItemDAO**</u>

### <u>METHOD</u> <i>ItemDAO.addItem(item);</i>

- **Criteria**
  - Parameters type
- **Predicates**

| Criteria        | Predicate          |
|-----------------|--------------------|
| Parameters type | item === {}        |
|                 | item === valid     |
|                 | item === undefined |
|                 | item === invalid   |
|                 | item === duplicate |

- **Equivalence classes and tests**

|    Item   | valid/invalid |      test case     |
|:---------:|:-------------:|:------------------:|
|     {}    |       I       |                    |
| undefined |       I       |                    |
|  invalid  |       I       |                    |
|   valid   |       V       |      add item      |
| duplicate |       V       | add duplicate item |

### <u>METHOD</u> <i>ItemDAO.getItemById(id);</i>

- **Criteria**
  - Parameters type
- **Predicates**

| Criteria        | Predicate           |
|-----------------|---------------------|
| Parameters type | id === valid        |
|                 | id === undefined    |
|                 | id === invalid      |

- **Equivalence classes and tests**

|     id    | valid/invalid |     test case                 |
|:---------:|:-------------:|:-----------------------------:|
| undefined |       I       |                               |
|  invalid  |       I       | get a non existing item by id |
|   valid   |       V       | get an item by id             |

### <u>METHOD</u> <i>ItemDAO.getItemBySupplierAndSKUId(supplierId, SKUId);</i>

- **Criteria**
  - Parameters type
- **Predicates**

| Criteria        | Predicate                |
|-----------------|--------------------------|
| Parameters type | SKUID === valid          |
|                 | SKUID === undefined      |
|                 | SKUID === invalid        |
|                 | supplierId === valid     |
|                 | supplierId === undefined |
|                 | supplierId === invalid   |

- **Equivalence classes and tests**

| SKUId     | supplierId | valid/invalid | test case |
|-----------|------------|---------------|-----------|
| undefined | undefined  | I             |           |
| invalid   | undefined  | I             |           |
| valid     | undefined  | I             |           |
| valid     | invalid    | I             |           |
| valid     | valid      | V             |           |

### <u>METHOD</u> <i>ItemDAO.editItem(id, newDescription, newPrice);</i>

- **Criteria**
  - Parameters type
- **Predicates**

| Criteria        | Predicate                    |
|-----------------|------------------------------|
| Parameters type | id === valid                 |
|                 | id === undefined             |
|                 | id === invalid               |
|                 | newDescription === ' '       |
|                 | newDescription === undefined |
|                 | newDescription === valid     |
|                 | newPrice === 0               |
|                 | newPrice < 0                 |
|                 | newPrice > 0                 |

- **Equivalence classes and tests**

|     id    | newDescription | newPrice | valid/invalid |                test case                |
|:---------:|:--------------:|:--------:|:-------------:|:---------------------------------------:|
| undefined |    undefined   |     0    |       I       |                                         |
|  invalid  |    undefined   |     0    |       I       |        Edit a non existing item         |
|   valid   |    undefined   |     0    |       I       |                                         |
|   valid   |    undefined   |    <0    |       I       |                                         |
|   valid   |    undefined   |    >0    |       I       |                                         |
|   valid   |       ''       |     0    |       I       |                                         |
|   valid   |       ''       |    <0    |       I       |                                         |
|   valid   |       ''       |    >0    |       V       | Edit an existing item empty description |
|   valid   |      valid     |     0    |       I       |                                         |
|   valid   |      valid     |    <0    |       I       |                                         |
|   valid   |      valid     |    >0    |       V       |          Edit an existing item          |

### <u>METHOD</u> : <i>ItemDAO.deleteItem(id);</i></i>

- **Criteria**
  - Parameters type
- **Predicates**

| Criteria        | Predicate                    |
|-----------------|------------------------------|
| Parameters type | id === valid                 |
|                 | id === undefined             |
|                 | id === invalid               |

- **Equivalence classes and tests**

|     id    | valid/invalid |    test case   |
|:---------:|:-------------:|:--------------:|
| undefined |       I       |                |
|  invalid  |       I       |                |
|   valid   |       V       | delete an item |

# White Box Unit Tests

### Test cases definition

    <Report here all the created Jest test cases, and the units/classes under test >
    <For traceability write the class and method name that contains the test case>

| Unit name | Jest test case |
|--|--|
|SKU|get sku|
|   |get skus|
|   |modify sku|
|   |delete sku|
|SKUItem|get sku item|
|       |get sku items|
|       |get available sku items|
|       |modify sku item|
|       |delete sku item|
|ReturnOrder|get return orders|
|           |get return order|
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
| Item    |      add item                                       |
|         | get an item by id |
|         | add duplicate item |
|         | get a non existing item by id |
|         | get all items |
|         | Edit an existing item |
|         | Control content after editing an existing item |
|         | Edit a non existing item |
|         | delete an item |
|         | check existance of deleted item |
| Test result | Add a test result |
|             | get all test results of an SKUItem |
|             | get a specific test result of a specific SKUItem |
|             | Edit a test result for a specific SKUItem |
|             | Delete a test result by id |
| User    | get User |
|         | get User null |
|         | get Users |
|         | get suppliers |
|         | check inserted user |
|         | change user type |
|         | delete user |

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
