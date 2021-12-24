//Тоглоом дууссан эсэхийг хадгалах төлөвийн хувьсагч
var isNewGame;

var activePlayer;
var scores;
var roundScore;

//Шооны зургийг үзүүлэх элементийг DOM-оос хайж олоод энд хадгалъя
var diceDom = document.querySelector(".dice");
//Тогломыг эхлүүлнэ
initGame();

//Тоглоом эхэллээ гэдэг төлөвт оруулна.
isNewGame = true;

function initGame() {
  //Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчийг 0, хоёрдугаар тоглогчийг 1 гэж тэмдэглэе.
  activePlayer = 0;

  //Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
  scores = [0, 0];

  //Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
  roundScore = 0;

  //Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй, 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө.
  var diceNumber = Math.floor(Math.random() * 6) + 1;

  // Програм эхлэхэд бэлтгэх
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //Тоглогчдын нэрийг буцааж гаргах
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");

  diceDom.style.display = "none";
}

// Шоог шидэх эвент листенер
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (isNewGame === true) {
    // 1-6 доторх санамсаргүй нэг тоог гаргаж авна
    var diceNumber = Math.floor(Math.random() * 6) + 1;

    // шооны зургыг вэб дээр гаргаж ирнэ
    diceDom.style.display = "block";

    // Буусан санамсаргүй тоонд харгалзах шооны зургийг вэб дээр гаргаж ирнэ
    diceDom.src = "dice-" + diceNumber + ".png";

    // Буусан тоо нь 1-ээс ялгаатай бол идэвхитэй Тоглогчийн ээлжийн оноог өөрчилнө
    if (diceNumber !== 1) {
      //1-ээс ялгаатай тоо буулаа. Буусан тоог тоглогчид нэмж өгнө.
      roundScore = roundScore + diceNumber;
      document.getElementById("current-" + activePlayer).textContent =
        roundScore;
    } else {
      //1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө.

      switchToNextPlayer();
    }
  } else {
    alert("Тоглоом дууссан байна. New game товчийг дарж шинээр эхлэнэ үү");
  }
});

// HOLD товчны эвент листенер
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (isNewGame === true) {
    //Уг тоглогчийн цуглуулсан ээлжний оноог глобаль оноон дээр нь нэмж өгнө.
    scores[activePlayer] = scores[activePlayer] + roundScore;

    //Дэлгэц дээр оноог нь өөрчилнө
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    //Уг тоглогч хожсон эсэхийг шалгах
    if (scores[activePlayer] >= 100) {
      //Тоглоомыг дуусан төлөвт оруулна
      isNewGame = false;

      // Ялагч гэсэн текстийг нэрнийх нь оронд гаргана
      document.getElementById("name-" + activePlayer).textContent =
        "WINNER !!!";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
    } else {
      // Тоглогчийн ээлжийг сольно
      switchToNextPlayer();
    }
  } else {
    alert("Тоглоом дууссан байна. Та New game товчийг дарна уу");
  }
});

// Энэ функц нь тоглох ээлжийг дараачийн тоглогч руу шилжүүлдэг.
function switchToNextPlayer() {
  //Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;
  //Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ.
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  //Улаан цэгийг шилжүүлэх
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // Шоог түр алга болгоно
  diceDom.style.display = "none";
}

//New game эхлүүлэх товчны эвент листенер
document.querySelector(".btn-new").addEventListener("click", initGame);
