insert into "tags" ("label")
     values ('bouldering'),
            ('toprope'),
            ('lead');

insert into "user" ("userName","userDescription", "imageUrl")
     values ('Nana and Popo', 'ice climbers', 'image-iceclimbers.webp'),
            ('Geodude', 'Geodude is a brownish-gray boulder Pokémon. It has bulging, rocky eyebrows, trapezoidal, brown eyes, and a wide mouth. Its arms are muscular with five-fingered hands. Geodude uses its arms to climb steadily up steep mountain paths. Geodude used rockclimb! It was super effective!', 'image-geodude.jpeg'),
            ('Fish', 'hmmm', 'image-fish.jpeg'),
            ('Cat', 'YAMERO', 'image-cat.jpeg');

insert into "skillLevels" ("label")
     values ('beginner'),
            ('intermediate'),
            ('advanced');

insert into "userTags" ("userId", "tagId")
     values ('1','1'),
            ('1','2'),
            ('2','1'),
            ('2','3'),
            ('3','2'),
            ('4','2'),
            ('4','3');
