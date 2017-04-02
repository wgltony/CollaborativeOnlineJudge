fuser -k 80/tcp
fuser -k 5000/tcp
fuser -k 5001/tcp
fuser -k 5002/tcp

service nginx start
service redis_6379 start
cd ./oj-server
npm install
nodemon server.js &
cd ../oj-client
npm install
ng build --watch &
cd ../executor
pip install -r requirement.txt
python executor_server.py 5000 &
python executor_server.py 5001 &
python executor_server.py 5002 &


echo "================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

fuser -k 80/tcp
fuser -k 5000/tcp
fuser -k 5001/tcp
fuser -k 5002/tcp
service redis_6379 stop
service nginx stop
