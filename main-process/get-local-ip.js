let ip;
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
   ip = add;
})
module.exports = ip;