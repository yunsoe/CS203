create schema if not exists cs203;
use cs203;

drop table if exists `alert`;
create table alert
(
    -- `aid` int not null primary key,
    -- `alertDate` DateTime not null,
    -- `alert` varchar(255) not null
);

drop table if exists 'company'
create table company
(
    -- `company_id` int not null primary key,
    -- `cname` varchar(255)
);

drop table if exists 'user'
create table user
    -- `user_email` varchar(255) not null primary key,
    -- `uname` varchar(255) not null,
    -- `password` varchar(255) not null
(
);

drop table if exists 'event'
create table event
(
    -- `event_id` int not null primary key,
    -- `event_name` varchar(255),
    -- `event_date` DateTime,
    -- `location` varchar(255)
);

drop table if exists 'feedback'
create table feedback
(
    -- `feedback_id` int not null primary key,
    -- `details` varchar(255)

);

drop table if exists 'industry'
create table industry
(
    -- `industry_id` int not null primary key,
    -- `industry_name` varchar(255)   
);

drop table if exists 'news'
create table news
(
    -- `news_id` int not null primary key,
    -- `news_content` varchar(255),
    -- `news_category` varchar(255),
    -- `cases_quarantined` int,
    -- `cases_hosp_critical` int,
    -- `cases_hosp_not_critical` int,
    -- `deaths` int
);

drop table if exists 'swabtest'
create table swabTest
(
    -- `swab_test_id` int not null primary key,
    -- `swab_result` boolean not null,
    -- `actual_swab_date` DateTime not null

);


