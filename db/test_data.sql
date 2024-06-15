
INSERT INTO activities VALUES (1, 10, 'act1');
INSERT INTO regions VALUES (1, 'Wola');
INSERT INTO regions VALUES (2, 'Praga');
INSERT INTO users VALUES (1, 'IA');
INSERT INTO users_in_activities VALUES (1, 1);

SELECT pg_catalog.setval('public.activities_id_seq', 1, true);
SELECT pg_catalog.setval('public.posts_id_seq', 1, false);
SELECT pg_catalog.setval('public.regions_id_seq', 2, true);
SELECT pg_catalog.setval('public.users_id_seq', 1, true);