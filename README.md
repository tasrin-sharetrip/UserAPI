# UserAPI
**API for user registration, login, get, update, delete in ExpressJS with Sequelize ORM.**

# 1. Create a Registration API which use the following body
  A. first_name <br>
  B. last_name <br>
  C. email <br>
  D. password <br>
  E. NID <br>
  F. profile photo <br>
  G. Age <br>
  H. Current marital status <br>
  I. auth_token <br>

**NB.**
  a. Email and Password will be on auth table and the rest are on the profile table <br>
  b. Be ensure that, if one table insertion is failed then the other will not insert(ACID 
  properties of DBMS) <br>
  c. password should be encrypted with Crypto Library <br>
  d. For photo upload use Multer Library <br>
  e. Storing photos in local storage and save the path on table <br>
  f. Using a generic response for failed and success individually <br>
  g. Success code should be 200 <br>
  h. using sequelize ORM <br>

# 2. Create a Login API which contains the following body
  A. email <br>
  B. password <br>
**NB.**
  a. If email and password matched then return a random UUID so that next time we can use <br>
  it for login and store this on auth_token in Auth table <br>

# 3. Create an Update api which contains the route like
“your-local-route/:user_id/” <br>
And the body will contains the data from your profile table. <br>
**NB.** Be sure that one user cannot update data of other users.

# 4. Create a Delete api so that any one can delete his/her account
The route will the like the update api <br>

# 5. Create an API so that user can see his/her profile
**NB.** Make sure that password will not in the response.
