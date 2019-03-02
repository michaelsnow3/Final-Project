# Final-Project
LHL final project

## To create the db:

In vm:
install pg:
npm install postgres
Crete user and db:
create user 'user' with encrypted password 'password'
createdb 'dbname'
Login:
psql 'username' 'dbname'

Outside of vm:
Instal pg:
sudo su -
apt-get install postgresql postgresql-contrib
Crete user and db:
create user 'user' with encrypted password 'password'
createdb 'dbname'
Login:
su - 'user'

