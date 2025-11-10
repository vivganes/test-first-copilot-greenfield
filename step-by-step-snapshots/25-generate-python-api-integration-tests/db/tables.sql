-- ShopSphere: SQLite Table Definitions
-- Generated on 2025-09-15
-- All tables use industry best practices for SQLite

-- User Table
CREATE TABLE User (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Active','Inactive','Suspended')),
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    lastLogin TEXT,
    phoneNumber TEXT NOT NULL,
    emailVerified INTEGER NOT NULL DEFAULT 0,
    emailVerifiedAt TEXT,
    deletedAt TEXT,
    anonymized INTEGER NOT NULL DEFAULT 0
);

-- UserRole Table (Many-to-Many)
CREATE TABLE UserRole (
    userId TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('Customer','Seller','Admin')),
    PRIMARY KEY (userId, role),
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);

-- Address Table
CREATE TABLE Address (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('Shipping','Billing')),
    line1 TEXT NOT NULL,
    line2 TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    postalCode TEXT NOT NULL,
    country TEXT NOT NULL,
    isDefault INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    phoneNumber TEXT,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);

-- RolePermission Table
CREATE TABLE RolePermission (
    id TEXT PRIMARY KEY,
    role TEXT NOT NULL CHECK(role IN ('Customer','Seller','Admin')),
    permission TEXT NOT NULL,
    description TEXT
);

-- Category Table
CREATE TABLE Category (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    parentId TEXT,
    FOREIGN KEY (parentId) REFERENCES Category(id)
);

-- Brand Table
CREATE TABLE Brand (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    logoUrl TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
);

-- Product Table
CREATE TABLE Product (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL CHECK(price >= 0),
    sellerId TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Active','Inactive','OutOfStock')),
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    stockStatus TEXT CHECK(stockStatus IN ('InStock','LowStock','OutOfStock')),
    lowStockThreshold INTEGER,
    brandId TEXT,
    FOREIGN KEY (sellerId) REFERENCES User(id),
    FOREIGN KEY (brandId) REFERENCES Brand(id)
);

-- ProductVariant Table
CREATE TABLE ProductVariant (
    id TEXT PRIMARY KEY,
    productId TEXT NOT NULL,
    sku TEXT NOT NULL UNIQUE,
    attributes TEXT,
    price REAL,
    inventoryId TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Active','Inactive','OutOfStock')),
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE CASCADE,
    FOREIGN KEY (inventoryId) REFERENCES Inventory(id)
);

-- Inventory Table
CREATE TABLE Inventory (
    id TEXT PRIMARY KEY,
    productId TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK(quantity >= 0),
    reserved INTEGER NOT NULL DEFAULT 0 CHECK(reserved >= 0),
    updatedAt TEXT NOT NULL,
    lowStockThreshold INTEGER,
    FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE CASCADE
);

-- ProductImage Table
CREATE TABLE ProductImage (
    id TEXT PRIMARY KEY,
    productId TEXT NOT NULL,
    variantId TEXT,
    url TEXT NOT NULL,
    altText TEXT,
    sortOrder INTEGER,
    createdAt TEXT NOT NULL,
    FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE CASCADE,
    FOREIGN KEY (variantId) REFERENCES ProductVariant(id)
);

-- Order Table
CREATE TABLE "Order" (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Pending','Paid','Shipped','Delivered','Cancelled','Refunded')),
    totalAmount REAL NOT NULL,
    paymentId TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    statusHistory TEXT,
    estimatedDelivery TEXT,
    invoiceUrl TEXT,
    currencyCode TEXT NOT NULL,
    taxId TEXT,
    FOREIGN KEY (userId) REFERENCES User(id),
    FOREIGN KEY (paymentId) REFERENCES Payment(id),
    FOREIGN KEY (currencyCode) REFERENCES Currency(code),
    FOREIGN KEY (taxId) REFERENCES Tax(id)
);

-- OrderShipment Table (for multi-seller/multi-shipment orders)
CREATE TABLE OrderShipment (
    id TEXT PRIMARY KEY,
    orderId TEXT NOT NULL,
    addressId TEXT NOT NULL,
    carrier TEXT NOT NULL,
    trackingNumber TEXT,
    status TEXT NOT NULL CHECK(status IN ('Pending','Shipped','InTransit','Delivered','Returned')),
    shippedAt TEXT,
    deliveredAt TEXT,
    createdAt TEXT NOT NULL,
    FOREIGN KEY (orderId) REFERENCES "Order"(id),
    FOREIGN KEY (addressId) REFERENCES Address(id)
);

