CREATE DATABASE recipes_db;

\c recipes_db

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    userid SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    emailid  VARCHAR(300) NOT NULL, 
    isadmin  BOOLEAN
);

DROP TABLE IF EXISTS recipes CASCADE;
CREATE TABLE recipes(
    recipeid SERIAL PRIMARY KEY,
    recipename VARCHAR(200) NOT NULL,
    preptimemins INTEGER NOT NULL,
    cooktimemins INTEGER NOT NULL,
    authorid INTEGER NOT NULL REFERENCES users(userid),
    image VARCHAR(300),
    recipeurl VARCHAR(300) NOT NULL,
    recipeaddeddate TIME NOT NULL DEFAULT(CURRENT_TIMESTAMP)
);



DROP TABLE IF EXISTS ingredients CASCADE;
CREATE TABLE ingredients(
    ingredientid SERIAL PRIMARY KEY,
    ingredientname VARCHAR(20) NOT NULL,
    category VARCHAR(20)
);

-- DROP TABLE IF EXISTS recipeIngredients CASCADE;
-- CREATE TABLE recipeIngredients(
--     ingredients  INTEGER REFERENCES ingredients(ingredientid), 
--     quantityinoz INTEGER,
--     recipeid INTEGER REFERENCES recipes(recipeid)  
-- );
