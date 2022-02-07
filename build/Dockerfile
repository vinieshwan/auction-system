FROM mongo:5.0

ADD ./.env .env

ADD ./bidSchema.js bidSchema.js
ADD ./itemSchema.js itemSchema.js
ADD ./sessionSchema.js sessionSchema.js
ADD ./itemSeed.js itemSeed.js
ADD ./setup-db.js setup-db.js

ADD ./setup-db-replica.sh setup-db-replica.sh

CMD sh setup-db-replica.sh
