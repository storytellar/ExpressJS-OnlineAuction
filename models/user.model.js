const db = require('../utils/db');

const bcrypt = require('bcryptjs');
module.exports.hashPassword = async (password) => {
    try {
      const salt = await bcrypt.genSalt(10)
      return await bcrypt.hash(password, salt)
    } catch(error) {
      throw new Error('Hashing failed', error)
    }
  }

// Example
// Nếu muốn dùng hàm này phải dùng async await
// module.exports.all = async () => {
//   db.load('select * from users')
// };

module.exports.isAvailable = async email => {
    const raw = await db.load(`SELECT COUNT(*) AS count FROM user WHERE user.email = '${email}' `);

    if (raw[0].count == 0) {
        console.log(raw[0].count);
        return true;
    }
    else {
        console.log(raw[0].count);
        return false;
    }
}

module.exports.addUser = async user => {
    userEntity =  {
        
            
            username: user.email,
            password: user.password,
            email: user.email,
            isSeller: 0,
            firstName: user.firstname,
            lastName: user.lastname,
            address: user.address
      
    };


    await db.add(userEntity, 'user');
}

module.exports.getAdminName = async adminName => {
    const rows = await db.load(`SELECT * FROM admin a WHERE a.adminName = '${adminName}'`);
    console.log(rows);
    if (rows.length > 0) {
        return rows[0];
    }

    return null;
}