import User from "../types/user.type";
import db from '../database/index';
import config from "../config/config";
import bcrypt from 'bcrypt';
const hashPassword =(password:string)=>{
    const salt = parseInt(config.salt as string ,10);
    return bcrypt.hashSync(`${password}${config.pepper}`,salt);
}
class UserModel{
    
    // create
    async create(user:User):Promise<User>{
        try{ 
            // open connection with db
            const connection =await db.connect();
            const sql  = `INSERT INTO users(email,user_name,first_name,last_name ,password)
            values ($1,$2,$3,$4,$5) returning id,email,user_name,first_name,last_name ;`
            const result = await connection.query(sql,[
                user.email,
                user.user_name,
                user.first_name,
                user.last_name,
                hashPassword(user.password)
            ]);
            connection.release();
            return result.rows[0];
            // run query 
            // relese connection
            //return user
        }catch(error){
            throw new Error(`unable to create user`);
        }
    } 
    // get all users 
    async getMany():Promise<User[]>{
        try{ 
            // open connection with db
            const connection =await db.connect();
            const sql  = `SELECT * FORM users returning id,email,user_name,first_name,last_name ;`
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
            // run query 
            // relese connection
            //return user
        }catch(error){
            throw new Error(`unable to show all user`);
        }
    }
    // get specifc user 
    async getOne(id:string):Promise<User>{
        try{ 
            // open connection with db
            const connection =await db.connect();
            const sql  = `SELECT id,email,user_name,first_name,last_name FORM users where id= ($1) ;`
            const result = await connection.query(sql);
            connection.release();
            return result.rows[0];
            // run query 
            // relese connection
            //return user
        }catch(error){
            throw new Error(`unable to show all user`);
        }
    }
    //update user users
    async updateOne(user:User):Promise<User>{
        try{ 
            // open connection with db
            const connection =await db.connect();
            const sql  = `UPDATE users SET email=$1,user_name=$2,first_name=$3,last_name=$4,password=$5 where 
            id=$6 returning id ,user_name,first_name,last_name;`
            const result = await connection.query(sql,[
                user.email,
                user.user_name,
                user.first_name,
                user.last_name,
                hashPassword(user.password)
            ]);
            connection.release();
            return result.rows[0];
            // run query 
            // relese connection
            //return user
        }catch(error){
            throw new Error(`unable to show all user`);
        }
    }
    //delete user
    async deleteOne(id:string):Promise<User>{
        try{ 
            // open connection with db
            const connection =await db.connect();
            const sql  = `DELETE FROM users where id=($1) returning id ,user_name,first_name,last_name;`
            const result = await connection.query(sql,[id]);
            connection.release();
            return result.rows[0];
            // run query 
            // relese connection
            //return user
        }catch(error){
            throw new Error(`unable to show all user`);
        }
    }
}export default UserModel;