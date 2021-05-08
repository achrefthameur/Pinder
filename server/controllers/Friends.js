const connection = require('../Database')
const controllers = require('./users')
module.exports={
        GetUserFriends : (id)=>{
            return new Promise ((resolve,reject) => {
                            connection.query(`Select *  FROM Friends  INNER JOIN users where (Friends.userOne=? or Friends.userTwo=?) and ((users.id=Friends.userOne and  Friends.userOne != ?) or (users.id=Friends.userTwo and  Friends.userTwo != ?)) `, 
                                [id,id,id,id], (err, result)=> {
                                    if(err){
                                        reject(err)
                                        return
                                    }
                                    resolve(result)
                                })
                        })
        },
        AddInvitation:(sender,receiver)=>{
            return new Promise ((resolve,reject) => {
                
                            connection.query(`INSERT INTO invitations (sender,receiver) VALUES (?,?) `, 
                                [sender,receiver], (err, result)=> {
                                    if(err) {
                                        reject(err)
                                        return
                                    }
                                       resolve(result)
                                })
                        })
        },
        AcceptInvitation:(sender,receiver)=>{
            return new Promise ((resolve,reject) => {
                
                connection.query(`DELETE FROM invitations where sender=? and receiver=? `, 
                    [sender,receiver], (err, result)=> {
                        if(err) {
                            reject(err)
                            return
                        }
                        connection.query(`INSERT INTO Friends (userOne,userTwo) VALUES (?,?) `, 
                        [sender,receiver], (err, result)=> {
                            if(err) {
                                reject(err)
                                return
                            }
                               resolve(result)
                        })
                    })
            })

        }
}