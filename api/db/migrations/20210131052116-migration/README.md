# Migration `20210131052116-migration`

This migration has been generated at 1/30/2021, 9:21:16 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Leader" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210131045354-migration..20210131052116-migration
--- datamodel.dml
+++ datamodel.dml
@@ -1,19 +1,20 @@
 datasource DS {
   // optionally set multiple providers
   // example: provider = ["sqlite", "postgresql"]
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider      = "prisma-client-js"
   binaryTargets = "native"
 }
 model Leader {
-  id        String @id @default(uuid())
+  id        String   @id @default(uuid())
   firstName String
   lastName  String
   email     String
   amount    Int
+  createdAt DateTime @default(now())
 }
```


