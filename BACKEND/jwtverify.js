const jwt = require('jsonwebtoken')
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2Y0MDQyYzA3ZDZjOTFhMTU3NWRlNCIsImlhdCI6MTcyNjgzODk2MCwiZXhwIjoxNzI2ODQyNTYwfQ.ubtGD0B4HBBbNRLjvxhiNG3CFmor8YpZu_zldFWunyc";

(async()=>{
    let res = jwt.verify(token,'g3g3h3dwe')
    console.log(res);
})();