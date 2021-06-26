const size = 20,              // ბადის ზომა (კვარდრატული ბადეა)
    dotsNum = 15,           // რამდენი წერტილი აინთოს
    attemps = 16,           // ცდების რაოდენობა
    squareSituations = 5;   // იმ შემთხვევების რაოდენობა, რამდენშიც კვადრატი უნდა მოვიდეს

let counter = 1,            // მერამდენე შემთხვევას ვაკეთებთ
    randSquareSituations = getSquareSituations(attemps, squareSituations), // იმ შემთხვევების შემთხვევითი ნომრები, როცა კვადრატი მოდის
    clicks = 0,
    isSquareCreated = false, // არის თუ არა აგებული კვადრატი მოცემულ განაწილებაში
    startTime,
    answers = [];

function onLoadBody() {
    drawPlatform(); // ბადის დახატვა
    loadSituation(); // ახალი განაწილების დახატვა
}

function loadSituation() {
    clearDots();
    if (counter > attemps) {
        submitAnswers(answers);
        answers = [];
        counter = 1;
        randSquareSituations = getSquareSituations(attemps, squareSituations);
        alert('ტესტი დასრულდა!');
        loadSituation();
    } else {
        if (randSquareSituations.indexOf(counter) === -1) {
            createNotSquare();
        } else {
            createSquare();
        }
        counter++;
    }
}

// ბადის დახატვის ფუნქცია
function drawPlatform() {
    let height = size * 9 + (size - 1) * 20;
    document.getElementsByClassName('dots')[0].style.height = height + 'px';
    document.getElementsByClassName('dots')[0].style.width = height + 'px';
    document.getElementsByClassName('rectSvg')[0].style.height = height + 'px';
    document.getElementsByClassName('rectSvg')[0].style.width = height + 'px';
    for (let i = 1; i <= size; i++) {
        for (let j = 1; j <= size; j++) {
            document.getElementsByClassName('dots')[0].innerHTML += '<span class="dot i' + intStandart(i) + ' j' + intStandart(j) + '"></span>'
        }
    }
    for (let i = 0; i < size; i++) {
        document.getElementsByClassName('i' + size)[i].style.margin = '0px 20px 0px 0px';
        document.getElementsByClassName('j' + size)[i].style.margin = '0px 0px 20px 0px';
    }
    document.getElementsByClassName('i' + size + ' ' + 'j' + size)[0].style.margin = '0px 0px 0px 0px';
}

// კვადრატიანი განაწილების შექმნის ფუნქცია
function createSquare() {
    let dots = [];
    for (let i = 1; i <= 2; i++) {
        dots[i - 1] = createNotSquareDot(dots);
    }
    loop1:
        for (let i = 1; i <= size; i++) {
            for (let j = 1; j <= size; j++) {
                let dot = {i: i, j: j};
                if (isThirdDotForSquare(dots[0], dots[1], dot)) {
                    dots[2] = dot;
                    break loop1;
                }
            }
        }
    if (dots.length === 3) {
        loop1:
            for (let i = 1; i <= size; i++) {
                for (let j = 1; j <= size; j++) {
                    let dot = {i: i, j: j};
                    if (isSquare(dots[0], dots[1], dots[2], dot)) {
                        dots[3] = dot;
                        break loop1;
                    }
                }
            }
        if (dots.length === 4) {
            isSquareCreated = true;
            let newDots = pointsToSvg(dots);
            let points = dotCoordsToPixels(newDots[0]) + ' ' + dotCoordsToPixels(newDots[1]) + ' '
                + dotCoordsToPixels(newDots[2]) + ' ' + dotCoordsToPixels(newDots[3]);
            document.getElementsByClassName('rectSvg')[0].innerHTML = "<polygon class=\"rectPolygon\" points=\"" + points + "\" onclick=\"onClickSvg()\"/>";
            for (let i = 5; i <= dotsNum; i++) {
                dots[i - 1] = createNotSquareDot(dots);
            }
            drawDots(dots);
        } else {
            createSquare();
        }
    } else {
        createSquare();
    }
}

// კოორდინატების პიქსელებში გადასაყვანი ფუნქცია
function dotCoordsToPixels(dot) {
    return ((dot.j - 1) * 29 + 4) + ',' + ((dot.i - 1) * 29 + 4);
}

// კოორდინატების თანმიმდევრობის განაწილება(კვარდარტის ოთხი წერტილი მიყოლებით რომ იყოს SVG-ს ასაგებად)
function pointsToSvg(dots) {
    let a = dots[0],
        b = dots[1],
        c = dots[2],
        d = dots[3],
        ab = lengthBetween(a, b),
        ac = lengthBetween(a, c),
        ad = lengthBetween(a, d),
        bc = lengthBetween(b, c),
        bd = lengthBetween(b, d),
        cd = lengthBetween(c, d),
        sides = [ab, ac, ad, bc, bd, cd],
        newDots = [];
    sides.sort(function (a, b) {
        return a - b
    });
    newDots[0] = a;
    for (let i = 0; i < dots.length; i++) {
        if ((dots[i] !== a) && lengthBetween(dots[i],a) === sides[0]) {
            newDots[1] = dots[i];
        }
    }
    for (let i = 0; i < dots.length; i++) {
        if ((dots[i] !== a) && (dots[i] !== newDots[1]) && lengthBetween(dots[i],newDots[1]) === sides[0]) {
            newDots[2] = dots[i];
        }
    }
    for (let i = 0; i < dots.length; i++) {
        if ((dots[i] !== a) && (dots[i] !== newDots[1]) && (dots[i] !== newDots[2]) && lengthBetween(dots[i],newDots[2]) === sides[0]) {
            newDots[3] = dots[i];
        }
    }
    return newDots;
}

