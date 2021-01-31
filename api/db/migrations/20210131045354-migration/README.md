# Migration `20210131045354-migration`

This migration has been generated at 1/30/2021, 8:53:54 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Leader" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    PRIMARY KEY ("id")
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20210131045354-migration
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,19 @@
+datasource DS {
+  // optionally set multiple providers
+  // example: provider = ["sqlite", "postgresql"]
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider      = "prisma-client-js"
+  binaryTargets = "native"
+}
+
+model Leader {
+  id        String @id @default(uuid())
+  firstName String
+  lastName  String
+  email     String
+  amount    Int
+}
```


