var totalStd = document.getElementById("totalstd")

async function GetAllUsers() {

    await firebase.database().ref("user").get().then((db) => {
        console.log(db.val())
        var data = Object.values(db.val())
        console.log(data.length)
        totalStd.innerText=data.length
    })
        .catch((e) => {
            console.log(e)
        })

}

GetAllUsers()