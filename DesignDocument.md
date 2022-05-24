# Design Document 


Authors: 

Date:

Version:


# Contents

- [High level design](#package-diagram)
- [Low level design](#class-diagram)
- [Verification traceability matrix](#verification-traceability-matrix)
- [Verification sequence diagrams](#verification-sequence-diagrams)

# Instructions

The design must satisfy the Official Requirements document, notably functional and non functional requirements, and be consistent with the APIs

# High level design 

The application can be developed in different ways using different architectural styles. Two of them are in particular suitable for EZWH: client-server and layered. Both of them are almost equivalent, but they highlight different features; the first is more related to where the application is deployed, while the second one is related to the software itself.
The server has two components: the frontend, which is developed with web technologies (JavaScript, HTML, Css) and is in charge of collecting user inputs to send requests to the backend.
Together, they implement a layered style: Presentation layer (front end), Application logic and data layer (back end). 
Together, they implement also an MVC pattern, with the V on the front end and the MC on the back end.

## Package Diagram

![Package Diagram](./Diagrams/Package_diagram.png "Package Diagram")

# Low level design

![Class Diagram](./Diagrams/Design_diagram_coding.jpg "Class Diagram")

# Verification traceability matrix

![Traceability matrix](./Diagrams/Traceability_matrix.png "Traceability matrix")

# Verification sequence diagrams

![Create SKU](./Diagrams/Create%20SKU.jpg "Create SKU")
![Modify SKU weight and volume](./Diagrams/Modify%20SKU%20weight%20and%20volume.jpg "Modify SKU weight and volume")
![Modify postion P](./Diagrams/Modify%20postion%20P.jpg "Modify postion P") 
![UC2: Scenario 1 - Create position](./Diagrams/SD%20-%20UC2%20Scenario%201%20-%20Create%20position.jpg "UC2: Scenario 1 - Create position")
![UC3: Scenario 1 - Restock Order of SKU S Issued by quantity](./Diagrams/SD%20-%20UC3%20Scenario%201%20-%20Restock%20Order%20of%20SKU%20S%20issued%20by%20quantity.jpg "UC3: Scenario 1 - Restock Order of SKU S Issued by quantity")
![UC4: Scenario 1 - Create user and define rights](./Diagrams/SD%20-%20UC4%20Scenario%201%20-%20Create%20user%20and%20define%20rights.jpg "UC4: Scenario 1 - Create user and define rights")
![UC4: Scenario 2 - Modify user rights](./Diagrams/SD%20-%20UC4%20Scenario%202%20-%20Modify%20user%20rights.jpg "UC4: Scenario 2 - Modify user rights")
### UC5: Scenario 1.1 - Record restock order arrival
![UC5: Scenario 1.1 - Record restock order arrival](./Diagrams/UC5.1.jpg "UC5: Scenario 1.1 - Record restock order arrival")
### UC5: Scenario 2.2 - Record negative test results of all SKU items of a RestockOrder
![UC5: Scenario 2.2 - Record negative test results of all SKU items of a RestockOrder](./Diagrams/UC5.2.jpg "UC5: Scenario 2.2 - Record negative test results of all SKU items of a RestockOrder")
### UC5: Scenario 3.3 - Stock some SKU items of a RO
![UC5: Scenario 3.3 - Stock some SKU items of a RO](./Diagrams/UC5.3.jpg "UC5: Scenario 3.3 - Stock some SKU items of a RO")
### UC6: Scenario 2 - Return order of any SKU items
![UC6: Scenario 2 - Return order of any SKU items](./Diagrams/UC6.2.jpg "UC6: Scenario 2 - Return order of any SKU items")

![UC9: Scenario 1 - Internal Order IO accepted](./Diagrams/SD%20-%20UC9%20Scenario%201.jpg "UC9: Scenario 1 - Internal Order IO accepted")
![UC10: Scenario 1 - Internal Order IO Completed](./Diagrams/SD%20-%20UC10%20Scenario%201.jpg "UC10: Scenario 1 - Internal Order IO Completed")
![UC11: Scenario 2 - Modify Item description and price](./Diagrams/SD%20-%20UC11%20Scenario%202.jpg "UC11: Scenario 2 - Modify Item description and price")
![UC12: Scenario 2 - Update test description](./Diagrams/SD%20-%20UC12%20Scenario%202.jpg "UC12: Scenario 2 - Update test description")
