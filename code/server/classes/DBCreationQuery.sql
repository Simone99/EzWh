CREATE TABLE IF NOT EXISTS USER_TABLE(
    ID INTEGER PRIMARY KEY AUTOINCREMENT, 
    NAME VARCHAR(20), 
    SURNAME VARCHAR(20), 
    TYPE VARCHAR(20), 
    USERNAME VARCHAR(20), 
    PASSWORD VARCHAR(32)
);

CREATE TABLE IF NOT EXISTS INTERNALTRANSPORTNOTE_TABLE(
    SHIPMENTDATE VARCHAR(20) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS INTERNALORDER_TABLE(
    ID INTEGER PRIMARY KEY AUTOINCREMENT, 
    ISSUEDATE VARCHAR(20), 
    STATE VARCHAR(20), 
    ITN INTEGER, 
    CUSTOMER INTEGER,
    FOREIGN KEY(ITN) REFERENCES INTERNALTRANSPORTNOTE_TABLE(SHIPMENTDATE)
);

CREATE TABLE IF NOT EXISTS INTERNALORDERITEM_TABLE(
    ID INTEGER PRIMARY KEY AUTOINCREMENT, 
    SKUID INTEGER,
    QUANTITY INTEGER
);

CREATE TABLE IF NOT EXISTS INTERNALORDERITEMS_LIST(
    ID_INTERNALORDER INTEGER, 
    ID_INTERNALORDERITEM INTEGER,
    PRIMARY KEY(ID_INTERNALORDER,ID_INTERNALORDERITEM),
    FOREIGN KEY(ID_INTERNALORDER) REFERENCES INTERNALORDER_TABLE(ID), 
    FOREIGN KEY(ID_INTERNALORDERITEM) REFERENCES INTERNALORDERITEM_TABLE(ID)
);

CREATE TABLE IF NOT EXISTS POSITION_TABLE(
    ID INTEGER PRIMARY KEY,
    AISLE INTEGER,
    ROW INTEGER,
    COL INTEGER,
    MAX_WEIGHT INTEGER,
    MAX_VOLUME INTEGER,
    OCCUPIED_WEIGHT INTEGER,
    OCCUPIED_VOLUME INTEGER
);

CREATE TABLE IF NOT EXISTS SKU_TABLE(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    DESCRIPTION VARCHAR(200),
    WEIGHT INTEGER,
    VOLUME INTEGER,
    PRICE REAL,
    NOTES VARCHAR(200),
    POSITION INTEGER,
    AVAILABLEQUANTITY INTEGER,
    FOREIGN KEY(POSITION) REFERENCES POSITION_TABLE(ID)
);

CREATE TABLE IF NOT EXISTS SKUITEM_TABLE(
    RFID VARCHAR(32) PRIMARY KEY,
    AVAILABLE INTEGER,
    SKUID INTEGER,
    DATEOFSTOCK VARCHAR(20),
    FOREIGN KEY(SKUID) REFERENCES SKU_TABLE(ID)
);

CREATE TABLE IF NOT EXISTS ITEM_TABLE(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    DESCRIPTION VARCHAR(200),
    PRICE REAL,
    USERID INTEGER,
    SKUID INTEGER,
    FOREIGN KEY(USERID) REFERENCES USER_TABLE(ID),
    FOREIGN KEY(SKUID) REFERENCES SKU_TABLE(ID)
);

CREATE TABLE IF NOT EXISTS ITEMSSKU_LIST(
    ID_SKU INTEGER,
    ID_ITEM INTEGER,
    PRIMARY KEY (ID_SKU, ID_ITEM),
    FOREIGN KEY(ID_SKU) REFERENCES SKU_TABLE(ID),
    FOREIGN KEY(ID_ITEM) REFERENCES ITEM_TABLE(ID)
);

CREATE TABLE IF NOT EXISTS SKUITEMSKU_LIST(
    ID_SKU INTEGER,
    ID_SKUITEM VARCHAR(32),
    PRIMARY KEY (ID_SKU, ID_SKUITEM),
    FOREIGN KEY(ID_SKU) REFERENCES SKU_TABLE(ID),
    FOREIGN KEY(ID_SKUITEM) REFERENCES SKUITEM_TABLE(RFID)
);

CREATE TABLE IF NOT EXISTS TESTDESCRIPTOR_TABLE(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NAME VARCHAR(20),
    PROCEDURE_DESCRIPTION VARCHAR(200),
    SKUID INTEGER,
    FOREIGN KEY(SKUID) REFERENCES SKU_TABLE(ID)
);

CREATE TABLE IF NOT EXISTS TESTRESULT_TABLE(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    DATE_ VARCHAR(20),
    RESULT INTEGER,
    DESCRIPTION INTEGER,
    FOREIGN KEY(DESCRIPTION) REFERENCES TESTDESCRIPTOR_TABLE(ID)
);

CREATE TABLE IF NOT EXISTS TESTRESULTSKUITEM_LIST(
    ID_TESTRESULT INTEGER,
    ID_SKUITEM VARCHAR(32),
    PRIMARY KEY(ID_TESTRESULT, ID_SKUITEM),
    FOREIGN KEY(ID_TESTRESULT) REFERENCES TESTRESULT_TABLE(ID),
    FOREIGN KEY(ID_SKUITEM) REFERENCES SKUITEM_TABLE(RFID)
);

CREATE TABLE IF NOT EXISTS SKUITEMSINTERNALORDER_LIST(
    ID_INTERNALORDER INTEGER,
    ID_SKUITEM VARCHAR(32),
    PRIMARY KEY(ID_INTERNALORDER, ID_SKUITEM),
    FOREIGN KEY(ID_INTERNALORDER) REFERENCES INTERNALORDER_TABLE(ID),
    FOREIGN KEY(ID_SKUITEM) REFERENCES SKUITEM_TABLE(RFID)
);

CREATE TABLE IF NOT EXISTS TRANSPORTNOTE_TABLE(
    SHIPMENTDATE VARCHAR(20) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS RESTOCKORDER_TABLE(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    ISSUEDATE VARCHAR(20),
    STATE VARCHAR(20),
    USERID INTEGER,
    TRANSPORTNOTE INTEGER,
    FOREIGN KEY(USERID) REFERENCES USER_TABLE(ID),
    FOREIGN KEY(TRANSPORTNOTE) REFERENCES TRANSPORTNOTE_TABLE(SHIPMENTDATE)
);

CREATE TABLE IF NOT EXISTS RESTOCKORDERITEM_TABLE(
    ID_ITEM INTEGER,
    QUANTITY INTEGER,
    PRIMARY KEY(ID_ITEM),
    FOREIGN KEY (ID_ITEM) REFERENCES ITEM_TABLE(ID)
);

CREATE TABLE IF NOT EXISTS RESTOCKORDERITEMSRESTOCKORDER_LIST(
    ID_RESTOCKORDER INTEGER,
    ID_RESTOCKORDERITEM INTEGER,
    PRIMARY KEY (ID_RESTOCKORDER, ID_RESTOCKORDERITEM),
    FOREIGN KEY (ID_RESTOCKORDER) REFERENCES RESTOCKORDER_TABLE(ID),
    FOREIGN KEY (ID_RESTOCKORDERITEM) REFERENCES RESTOCKORDERITEM_TABLE(ID)
);

CREATE TABLE IF NOT EXISTS SKUITEMSRESTOCKORDER_LIST(
    ID_SKUITEM VARCHAR(32),
    ID_RESTOCKORDER INTEGER,
    PRIMARY KEY (ID_SKUITEM, ID_RESTOCKORDER),
    FOREIGN KEY (ID_RESTOCKORDER) REFERENCES RESTOCKORDER_TABLE(ID),
    FOREIGN KEY (ID_SKUITEM) REFERENCES SKUITEM_TABLE(RFID)
);

CREATE TABLE IF NOT EXISTS RETURNORDER_TABLE(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    RETURNDATE VARCHAR(20),
    RESTOCKORDER INTEGER,
    STATE VARCHAR(20),
    FOREIGN KEY (RESTOCKORDER) REFERENCES RESTOCKORDER_TABLE(ID)
);

CREATE TABLE IF NOT EXISTS SKUITEMSRETURNORDER_LIST(
    ID_RETURNORDER INTEGER,
    ID_SKUITEM VARCHAR(32),
    PRIMARY KEY (ID_RETURNORDER, ID_SKUITEM),
    FOREIGN KEY (ID_RETURNORDER) REFERENCES RETURNORDER_TABLE(ID),
    FOREIGN KEY (ID_SKUITEM) REFERENCES SKUITEM_TABLE(RFID)
)