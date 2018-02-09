CREATE TABLE categories (
    categories SMALLINT PRIMARY KEY,
    description VARCHAR(20)
);
--DROP TABLE products;
CREATE TABLE products (
  products SERIAL PRIMARY KEY,
  description VARCHAR(40) NOT NULL,
  price NUMERIC(10,4) NOT NULL,
  tax NUMERIC(10,4) NOT NULL,
  category SMALLINT REFERENCES categories(categories) DEFAULT 2
);

--DROP TABLE users;
CREATE TABLE users (
  users SERIAL PRIMARY KEY,
  first_name VARCHAR(40),
  last_name VARCHAR(40),
  gender BOOL,
  birth_date DATE,
  email VARCHAR(50) UNIQUE,
  password VARCHAR(64)
);

--DROP TABLE sales;
CREATE TABLE sales (
  sales SERIAL PRIMARY KEY,
  purchaser INTEGER REFERENCES users(users),
  sale_date TIMESTAMP DEFAULT now() NOT NULL,
  total NUMERIC(12,4) NOT NULL,
  tax NUMERIC(12,4) NOT NULL
);



CREATE TABLE sales_products (
  sales_products SERIAL PRIMARY KEY,
  quantity_sold INTEGER,
  sales INTEGER ,
  products INTEGER ,
  CONSTRAINT fk_sales_products_sales FOREIGN KEY (sales)
  REFERENCES sales(sales)
  ON UPDATE CASCADE
  ON DELETE CASCADE,
  CONSTRAINT fk_sales_products_products FOREIGN KEY (products)
  REFERENCES products(products)
  ON UPDATE CASCADE
);

INSERT INTO categories (categories,description)
    VALUES (1,'food-and-beverage'),
    (2,'miscellaneous'),
    (3,'fashion'),
    (4,'entertainment'),
    (5,'music');


