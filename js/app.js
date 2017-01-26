questions = [
    "Things that are hard are the most rewarding.",
    "I enjoy learning new things.",
    "I see great things in my future.",
    "I use my time extremely efficiently.",
    "People would describe me as someone who gets stuff done.",
    "When I have something to do, I get started right away.",
    "I take initiative in getting things done.",
    "I believe I have a purpose in life.",
    "I am willing to take risks.",
    "Going to college is not necessary for me to be successful.",
    "There are many colleges that I could be successful at.",
    "I enjoy meeting new people.",
    "I would consider myself a \"people person.\"",
    "I like having people depend on me.",
    "I do my best when the community around me is doing its best.",
    "I spend a lot of time getting out of my comfort zone.",
    "People would describe me as creative.",
    "I am always asking questions.",
    "Some people would describe me as quirky or weird.",
    "I like hearing new ideas.",
    "Sharing is caring.",
    "It’s important to find something I love to do.",
    "I’ve made a difference in people’s lives.",
    "I want to help people.",
    "Helping other people makes me feel good.",
    "I’m good at introducing myself to new people.",
    "I’m assertive when I know what I want.",
    "When working in a team, I make the other members better.",
    "When working in a group, I am often a leader.",
    "I like solving problems.",
    "I’m level-headed when tensions are high.",
    "I do well under pressure.",
    "Brainstorming is an important skill.",
    "I like to create new things.",
    "If a classmate read something I wrote, they would be able to tell it was me based on my writing style.",
    "Failure can be a great learning opportunity.",
    "Some things are worth trying, even if they are unlikely to succeed.",
    "I like to surround myself with smart people.",
    "I work harder than most of my peers.",
    "I’m good at balancing multiple tasks.",
    "I get along well with many different kinds of people.",
    "When I have an issue with somebody, I am usually direct in telling them how I feel.",
    "Cheating is never acceptable.",
    "I am good with time management.",
    "I rarely lose important things.",
    "My life matters.",
    "I would read more if I had more free time.",
    "I will make the college I go to better.",
    "I have high expectations for myself.",
    "I like discovering new things.",
    "I challenge others and myself to think outside the box.",
    "I know my strengths and weaknesses.",
    "I’m actively working to correct some of my weaknesses.",
    "I want to travel in college.",
    "Most people that meet me remember me.",
    "I spent my time in high school doing things I genuinely loved doing.",
    "I like to create my own opportunities.",
    "I am usually engaged and participate in class.",
    "I generally don’t get too stressed out.",
    "I am good at meeting deadlines.",
    "I am comfortable with complexity.",
    "I am very perceptive.",
    "I am willing to make sacrifices.",
    "I like working with people towards a larger vision.",
    "When I have questions in school, I find someone to ask.",
    "I try my best to stay actively conscious and not drift off during the day."
];
usedquestions = [];

var actual_JSON;
var ids = [];
loadJSON(function (response) {
    actual_JSON = JSON.parse(response);
    for (i = 0; i < actual_JSON.length; i++) {
        var temp = document.createElement("option");
        temp.value = actual_JSON[i].NAME;
        ids.push(actual_JSON[i].NAME);
        temp.innerHTML = actual_JSON[i].NAME;
        document.getElementById("dl").appendChild(temp);
    }
    var nativedatalist = !!('list' in document.createElement('input')) &&
        !!(document.createElement('datalist') && window.HTMLDataListElement);

    if (!nativedatalist) {
        $('input[list]').each(function () {
            var availableTags = $('#' + $(this).attr("list")).find('option')
                .map(function () {
                    return this.value;
                }).get();
            $(this).autocomplete({
                source: availableTags
            });
        });
    }
});

$("span[title]").click(function () {
  var $title = $(this).find(".title");
  if (!$title.length) {
    $(this).append('<span class="title">' + $(this).attr("title") + '</span>');
  } else {
    $title.remove();
  }
})

