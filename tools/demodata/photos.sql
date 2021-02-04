BEGIN;

DELETE FROM "category";

INSERT INTO "category" ("id", "name") VALUES
	('43fcdb43-7bd4-4f36-96cd-76c17e204f4b', 'Category 1'),
	('13013c3c-044d-436b-a083-14edbe287381', 'Category 2');

COMMIT;
