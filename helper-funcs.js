/**
 * Created by Kike on 12/19/17.
 */
//Catching 500 errors
function returnError(error){
    return {
        success:false,
        error,
        status:500
    }
}

function wait(secs){
    return new Promise((resolve,reject)=> setTimeout(()=>{resolve()},  secs*1000))
}

module.exports = {returnError,wait}