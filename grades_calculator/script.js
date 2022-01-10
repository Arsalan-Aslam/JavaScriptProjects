const form = document.getElementById('form');
const marksObtained = document.getElementById('marks-obtained');
const totalMarks = document.getElementById('total-marks');
const gradeResult = document.getElementById('result');




// event listener

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const percent = Math.floor((marksObtained.value / totalMarks.value) * 100);
    // console.log(percent);
    let grade = "";
    if (percent >= 80) {
        grade = "A-1";
    } else if (percent >= 70 && percent <= 79) {
        grade = "A";
    } else if (percent >= 60 && percent <= 69) {
        grade = "B";
    } else if (percent >= 50 && percent <= 59) {
        grade = "C";
    } else if (percent >=33 && percent <= 49) {
        grade = "D";
    } else {
        grade = "FAIL";
    }
    // console.log(grade);
    console.log(grade, percent);
    console.log(`Your grade is: ${grade} (${percent}%)`);
    gradeResult.innerHTML = `Your grade is: <strong>${grade}</strong> (${percent}%)`
    marksObtained.value = "";
    totalMarks.value = "";
});

/*
function calcGrades(e) {
    e.preventDefault();
    // console.log("working",e)
    const percent = Math.floor((marksObtained.value / totalMarks.value) * 100);
    // console.log(percent);
    let grade = "";
    if (percent >= 80) {
        grade = "A-1";
    } else if (percent >= 70 && percent <= 79) {
        grade = "A";
    } else if (percent >= 60 && percent <= 69) {
        grade = "B";
    } else if (percent >= 50 && percent <= 59) {
        grade = "C";
    } else if (percent >=33 && percent <= 49) {
        grade = "D";
    } else {
        grade = "FAIL";
    }
    console.log(grade);
    console.log(grade, percent);
    console.log(`Your grade is: ${grade} (${percent}%)`);
    gradeResult.innerHTML = `Your grade is: <strong>${grade}</strong> (${percent}%)`
};*/
// gradeResult.textContent = "PASS";
// result.innerText = "Hello";