//წერტილების გასასუფთავებელი ფუნქცია
function clearDots() {
    var d = new Date();
    startTime = d.getTime();
    isSquareCreated = false;
    clicks = 0;
    let dots = document.getElementsByClassName('dot');
    for (let i = 0; i < dots.length; i++) {
        document.getElementsByClassName('dot')[i].style.backgroundColor = '#f0f0f0';
    }
    document.getElementsByClassName('rectSvg')[0].innerHTML = "";
}

// ფუნქცია იგებს მოცემულ სამ წერტილზე აიგება თუ არა კვადრატი
function isThirdDotForSquare(a, b, c) {
    let ab = lengthBetween(a, b),
        bc = lengthBetween(b, c),
        ac = lengthBetween(a, c);
    return ab * ab + bc * bc === ac * ac || ab * ab + ac * ac === bc * bc || bc * bc + ac * ac === ab * ab;

}

// არაკვადრატიანი განაწილების შექმნის ფუნქცია
function createNotSquare() {
    let dots = [];
    for (let i = 1; i <= dotsNum; i++) {
        dots[i - 1] = createNotSquareDot(dots);
    }
    drawDots(dots);
}

// ისეთი ახალი წერტილის დაგენერირების ფუნქცია, რომელიც არსებულ წერტილებთან კვადრატს არ შექმნის
function createNotSquareDot(dots) {
    let newDotCand = {i: generateRandNumber(1, size), j: generateRandNumber(1, size)};
    for (let i = 0; i < dots.length; i++) {
        if (dots[i].i === newDotCand.i && dots[i].j === newDotCand.j) {
            createNotSquareDot(dots);
        }
        for (let j = i + 1; j < dots.length; j++) {
            for (let k = j + 1; k < dots.length; k++) {
                if (isSquare(dots[i], dots[j], dots[k], newDotCand)) {
                    createNotSquareDot(dots);
                }
            }
        }
    }
    return newDotCand;
}

// შემთხვევითი რიცხვის დაგენერირების ფუნქცია
function generateRandNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// კოორდინატების მიხედვით წერტილების ანთების ფუნქცია
function drawDots(dots) {
    for (let i = 0; i < dots.length; i++) {
        let d = dots[i]
        document.getElementsByClassName('i' + intStandart(d.i) + ' ' + 'j' + intStandart(d.j))[0].style.backgroundColor = 'red';
    }
}

// რიცხვის სტანდარტიზაციის ფუნქცია (მაგ. 1 -> 01)
function intStandart(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

// ოთხი წერტილი ადგენს თუარა კვადრატს, იმის დასადგენი ფუნქცია
function isSquare(a, b, c, d) {
    let ab = lengthBetween(a, b),
        ac = lengthBetween(a, c),
        ad = lengthBetween(a, d),
        bc = lengthBetween(b, c),
        bd = lengthBetween(b, d),
        cd = lengthBetween(c, d),
        sides = [ab, ac, ad, bc, bd, cd];
    sides.sort(function (a, b) {
        return a - b
    });
    return sides[0] === sides[1] && sides[1] === sides[2] && sides [2] === sides[3] && (sides[4] === sides[5]);
}

// ორ წერტილს შორის მანძილის გამოსათვლელი ფუნქცია
function lengthBetween(a, b) {
    return Math.sqrt(Math.pow(a.i - b.i, 2) + Math.pow(a.j - b.j, 2))
}

// შემთხვევითად იმ შემთხვევების დაგენერირების ფუნქცია, რომლებშიც მოვა კვადრატი
function getSquareSituations(attemps, squareSiruations) {
    let arr = [];
    while (arr.length !== squareSiruations) {
        let randNum = generateRandNumber(1, attemps);
        if (arr.indexOf(randNum) === -1) {
            arr.push(randNum)
        }
    }
    return arr.sort(function (a, b) {
        return a - b
    });
}

// მაუსის კვადრატზე დაკლიკების ფუნქცია
function onClickSvg() {
    clicks++;
}

// მაუსის ბადეზე დაკლიკების ფუნქცია
function onClickDiv() {
    let res;
    if (clicks === 0 && isSquareCreated) { // დახატული იყო და ააცილა
        res = 'დახატული იყო და ააცილა';
    } else if(clicks === 0 && !isSquareCreated) { // დახატული არ იყო და ბადეზე დააჭირა
        res = 'დახატული არ იყო და ბადეზე დააჭირა';
    } else if(clicks === 1 && isSquareCreated) { // სწორად გასცა
        res = 'დახატული იყო და სწორად გასცა';
    }
    saveAnswer(res);
    loadSituation();
}

// მაუსის უარის ღილაკზე დაკლიკების ფუნქცია
function onNegativeAnswerClick() {
    let res;
    if (isSquareCreated) { // დახატული იყო და უარი უპასუხა
        res = 'დახატული იყო და უარი უპასუხა';
    } else { // უარი სწორად უპასუხა
        res = 'უარი სწორად უპასუხა';
    }
    saveAnswer(res);
    loadSituation();
}

// თითოეული გაცემული პასუხის დამახსოვრების ფუნქცია
function saveAnswer(ans) {
    let d = new Date(),
        currTime = d.getTime(),
        time = currTime - startTime,
        answer = {};
    answer.ans = ans;
    answer.time = time;
    answers.push(answer);
}


// ყველა პასუხის ბაზაში გაგზავნის ფუნქცია
function submitAnswers(answers) {
    const Http = new XMLHttpRequest();
    const url='sendAnswers?a=' + encodeURIComponent(JSON.stringify(answers).toString());
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText);
    }
}

