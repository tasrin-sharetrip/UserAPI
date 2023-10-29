# UserAPI
API for user registration, login, get, update, delete in ExpressJS with Sequelize ORM.

# 1. Create a Registration API which use the following body
  A. first_name
  B. last_name
  C. email
  D. password
  E. NID
  F. profile photo
  G. Age
  H. Current marital status
  I. auth_token

**NB.**
  a. Email and Password will be on auth table and the rest are on the profile table
  b. Be ensure that, if one table insertion is failed then the other will not insert(ACID
  properties of DBMS)
  c. password should be encrypted with Crypto Library
  d. For photo upload use Multer Library
  e. Storing photos in local storage and save the path on table
  f. Using a generic response for failed and success individually
  g. Success code should be 200
  h. using sequelize ORM

# 2. Create a Login API which contains the following body
  A. email
  B. password
**NB.**
  a. If email and password matched then return a random UUID so that next time we can use
  it for login and store this on auth_token in Auth table

# 3. Create an Update api which contains the route like
“your-local-route/:user_id/”
And the body will contains the data from your profile table.
**NB.** Be sure that one user cannot update data of other users.

# 4. Create a Delete api so that any one can delete his/her account
The route will the like the update api

# 5. Create an API so that user can see his/her profile
**NB.** Make sure that password will not in the response.
