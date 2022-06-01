insert into "tags" ("label")
     values ('bouldering'),
            ('toprope'),
            ('lead');

insert into "user" ("userName","userDescription", "imageUrl")
     values ('Nana and Popo', 'ice climbers', 'image-iceclimbers.webp'),
            ('Geodude', 'used rockclimb, it was super effective!', 'image-geodude.jpeg');

insert into "skillLevels" ("label")
     values ('beginner'),
            ('intermediate'),
            ('advanced');

insert into "userTags" ("userId", "tagId")
     values ('1','1'),
            ('1','2'),
            ('2','1'),
            ('2','3');
