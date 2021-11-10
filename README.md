# CS203
Instructions to run:

1. Run `mvn spring-boot:run`.

2. Go to`/frontend`and run`yarn install`, followed by `yarn start`.

Note:

1. Amazon RDS database is slow, may take some time for forms to load completely / submit.

2. System admin account (not the same as a company admin):
   
   Username: sysadmin@gmail.com
   
   Password: P@ssw0rd123@
   
3. Feedbacks for the application submitted via the feedback form are sent to this email:
   
   Username: cs203g2t6@gmail.com
   
   Password: Cs203123@
   
4. To point the frontend to a deployed API, replace the following line in frontend\src\constants\apiConstants.js

   `export const API_BASE_URL = 'http://<deployed api ip address>:8080/';`
