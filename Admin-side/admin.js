async function createAdmin() {
    // var adminName = document.getElementById("admin").value
    await firebase.auth().createUserWithEmailAndPassword("burger-admin@admin.com", "admin123")
    .then(async (snap) => {
        await firebase.database().ref("admin").child(snap.user.uid).set({
            name: "Burger Admin",
            email: "burger-admin@admin.com",
            role: "admin"

        });
        alert("Admin Created Successfully")
    });
    var email = document.getElementById("adminEmail").value
    var password = document.getElementById("adminPassword").value
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async (login) => {
        console.log(login.user.uid)
        await firebase.database().ref("admin").child(login.user.uid).get()
        .then((snap) => {
            console.log(snap.val())
            .catch((e) => {
                console.error("Error fetching admin data:", e)
            })
            localStorage.setItem("loginuser", login.user.uid)
        }


    