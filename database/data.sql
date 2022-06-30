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

insert into "user" ("hashedPassword", "userName", "userDescription", "imageUrl", "age", "city", "firstName", "lastName")
     values ('$argon2i$v=19$m=4096,t=3,p=1$aqHw3iBNO88qbdogYQwo0A$83gbF2+fWLdvr/ht198BxZGq4d6C6U/99Rn7kHu+0ps', 'tester', 'Looking for people to climb with !', 'https://climberfinder.s3.us-east-1.amazonaws.com/1656577108296.jpeg', '25', 'Culver City', 'Raymond', 'Chang'),
            ('$argon2i$v=19$m=4096,t=3,p=1$tVz9RON2iamran/d6h/yYw$Sby1JpPKjXMXR8RbR5zKjdKOPxRGWqhLnzR7E4SzdKg', 'tester2', 'Looking for something new!', 'https://climberfinder.s3.us-east-1.amazonaws.com/1656577395773.jpg', '21', 'Mission Viejo', 'Olivia', 'Olivares');


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
            ('4','4'),
            ('5','1'),
            ('5','2'),
            ('5','5'),
            ('6','2'),
            ('6','4');
