
### Client

In my Transfer.jsx I implmented signing a transaction and recovering the public key from it. Sending this public key to my API.

### Server

In my Index.js I checked if the entered Public Key matches with the recovered Public Key from my Signature. So no one can send founds if they dont have the right private key to the entered public key.

.
