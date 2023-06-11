# pangea-securathon
This is a kind of social media type project. The main goals is to track your emotions. You can upload posts, make friends in this web app. It is built using pangeas 4 apis they are listed below.

(1).Secure Audit Log <br>
(2).User Intel <br>
(3).Url Intel <br>
(4).Redact <br>

There are two main folders: 1.pangea-securathon-backend & 2.pangea-securathon-frontend.
All pangeas apis are used inside "/pangea-securathon-backend" folder. 
Everything is described below relative to "/pangea-securathon-backend" folder.
There is a file "pangea/pangea.js" which posses all the required pangea api services and exports them, that are to be used in different files.

[***Please note you can also directly search "pangea service" or "pangea" exacly to look up where I have used pangea services incase you have difficulties finding them. Everywhere I used pangeas's apis I have mentioned -"pangea service" along with its type of service.]

The files where I have used pangeas apis are listed below <br>
(1) ./server.js (/pangea-securathon-backend/server.js) (services -> audit log api) : --- Line no 48 --- <br>
(2) ./database.js (services -> audit log api) : --- Line no 11,22 --- <br>
&nbsp;&nbsp; In the above two I am loging the server and database connection statementsn using <b>audit log</b>.
(3) ./routes/otherUserRoute.js (services -> redact api) : --- Line no 47 --- <br>
&nbsp;&nbsp; When one user try to view profile of other use (if they are not friend) then whose profile is being viewed, his/her email id will be hidden using <b>redact api</b>.
(4) ./routes/postRoute.js (services -> url intel,audit) : --- Line no 50 to 60 ,63, 173 --- <br>
&nbsp;&nbsp; When one user tries to uploads an post along with added link, this link is checked using pangea <b>url intel</b> api to detect whether it is malicious or not. If link found malicious then post upload will be discarded with a message.

(5) ./routes/userRoute.js (services -> audit log, user intel) : ---line no 41, 56 to 59, 65, 90, 126,   176, 195, 212 <br>
&nbsp;&nbsp; When a new user registers then behind the server it's email address is checked using <b>user intel</b> api whether it is breached or not?

