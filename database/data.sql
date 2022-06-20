insert into "tags" ("label")
     values ('bouldering'),
            ('toprope'),
            ('lead climbing'),
            ('indoor'),
            ('outdoor'),
            ('belaying');

insert into "user" ("hashedPassword","userName","userDescription", "imageUrl", "age", "city", "firstName", "lastName")
     values ('$argon2i$v=19$m=4096,t=3,p=1$EhVLAb6Ms7IfMqQqP3MnjA$ZXESe2d9UsgRHLTvHFhH8FXurVojBnbgFGPvsJyVCzQ', 'julianking', 'looking for people to climb with!', 'image-1655702494410.jpeg', '25', 'Albaquerque', 'Julian', 'King'),
            ('$argon2i$v=19$m=4096,t=3,p=1$fD8WnhXvOukfD5cqOqfyDQ$Qxl0mJbtLSsxeY+AE3YjmrCVgwlvwgJXgEuSNZoX2QY', 'jasonhwang', 'Avid rock climber, looking for a belayer!', 'image-1655702756574.jpeg', '22', 'Culver City', 'Jason', 'Hwang'),
            ('$argon2i$v=19$m=4096,t=3,p=1$HDTex9ZRYBEYVFQGVbWSiA$zvk+LEr73di/9ix6wDKJOAnm2kw0aqFV/PA8DnO40xc', 'jeremy', 'New to climbing, looking for an indoor climbing partner!', 'image-1655702968063.jpeg', '29', 'Irvine', 'Jeremy', 'Fisher'),
            ('$argon2i$v=19$m=4096,t=3,p=1$iEULQNO7IHStaMfbpdSocQ$2Gll0lcDZqvbkeKPrfUKQDU7Qu2l8FyxVuXWq0serXQ', 'irwinchen', 'Looking for other people to climb with!', 'image-1655749201506.jpg', '26', 'Irvine', 'Irwin', 'Chen');

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