function getObjectiveScore(gpa, ap5, ap4, sat) {
    var index = ids.indexOf(cinput.value);
    var college = actual_JSON[index];
    var output = 0;
    var sat_coeff = 100;
    if (sat < college.SAT_25) sat_coeff = 120;
    if (sat > college.SAT_75) sat_coeff = 80;
    output += sat / (sat_coeff / (sat / 1600));
    var gpa_coeff = 0.2;
    if (gpa < college.GPA) gpa_coeff = 0.25;
    output += gpa / (gpa_coeff / (gpa / .4));
    if (output > 0) var scaledObjectiveAdd = (output/50);
    output +=  (scaledObjectiveAdd/.1); 
    var aps = parseFloat(ap5) + ap4 / 2;
    if (aps > 10) aps = 10; 
    var objectiveScoreFinal = output + aps; 
     
    return Math.round(100 * (objectiveScoreFinal)) / 100;
}

getdata.onclick = function () {
    if ((satbox.value > 36 && satbox.value < 400) || satbox.value < 1 || satbox.value > 1600) {
        alert("Please enter a valid test score.");
        return;
    }
    if (usedquestions.length <= 20) {
        warning.style = "text-align: center; display: block; color: red";
        return;
    }
    if (gpabox.value < 0 || gpabox.value > 4) { return; }
    // getdata.disabled = true;
    details_link.style = "border-bottom: 1px dotted; cursor: pointer; display: inline";
    var test = satbox.value > 36 ? satbox.value : Math.round(satbox.value * 1600 / 36);
    var _objective = getObjectiveScore(gpabox.value, ap5box.value, ap4box.value, test);
    var comp = _objective + (sub / 2);
    var _percent = getTotalApplicantScore(comp);
    finalscore.value = Math.round(_percent * 100) / 100 + "%";

    objective.innerText = _objective.toPrecision(4);
    subjective.innerText = sub.toPrecision(4);
    composite.innerText = (Math.round(comp * 100) / 100).toPrecision(4);
    scaled.innerText = (Math.round(_percent * 100) / 100).toPrecision(4);

    var index = ids.indexOf(cinput.value);
    var college = actual_JSON[index];
    stats_gpa.innerText = college.GPA;
    stats_rate.innerText = college.ADMISSION;
    stats_sat_25.innerText = college.SAT_25;
    stats_sat_75.innerText = college.SAT_75;
    stats_act_25.innerText = college.ACT_25;
    stats_act_75.innerText = college.ACT_75;
    stats_address.innerText = college.ADDRESS;
}

function getTotalApplicantScore(TA) {
    var index = ids.indexOf(cinput.value);
    var acceptance = actual_JSON[index].ADMISSION.replace("%", "") / 100;
    if (TA >= 120) TA = 119.9; 
    var final = 120 - TA;
    final /= acceptance;
    final /= TA;
    final = TA / final;
    if (final > 100) final = 90 + (-1 / (TA / 100) + 10);
    return final;
}

function changeQuestion() {
    warning.style = "text-align: center; display: none";
    var loop = true;
    while (loop) {
        var index = Math.floor(Math.random() * questions.length);
        if (usedquestions.indexOf(index) < 0) {
            usedquestions.push(index);
            loop = false;
            questiontag.innerHTML = "Question " + usedquestions.length + " of 20: " + questions[index];
        }
    }
    if (usedquestions.length > 20) {
        button1.disabled = true;
        button2.disabled = true;
        button3.disabled = true;
        button4.disabled = true;
        button5.disabled = true;
        questiontag.innerHTML = "Click Chance Me to see your chances";
    }
}

var sub = 50;
button1.onclick = function () {
    sub += 5;
    changeQuestion();
}
button2.onclick = function () {
    sub += 3;
    changeQuestion();
}
button3.onclick = function () {
    sub += 0;
    changeQuestion();
}
button4.onclick = function () {
    sub += -3;
    changeQuestion();
}
button5.onclick = function () {
    sub += -5;
    changeQuestion();
}

changeQuestion();

function r() {
    button1.disabled = false;
    button2.disabled = false;
    button3.disabled = false;
    button4.disabled = false;
    button5.disabled = false;
    sub = 50;
    ids = null;
    actual_JSON = null;
}

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'js/data.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

var visible = false;

function toggleDetails() {
    if (visible) {
        details.style = "display:none";
        details_link.innerText = "Show Details";
    } else {
        details.style = "display:inline";
        details_link.innerText = "Hide Details";
    }
    visible = !visible;
}
