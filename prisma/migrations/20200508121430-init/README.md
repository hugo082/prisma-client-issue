# Migration `20200508121430-init`

This migration has been generated by hugofqt at 5/8/2020, 12:14:30 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."EnititA" (
"connector_id" text   ,"id" text  NOT NULL ,"indicator" text  NOT NULL ,"query" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."EnitityB" (
"id" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "EnititA.connector_id_indicator_query" ON "public"."EnititA"("connector_id","indicator","query")

ALTER TABLE "public"."EnititA" ADD FOREIGN KEY ("connector_id")REFERENCES "public"."EnitityB"("id") ON DELETE SET NULL  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200508121430-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,23 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+model EnititA {
+  id          String    @default(cuid()) @id
+  connector   EnitityB? @relation(fields: [connectorId], references: [id])
+  connectorId String?   @map("connector_id")
+  indicator   String
+  query       String
+
+  @@unique([connectorId, indicator, query])
+}
+
+model EnitityB {
+  id      String    @default(cuid()) @id
+  EnititA EnititA[]
+}
```


