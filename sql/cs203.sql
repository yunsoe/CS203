drop schema if exists cs203;
create schema if not exists cs203;
use cs203;


drop table if exists `industry`;
create table `industry`
(
    `industry_id` int auto_increment primary key,
    `name` varchar(255)   
);

drop table if exists `company`;
create table `company`
(
    `company_id` int auto_increment primary key,
    `industry_id` int,
    `name` varchar(255),
    foreign key(`industry_id`) references `industry`(`industry_id`)

);


drop table if exists `user`;
create table `user` (
    `user_email` varchar(255) primary key,
    `company_id` int,
    `name` varchar(255) ,
    `password` varchar(255),
    `role` varchar(255),
    `authorities` varchar(255),
    foreign key (`company_id`) references `company`(`company_id`)

);


drop table if exists `alert`;
create table `alert`
(
    `alert_id` int auto_increment primary key,
    `user_email` varchar(255),
	`alert_date` varchar(255),
    -- alert_date datetime,
	`alert` varchar(255),
    foreign key(`user_email`) references `user`(`user_email`)
);


drop table if exists `event`;
create table `event`
(
    `event_id` int auto_increment primary key,
    `company_id` int,
    `event` varchar(255),
    `event_date` varchar(255),
    -- event_date date,
    `location` varchar(255),
    foreign key(`company_id`) references `company`(`company_id`)
);

drop table if exists `user_events`;
create table `user_events`
(
    `user_email` varchar(255),
    `event_id` int,
    primary key(`user_email`, `event_id`),
    foreign key(`user_email`) references `user`(`user_email`),
    foreign key(`event_id`) references `event`(`event_id`)

);


drop table if exists `feedback`;
create table `feedback`
(
    `feedback_id` int auto_increment primary key,
    `user_email` varchar(255),
    `title` varchar(255),
    `details` varchar(500),
    foreign key(`user_email`) references `user`(`user_email`)
);


drop table if exists `news`;
create table `news`
(
    `news_id` int auto_increment primary key,
    `industry_id` int,
    `title` varchar(255),
    `link` varchar(255),
    `image` varchar(2083),
    `category` varchar(255),
    `cases_quarantined` int,
    `cases_hosp_critical` int,
    `cases_hosp_not_critical` int,
    `deaths` int,
    `date` date,
    `time` time,
    foreign key(`industry_id`) references `industry`(`industry_id`)

);


drop table if exists `swabtest`;
create table `swabtest`
(
    `swab_test_id` int auto_increment primary key,
    `user_email` varchar(255),
    `swab_result` boolean,
    `actual_swab_date` DateTime,
    foreign key(`user_email`) references `user`(`user_email`)

);

drop table if exists `swab_test_detail`;
create table `swab_test_detail`
(
        `swab_test_detail_id` int auto_increment primary key,
        `user_email` varchar(255),
        `alert_day` varchar(255),
        -- start_date datetime,
        `alert_time` varchar(255),
        `message` varchar(255),        
        foreign key(`user_email`) references `user`(`user_email`)

);

INSERT INTO cs203.user (user_email, company_id, name, password, role, authorities) values("sysadmin@gmail.com", null, "System Admin", "$2a$10$UtCL3sA3cwDPo96SvLvOEuV.obyqa0R73VqAFhj/tQSZYS8g5VUve", null, "ROLE_SYSADMIN");

INSERT INTO cs203.industry (name) values("Construction");
INSERT INTO cs203.industry (name) values("Education");
INSERT INTO cs203.industry (name) values("Food & Beverage");
INSERT INTO cs203.industry (name) values("Pharmaceutical");
INSERT INTO cs203.industry (name) values("Entertainment");
INSERT INTO cs203.industry (name) values("Manufacturing");
INSERT INTO cs203.industry (name) values("Telecommunication");
INSERT INTO cs203.industry (name) values("Agriculture");
INSERT INTO cs203.industry (name) values("Transportation");
INSERT INTO cs203.industry (name) values("Computer & Technology");
INSERT INTO cs203.industry (name) values("Healthcare");
INSERT INTO cs203.industry (name) values("Media & News");
INSERT INTO cs203.industry (name) values("Hospitality");
INSERT INTO cs203.industry (name) values("Energy");
INSERT INTO cs203.industry (name) values("Fashion");
INSERT INTO cs203.industry (name) values("Finance & Economic");
INSERT INTO cs203.industry (name) values("Advertising & Marketing");
INSERT INTO cs203.industry (name) values("Mining");
INSERT INTO cs203.industry (name) values("Aerospace");
select * from swabTest
