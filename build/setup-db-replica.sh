#!/bin/bash
export $(cat .env | xargs)
# schema="./dbSchema.json"
# schemaFile=$(cat "$schema")

checkServerStatus(){
	SERVER=$1
	PORT=$2
	mongosh --host $SERVER --port $PORT --eval db
	while [ "$?" -ne 0 ]
	do
		echo "Waiting for $SERVER to start up ======>>>>>>>"
		sleep 1
		mongosh --host $SERVER --port $PORT --eval db
	done
}

checkServerStatus "mongodblocal1" "28017"
checkServerStatus "mongodblocal2" "28018"
checkServerStatus "mongodblocal3" "28019"
printenv
mongosh --host mongodblocal1 --port 28017 <<EOF
   var cfg = {
        "_id": "mongodbReplica",
        "version": 1,
        "members": [
            {
                "_id": 0,
                "host": "mongodblocal1:28017",
                "priority": 2
            },
            {
                "_id": 1,
                "host": "mongodblocal2:28018",
                "priority": 0
            },
            {
                "_id": 2,
                "host": "mongodblocal3:28019",
                "priority": 0
            }
        ]
    };

    rs.initiate(cfg, { force: true });
    rs.status();
EOF

sleep 10

# mongosh --host mongodblocal1 --port 28017 <<EOF
#    use ${DB_NAME};
#    db.getSiblingDB('${DB_NAME}');
#    db.createUser({
# 	    user: '${DB_USER}',
#         pwd: '${DB_PASSWORD}',
#         roles: [ { role: "readWrite", db: '${DB_NAME}' } ]
#      }
#     );
#     db.getSiblingDB('${DB_NAME}').auth('${DB_USER}', '${DB_PASSWORD}');
#     db.createCollection("items", {
#         validator: ${schemaFile}
#     });
# EOF

mongosh --host "mongodblocal1" --port "28017" "./setup-db.js"