-- OrderItem Table
CREATE TABLE OrderItem (
    id TEXT PRIMARY KEY,
    orderId TEXT NOT NULL,
    productId TEXT NOT NULL,
    variantId TEXT,
    orderShipmentId TEXT,
    quantity INTEGER NOT NULL CHECK(quantity >= 1),
    price REAL NOT NULL,
    promotionId TEXT,
    discountAmount REAL DEFAULT 0,
    taxAmount REAL DEFAULT 0,
    FOREIGN KEY (orderId) REFERENCES "Order"(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES Product(id),
    FOREIGN KEY (variantId) REFERENCES ProductVariant(id),
    FOREIGN KEY (orderShipmentId) REFERENCES OrderShipment(id),
    FOREIGN KEY (promotionId) REFERENCES Promotion(id)
);

-- Payment Table
CREATE TABLE Payment (
    id TEXT PRIMARY KEY,
    orderId TEXT NOT NULL,
    amount REAL NOT NULL,
    method TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Pending','Completed','Failed','Refunded')),
    transactionId TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    split INTEGER NOT NULL DEFAULT 0,
    methods TEXT,
    currencyCode TEXT NOT NULL,
    taxId TEXT,
    FOREIGN KEY (orderId) REFERENCES "Order"(id),
    FOREIGN KEY (currencyCode) REFERENCES Currency(code),
    FOREIGN KEY (taxId) REFERENCES Tax(id)
);

-- Shipment Table
-- Shipment table is replaced by OrderShipment for multi-seller support

-- Review Table
CREATE TABLE Review (
    id TEXT PRIMARY KEY,
    productId TEXT NOT NULL,
    userId TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
    comment TEXT,
    createdAt TEXT NOT NULL,
    orderId TEXT NOT NULL,
    FOREIGN KEY (productId) REFERENCES Product(id),
    FOREIGN KEY (userId) REFERENCES User(id),
    FOREIGN KEY (orderId) REFERENCES "Order"(id),
    UNIQUE(productId, userId, orderId)
);

-- Promotion Table
CREATE TABLE Promotion (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    description TEXT,
    discountType TEXT NOT NULL CHECK(discountType IN ('Percentage','FixedAmount')),
    discountValue REAL NOT NULL,
    startDate TEXT NOT NULL,
    endDate TEXT NOT NULL,
    usageLimit INTEGER,
    usedCount INTEGER DEFAULT 0,
    status TEXT NOT NULL CHECK(status IN ('Active','Inactive','Expired'))
);

-- ShoppingCart Table
CREATE TABLE ShoppingCart (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL UNIQUE,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(id)
);

-- ShoppingCartItem Table
CREATE TABLE ShoppingCartItem (
    id TEXT PRIMARY KEY,
    cartId TEXT NOT NULL,
    productId TEXT NOT NULL,
    variantId TEXT,
    quantity INTEGER NOT NULL CHECK(quantity >= 1),
    price REAL NOT NULL,
    promotionId TEXT,
    addedAt TEXT NOT NULL,
    FOREIGN KEY (cartId) REFERENCES ShoppingCart(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES Product(id),
    FOREIGN KEY (variantId) REFERENCES ProductVariant(id),
    FOREIGN KEY (promotionId) REFERENCES Promotion(id)
);

-- ReturnRefund Table
CREATE TABLE ReturnRefund (
    id TEXT PRIMARY KEY,
    orderId TEXT NOT NULL,
    userId TEXT NOT NULL,
    productId TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK(quantity >= 1),
    reason TEXT,
    status TEXT NOT NULL CHECK(status IN ('Requested','Approved','Rejected','Completed')),
    refundAmount REAL NOT NULL,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    FOREIGN KEY (orderId) REFERENCES "Order"(id),
    FOREIGN KEY (userId) REFERENCES User(id),
    FOREIGN KEY (productId) REFERENCES Product(id)
);

-- AuditLog Table
CREATE TABLE AuditLog (
    id TEXT PRIMARY KEY,
    userId TEXT,
    action TEXT NOT NULL,
    entityType TEXT NOT NULL,
    entityId TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    details TEXT,
    FOREIGN KEY (userId) REFERENCES User(id)
);

-- Notification Table
CREATE TABLE Notification (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('Email','SMS','InApp')),
    message TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Sent','Pending','Failed','Read')),
    createdAt TEXT NOT NULL,
    sentAt TEXT,
    FOREIGN KEY (userId) REFERENCES User(id)
);

-- Currency Table
CREATE TABLE Currency (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    symbol TEXT NOT NULL,
    exchangeRate REAL NOT NULL,
    isActive INTEGER NOT NULL DEFAULT 1,
    updatedAt TEXT NOT NULL
);

-- Tax Table
CREATE TABLE Tax (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    rate REAL NOT NULL CHECK(rate >= 0),
    country TEXT NOT NULL,
    region TEXT NOT NULL,
    isActive INTEGER NOT NULL DEFAULT 1,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
);

-- Session Table
CREATE TABLE Session (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    token TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    expiresAt TEXT NOT NULL,
    lastActive TEXT NOT NULL,
    ipAddress TEXT,
    userAgent TEXT,
    loginType TEXT CHECK(loginType IN ('Local','Social')),
    provider TEXT,
    providerId TEXT,
    FOREIGN KEY (userId) REFERENCES User(id),
    UNIQUE(userId, userAgent, ipAddress, expiresAt)
);

-- PasswordResetToken Table
CREATE TABLE PasswordResetToken (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    token TEXT NOT NULL,
    expiresAt TEXT NOT NULL,
    used INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(id)
);

-- EmailVerificationToken Table
CREATE TABLE EmailVerificationToken (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    token TEXT NOT NULL UNIQUE,
    expiresAt TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    usedAt TEXT,
    isUsed INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (userId) REFERENCES User(id)
);

-- AnalyticsEvent Table
CREATE TABLE AnalyticsEvent (
    id TEXT PRIMARY KEY,
    userId TEXT,
    eventType TEXT NOT NULL,
    eventData TEXT,
    timestamp TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(id)
);

-- SupportTicket Table
CREATE TABLE SupportTicket (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Open','InProgress','Resolved','Closed')),
    assignedTo TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    closedAt TEXT,
    FOREIGN KEY (userId) REFERENCES User(id),
    FOREIGN KEY (assignedTo) REFERENCES User(id)
);

-- Banner Table
CREATE TABLE Banner (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    linkUrl TEXT,
    startDate TEXT NOT NULL,
    endDate TEXT NOT NULL,
    isActive INTEGER NOT NULL DEFAULT 1,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
);

-- FAQ Table
CREATE TABLE FAQ (
    id TEXT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    isActive INTEGER NOT NULL DEFAULT 1,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
);

-- ContactSubmission Table
CREATE TABLE ContactSubmission (
    id TEXT PRIMARY KEY,
    userId TEXT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('New','InProgress','Resolved')),
    createdAt TEXT NOT NULL,
    resolvedAt TEXT,
    FOREIGN KEY (userId) REFERENCES User(id)
);

-- ProductCategory (Many-to-Many)
CREATE TABLE ProductCategory (
    productId TEXT NOT NULL,
    categoryId TEXT NOT NULL,
    PRIMARY KEY (productId, categoryId),
    FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE CASCADE,
    FOREIGN KEY (categoryId) REFERENCES Category(id) ON DELETE CASCADE
);

-- ProductPromotion (Many-to-Many)
CREATE TABLE ProductPromotion (
    productId TEXT NOT NULL,
    promotionId TEXT NOT NULL,
    PRIMARY KEY (productId, promotionId),
    FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE CASCADE,
    FOREIGN KEY (promotionId) REFERENCES Promotion(id) ON DELETE CASCADE
);

-- CategoryPromotion (Many-to-Many)
CREATE TABLE CategoryPromotion (
    categoryId TEXT NOT NULL,
    promotionId TEXT NOT NULL,
    PRIMARY KEY (categoryId, promotionId),
    FOREIGN KEY (categoryId) REFERENCES Category(id) ON DELETE CASCADE,
    FOREIGN KEY (promotionId) REFERENCES Promotion(id) ON DELETE CASCADE
);
