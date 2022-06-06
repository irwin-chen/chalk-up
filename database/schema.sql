set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."user" (
	"userId" serial NOT NULL,
	"hashedPassword" TEXT,
	"userName" TEXT NOT NULL,
	"userDescription" TEXT NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"latitude" float8,
	"longitude" float8,
	"skillLevelId" int,
	CONSTRAINT "user_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."tags" (
	"tagId" serial NOT NULL,
	"label" TEXT NOT NULL,
	CONSTRAINT "tags_pk" PRIMARY KEY ("tagId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."chat" (
	"recipientId" int NOT NULL,
	"senderId" int NOT NULL,
	"messageContent" TEXT NOT NULL,
	"createdAt" TIMESTAMPTZ DEFAULT Now()
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."skillLevels" (
	"skillLevelId" serial NOT NULL,
	"label" TEXT NOT NULL,
	CONSTRAINT "skillLevels_pk" PRIMARY KEY ("skillLevelId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."userTags" (
	"userId" int NOT NULL,
	"tagId" int NOT NULL
) WITH (
  OIDS=FALSE
);



ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("skillLevelId") REFERENCES "skillLevels"("skillLevelId");


ALTER TABLE "chat" ADD CONSTRAINT "chat_fk0" FOREIGN KEY ("recipientId") REFERENCES "user"("userId");
ALTER TABLE "chat" ADD CONSTRAINT "chat_fk1" FOREIGN KEY ("senderId") REFERENCES "user"("userId");


ALTER TABLE "userTags" ADD CONSTRAINT "userTags_fk0" FOREIGN KEY ("userId") REFERENCES "user"("userId");
ALTER TABLE "userTags" ADD CONSTRAINT "userTags_fk1" FOREIGN KEY ("tagId") REFERENCES "tags"("tagId");
