CREATE TABLE generative_ai_industries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  industry VARCHAR(100) NOT NULL,
  application_share DECIMAL(5,2) NOT NULL
);

INSERT INTO generative_ai_industries (industry, application_share) VALUES
('Healthcare', 25),
('Automotive', 20),
('Entertainment', 15),
('Finance', 10),
('Retail', 20),
('Education', 10);


CREATE TABLE generative_ai_growth (
  id INT AUTO_INCREMENT PRIMARY KEY,
  year INT NOT NULL,
  research_papers_published INT NOT NULL
);

INSERT INTO generative_ai_growth (year, research_papers_published) VALUES
(2015, 20),
(2016, 35),
(2017, 50),
(2018, 75),
(2019, 100),
(2020, 120),
(2021, 150),
(2022, 200);



CREATE TABLE generative_ai_investment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  industry VARCHAR(100) NOT NULL,
  investment_2019 DECIMAL(10,2) NOT NULL,
  investment_2020 DECIMAL(10,2) NOT NULL,
  investment_2021 DECIMAL(10,2) NOT NULL
);

INSERT INTO generative_ai_investment (industry, investment_2019, investment_2020, investment_2021) VALUES
('Healthcare', 100, 150, 200),
('Automotive', 120, 140, 160),
('Entertainment', 90, 100, 120),
('Finance', 150, 180, 200),
('Retail', 80, 100, 140),
('Education', 70, 80, 100);



CREATE TABLE generative_ai_tech_adoption (
  id INT AUTO_INCREMENT PRIMARY KEY,
  technology VARCHAR(100) NOT NULL,
  healthcare INT NOT NULL,
  automotive INT NOT NULL,
  entertainment INT NOT NULL,
  finance INT NOT NULL,
  retail INT NOT NULL,
  education INT NOT NULL
);

INSERT INTO generative_ai_tech_adoption (technology, healthcare, automotive, entertainment, finance, retail, education) VALUES
('Natural Language Processing (NLP)', 5, 3, 4, 4, 3, 4),
('Generative Adversarial Networks (GANs)', 4, 4, 5, 4, 3, 2),
('Reinforcement Learning', 3, 5, 4, 5, 3, 3),
('Computer Vision', 5, 5, 4, 3, 4, 3),
('Neural Networks', 4, 3, 4, 5, 4, 4);


