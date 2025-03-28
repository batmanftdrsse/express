-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SMSLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "sentAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderId" INTEGER,
    "metadata" TEXT
);
INSERT INTO "new_SMSLog" ("id", "message", "metadata", "orderId", "phone", "sentAt", "status") SELECT "id", "message", "metadata", "orderId", "phone", "sentAt", "status" FROM "SMSLog";
DROP TABLE "SMSLog";
ALTER TABLE "new_SMSLog" RENAME TO "SMSLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
