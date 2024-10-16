## Library Management Web Application

## About The Project

Effortlessly manage your library with **Librarry**, a modern library management system designed for librarians.<br>
Keep your collection organized, handle member records, and facilitate seamless transactions. <br>
<br> ![Screen Shot](https://github.com/nikeshsharma192002/Library-Management-Web-Application/blob/main/assets/Photo1.png) 
<br>


### _Librarry features:_


* **_Books Management_**:    &nbsp; &nbsp; Easily maintain, update, and track books with essential details.<br>

* **_Members Management:_**  &nbsp;Keep member profiles and outstanding dues in check.<br>

* **_Debt Control:_**        &nbsp;&nbsp;Ensure financial stability with a Rs. 500 debt limit per member.<br>

* **_Transactions:_**        &nbsp;Smoothly process book issuance and returns.<br>

* **_Search:_**              &nbsp; &nbsp; &nbsp;Quickly locate books by title or author.<br>

* **_import:_**              &nbsp; &nbsp; &nbsp;Import books from Frappe API.<br>



## Built With

_**Frontend:**_ &nbsp;React, Material UI, HTML, CSS <br>
**_Backend:_** &nbsp;Node.js, Express.js, MongoDB, Mongoose <br>

## Screen Shots
#### Book Management: _Maintain, Update, and Track books._ <br>
![image](https://github.com/nikeshsharma192002/Library-Management-Web-Application/blob/main/assets/Photo1.png)
<br>

#### Members Management: _Add, Edit and delete member details_ <br>
![image](https://github.com/nikeshsharma192002/Library-Management-Web-Application/blob/main/assets/Photo2.png)
![image](https://github.com/nikeshsharma192002/Library-Management-Web-Application/blob/main/assets/Photo3.png)
![image](https://github.com/nikeshsharma192002/Library-Management-Web-Application/blob/main/assets/Photo4.png)
<br>

#### Debt Control: _Limit debt to Rs. 500 per member_ <br>
![image](https://github.com/nikeshsharma192002/Library-Management-Web-Application/blob/main/assets/Photo5.png)
<br>

#### Transactions: _Shows member's email, book Issued and outstanding debt_ <br>
![image](https://github.com/nikeshsharma192002/Library-Management-Web-Application/blob/main/assets/Photo6.png)
<br>

#### Search: _Search Books by title, authors and publisher_ <br>
![image](https://github.com/nikeshsharma192002/Library-Management-Web-Application/blob/main/assets/Photo7.png)
<br>

#### Import: _Import Books by using ISBN form API_ <br>
![image](https://github.com/nikeshsharma192002/Library-Management-Web-Application/blob/main/assets/Photo8.png)
<br>



## Getting Started

To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo

```sh
https://github.com/nikeshsharma192002/Library-Management.git
```
2. Install NPM packages

```sh
cd server
npm install --prefix client
npm install
```
3. Create .env file <br/>
File should be root of 'server' folder
```
#ADD FOLLOWING

REACT_APP_BASE_URL = "http://localhost:80/"
```
4. Create .env.local<br/>
Database File : /server/data/index.js
```
#ADD FOLLOWING

MONGO_URL = "mongodb+srv://{user}:{password}@{database}.5qdwl8g.mongodb.net/library?retryWrites=true&w=majority"
PORT = 80
NODE_ENV = "production"

```
5. RUN

```
npm start
```
OR
```
npm run dev
```



