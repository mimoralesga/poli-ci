CREATE TABLE Tasks (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    complete BOOLEAN NOT NULL
);

INSERT INTO Tasks (id, title, complete) VALUES
(TO_CHAR(NOW() AT TIME ZONE 'UTC', 'YYYYMMDDHH24MISS') || ROUND(RANDOM() * 1000)::TEXT, 'Trate de calcular la alimentacion EXE, tal vez se indexara el pixel de varios bytestask', false)