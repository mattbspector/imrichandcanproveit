# Migration `20210203193140-migration`

This migration has been generated at 2/3/2021, 11:31:40 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Leader" ADD COLUMN     "affiliate" TEXT NOT NULL DEFAULT E''
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210131052116-migration..20210203193140-migration
--- datamodel.dml
+++ datamodel.dml
@@ -1,20 +1,21 @@
 datasource DS {
   // optionally set multiple providers
   // example: provider = ["sqlite", "postgresql"]
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider      = "prisma-client-js"
-  binaryTargets = "native"
+  binaryTargets = ["native", "rhel-openssl-1.0.x"]
 }
 model Leader {
   id        String   @id @default(uuid())
   firstName String
   lastName  String
   email     String
+  affiliate String   @default("")
   amount    Int
   createdAt DateTime @default(now())
 }
```


