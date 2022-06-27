insert into "tags" ("label")
     values ('bouldering'),
            ('toprope'),
            ('lead climbing'),
            ('indoor'),
            ('outdoor'),
            ('belaying');

insert into "user" ("userDescription", "imageUrl", "age", "city", "firstName", "lastName")
     values ('looking for people to climb with!', 'https://climberfinder.s3.us-east-1.amazonaws.com/1656362455390.jpg', '25', 'Albaquerque', 'Julian', 'King'),
            ('Avid rock climber, looking for a belayer!', 'https://climberfinder.s3.us-east-1.amazonaws.com/1656362556942.jpeg', '22', 'Culver City', 'Jason', 'Hwang'),
            ('New to climbing, looking for an indoor climbing partner!', 'https://climberfinder.s3.us-east-1.amazonaws.com/1656362647814.jpeg', '29', 'Irvine', 'Jeremy', 'Fisher'),
            ('Looking for other people to climb with!', 'https://climberfinder.s3.us-east-1.amazonaws.com/1656363388444.jpg', '26', 'Irvine', 'Irwin', 'Chen');

insert into "skillLevels" ("label")
     values ('beginner'),
            ('intermediate'),
            ('advanced');

insert into "userTags" ("userId", "tagId")
     values ('1','1'),
            ('1','3'),
            ('1','5'),
            ('2','1'),
            ('2','3'),
            ('3','5'),
            ('3','6'),
            ('4','2'),
            ('4','4');
