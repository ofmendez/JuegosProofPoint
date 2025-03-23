import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js'
import { getDatabase, set, ref, onValue, child, push, update, remove, goOffline , goOnline} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js'
import {loadCredentials} from './files.js'

let firebaseConfig = {}
let database ={}
let app = {}
let existDatabase = false;
let isOnline = true;


export const toggleOnlineState = (online) => {
    // return new Promise((resolve,reject)=>{
        console.log("toggleOnlineState: "+online);
        getDB().then((db)=>{
            if (online) {
                goOnline(db);
                console.log("goOnline!!!!!!!!!  1");
            } else {
                goOffline(db);
                console.log("goOffline!!!!!!!!! 2");
            }
            // resolve();
            isOnline = online;
        }).catch((e)=> console.log("error getDB_1: "+e));
    // });
};


const getDB = function (){
    return new Promise((resolve,reject)=>{
        if (existDatabase){
            resolve(database);
        } else{
            existDatabase =true;
            loadCredentials().then((res)=>{
                firebaseConfig =res;
                app = initializeApp(firebaseConfig);
                database = getDatabase(app);
                resolve(database);
            }).catch((e)=> reject("error getDB_2: "+e));
        }
    });
};

export function getUserData() {
    // return true;
    console.log("hijole");
    return new Promise((resolve,reject)=>{
        getDB().then((db)=>{
            if(!isOnline) 
                toggleOnlineState(true);
            const starCountRef = ref(db, '/users');
            onValue(starCountRef, (snapshot) => {
                resolve(snapshot.val())
            }, {
                onlyOnce: false
            });
        }).catch((e)=> reject("error getDB: "+e))
    });
}

export function getAllUsers() {
  return new Promise((resolve,reject)=>{
        getDB().then((db)=>{
            const starCountRef = ref(db, '/users');
            onValue(starCountRef, (snapshot) => {
                resolve(snapshot.val())
            }, {
                onlyOnce: false
            });
        }).catch((e)=> reject("error getDB: "+e))
    }
  );
}
  



export function updateScore(userId, game, score) {
    return new Promise((resolve,reject)=>{
        getDB().then((db)=>{
            if(!isOnline) toggleOnlineState(true)
            const updates = {};
            updates['/users/' + userId+'/g'+game] = score;
            // Object.keys(answers).forEach((a,i)=>{
            //     let index=(i+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
            //     updates['/users/' + userId+'/p'+index] = answers[a];
            // });
            update(ref(db), updates).then(()=>{
                resolve("Updated!! ")
                // goOnline().then(()=>{goOffline();}) ;
            });
        }).catch((e)=> reject("error getDB: "+e))
    });
}
export function updateLevelScore(userId, newScore) {
    return new Promise((resolve,reject)=>{
        getDB().then((db)=>{
            if(!isOnline) toggleOnlineState(true)
            const updates = {};
            updates['/users/' + userId+'/score'] = newScore;
            update(ref(db), updates).then(()=>{
                resolve("Updated!! ");
                // goOnline().then(()=>{goOffline();});
            });
        }).catch((e)=> reject("error getDB: "+e))
    });
}

export function DeleteUser(userId) {
    return true;

    return new Promise((resolve,reject)=>{
        getDB().then((db)=>{
            set(ref(db, 'users/' + userId),  null ).then((res)=> resolve("DELETED!!"));
        }).catch((e)=> reject("error getDB: "+e))
    });
}

export function createUserData(_id, _username, company, employees) {
    console.log("createuser: "+_id);
    return new Promise((resolve,reject)=>{
        getDB().then((db)=>{
            console.log("createuser isOnline: "+isOnline);
            while(!isOnline){
                toggleOnlineState(true);
            } 
            set(ref(db, 'users/' + _id), {
                name : _username,
                company : company,
                employees : employees,
                g01 : -1,
                g02 : -1,
                g03 : -1,
                
            }).then((res)=> resolve("writted"));
        }).catch((e)=> reject("error getDB: "+e))
    });
}


// export {createUserData }