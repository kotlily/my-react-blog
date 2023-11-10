# MongoDB

## Installation Docs

### Ubuntu

https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/ 


#### Verify
`sudo systemctl status mongod`

#### Start
`sudo systemctl start mongod`

#### Stop 
`sudo systemctl stop mongod`

#### Restart 
`sudo systemctl restart mongod`

#### Logs 
`sudo less /var/log/mongodb/mongod.log`


### Windows
Must disable Hyper-V, Device Guard and Credential Guard 

https://learn.microsoft.com/en-us/troubleshoot/windows-client/application-management/virtualization-apps-not-work-with-hyper-v 

https://learn.microsoft.com/en-us/windows/security/identity-protection/credential-guard/configure?tabs=intune 



### Mongo Shell 
`mongosh`

## MongoDB commands 

### Create database (react-blog-db in this case) 
`use react-blog-db`


### Insert objects into a collection (articles) 
`db.articles.insertMany([{ name: 'learn-react', upvotes: 0, comments: [] }, { name: 'learn-node', upvotes: 0, comments: [] }, { name: 'mongodb', upvotes: 0, comments: [] }])`
 

### Show collection objects (for articles collection) 
`db.articles.find({})`
 

### search by criteria 
`db.articles.find({name: 'learn-react'})`