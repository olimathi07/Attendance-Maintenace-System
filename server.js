const mongoose = require('mongoose');
const DB_URL="mongodb://0.0.0.0:27017/ob";
mongoose.connect(DB_URL);
const conn=mongoose.connection;
conn.once('open',()=>{
  console.log('connected to database ');

})
conn.once('error',(error)=>{
  console.log('error connecting to database',(error));
})