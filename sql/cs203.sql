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
    `details` varchar(255),
    foreign key(`user_email`) references `user`(`user_email`)

);


drop table if exists `news`;
create table `news`
(
    `news_id` int auto_increment primary key,
    `industry_id` int,
    `news` varchar(255),
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
        `start_date` varchar(255),
        -- start_date datetime,
        `period` varchar(255),
        foreign key(`user_email`) references `user`(`user_email`)

);


