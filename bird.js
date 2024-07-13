function setBurung() {
    
    let random = (Math.random() * 150) + 120;  // posisi horizontal acak
    let random2 = (Math.random() * 300);    // posisi vertikal acak

    let bird1 = '<div class="bird" style="margin-left:-'
    + random 
    +'px;margin-top:'
    + random2 +'px;"></div>';
    
    let container = document.getElementById('container');
    container.innerHTML += bird1;

    let bird = document.getElementsByClassName('bird');

    for(i = 0; i<bird.length; i++) {
        gerak(bird[i], (Math.random() * 20)); 

        // Aksi saat burung di klik
        bird[i].addEventListener('click', function() {
            this.setAttribute('class', 'dor');
            
            document.getElementById("score").innerHTML = 
            parseInt(document.getElementById("score").innerHTML) + 1;

            let self = this;
            setTimeout(function() {
                self.remove();
               // ketika burung hancur tambah burung baru
               setBurung();
            }, 200);
        });
    }

}


//untuk membuat burung terus bergerak ke kanan
function gerak(el, speed) { // perubahan disini

    el.style.marginLeft = 
    (parseInt(el.style.marginLeft
        .replace("px", "")) + 1) + 'px';

    setTimeout(function() {
        gerak(el, speed); // perubahan disini
    }, speed); // perubahan disini
}


//timer berkurang
function timer() {

    let waktu = parseInt(document.getElementById("time").innerHTML);

    if(waktu > 0) {

        setTimeout(function() {
            document.getElementById("time").innerHTML = waktu - 1;
            timer();
        }, 1000);
    }else{
        
        // tampilkan halaman game over
        document.getElementById("game-over").style.display = "block";
        document.getElementById("over-user").innerHTML = document.getElementById("user").innerHTML;
        document.getElementById("over-score").innerHTML = document.getElementById("score").innerHTML;


        document.getElementById("container").innerHTML = "";
    }
}




document.getElementById('mulai').addEventListener('click', function() {

    let username = document.getElementById('username');
    let level = document.getElementById('level'); // perubahan disini
    let time = document.getElementById('time'); // perubahan disini

    if(username.value == ""){
        alert('Maaf, username harus diisi');
    }else{
        document.getElementById("welcome").remove();
        document.getElementById("user").innerHTML = username.value;  // perubahan disini
        
        // ini untuk leveling
        if(level.value == 'Easy') {
            for(i = 0; i<=5; i++) {
                setBurung();
            }
            time.innerHTML = "20";
            timer();
        }else if(level.value == 'Medium') {
            for(i = 0; i<=15; i++) {
                setBurung();
            }
            time.innerHTML = "15";
            timer();
        }else if(level.value == 'Hard') {
            for(i = 0; i<=30; i++) {
                setBurung();
            }
            time.innerHTML = "10";
            timer();
        }
    }

});


let sudahKlik = false;
document.getElementById("simpan").addEventListener('click', function(){
    
    if(sudahKlik == false) {
        
        let username = document.getElementById("over-user").innerHTML;
        var score = document.getElementById("over-score").innerHTML;

        let dataLama = localStorage.getItem('score');
        if (dataLama) {
            dataLama = JSON.parse(dataLama);
        }

        let dataBaru = [];
        let i=0;
        if(dataLama){
            for(i = 0; i < dataLama.length; i++) {

                dataBaru[i] = dataLama[i];
            }

            
        }
        dataBaru[i] = {
            'username' : username,
            'score'    : score
        };

        localStorage.setItem('score', JSON.stringify(dataBaru));
        alert('Data sudah disimpan');
        
    }else{
        alert('Data sudah di simpan sebelumnya');
    }
    sudahKlik = true;

});

let leader = JSON.parse(localStorage.getItem('score'));
let leaderboard = document.getElementById('leaderboard');
if(leader){
for(i = 0; i < leader.length; i++) {
    leaderboard.innerHTML += '<li>Username : '+leader[i].username+'<br>Score : '+leader[i].score+'</li>';
}
}