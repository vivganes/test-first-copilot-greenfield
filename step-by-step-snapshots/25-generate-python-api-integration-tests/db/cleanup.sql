-- GH Copilot code - starts
-- SQLite Cleanup Script for ShopSphere Database
-- This script drops all tables and many-to-many link tables in the correct order for a clean re-creation.
-- Use this before running tables.sql to avoid conflicts.

PRAGMA foreign_keys = OFF;

DROP TABLE IF EXISTS CategoryPromotion;
DROP TABLE IF EXISTS ProductPromotion;
DROP TABLE IF EXISTS ProductCategory;
DROP TABLE IF EXISTS ShoppingCartItem;
DROP TABLE IF EXISTS ShoppingCart;
DROP TABLE IF EXISTS ReturnRefund;
DROP TABLE IF EXISTS Review;
DROP TABLE IF EXISTS OrderItem;
DROP TABLE IF EXISTS OrderShipment;
DROP TABLE IF EXISTS "Order";
DROP TABLE IF EXISTS Payment;
DROP TABLE IF EXISTS Inventory;
DROP TABLE IF EXISTS ProductVariant;
DROP TABLE IF EXISTS ProductImage;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Brand;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS Address;
DROP TABLE IF EXISTS UserRole;
DROP TABLE IF EXISTS RolePermission;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Tax;
DROP TABLE IF EXISTS Currency;
DROP TABLE IF EXISTS AuditLog;
DROP TABLE IF EXISTS Notification;
DROP TABLE IF EXISTS Session;
DROP TABLE IF EXISTS PasswordResetToken;
DROP TABLE IF EXISTS AnalyticsEvent;
DROP TABLE IF EXISTS SupportTicket;
DROP TABLE IF EXISTS Banner;
DROP TABLE IF EXISTS FAQ;
DROP TABLE IF EXISTS ContactSubmission;

DROP TABLE IF EXISTS Promotion;

DROP TABLE IF EXISTS EmailVerificationToken;

PRAGMA foreign_keys = ON;
--  GH Copilot code - end