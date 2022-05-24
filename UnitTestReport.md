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


 ### **Class *DAO* - method *getSKUByID***

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

### **Class *DAO* - method *updateSKU***

**Criteria for method *updateSKU*:**

 - Parameters type
-  Weight and Quantity value
  

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


### **Class *DAO* - method *updateSKUPosition***

**Criteria for method *updateSKUPosition*:**

 - Parameters type
-  Weight and Quantity value
  

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

### **Class *DAO* - method *deleteSKU***

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

### **Class *DAO* - method *getSKUItemsAvailable***

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

### **Class *DAO* - method *getSKUItemByRFID***

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

### **Class *DAO* - method *addSKUItem***

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



### **Class *DAO* - method *editSKUItem***

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

### **Class *DAO* - method *deleteSKUItem***

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



### **Class *DAO* - method *getReturnOrder***

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

### **Class *DAO* - method *addReturnOrder***

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

### **Class *DAO* - method *deleteReturnOrder***

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
|           ||

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



