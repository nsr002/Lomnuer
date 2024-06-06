/*
================================================================
Javascript
================================================================
*/

// print letter
const printletter = () => {
    let result = '';
    for (i = 65; i <= 90; i++) {
        const result = String.fromCharCode(i);
        setTimeout(() => {
            document.getElementById('res-letter').innerText = result;
        }, (i - 65) * 1000);
    }
}


// Factorial
const factorial = () => {
    let num = document.getElementById('input-factorial').value;
    if (num != "") {
        let result = 1;
        for (let i = 1; i <= num; i++) {
            result *= i;
        }
        document.getElementById('res-factorial').innerText = result;
    } else {
        document.getElementById('res-factorial').innerText = "Please enter a number";
    }
}

// Day to Second
const daysToSeconds = () => {
    let days = document.getElementById('input-days').value;
    if (days != "") {
        let result = days * 24 * 60 * 60;
        document.getElementById('res-days').innerText = result;
    } else {
        document.getElementById('res-days').innerText = "Please enter a days";
    }
}

// Login
const login = () => {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if (username == "admin" && password == "P@ssw0rd") {
        alert("Login successful");
    } else {
        alert("Login failed");
    }
}

//  to do function
const addTodo = () => {
    var list = document.getElementById('task').value;

    if (list !== "") {
        printTodo(list);
        document.getElementById('task').value = "";
    } else {
        // document.getElementById('res-todo').innerText = "Please enter a list";
    }
}

const printTodo = (list) => {

    if (!window.todolis) {
        window.todolis = [];
    }

    todolis.push(list);

    console.log(todolis);


    var res = "";
    // Show all todo list items
    for (let i = 0; i < todolis.length; i++) {
        if (todolis[i] !== undefined) {
            res += "<li class='list-group-item  mb-2'>" + todolis[i] + "<button class='btn btn-sm btn-danger float-end' onclick='deleteTodo(" + i + ")'>Delete</button><button class='btn btn-primary btn-sm mx-1 float-end' onclick='editTodo(" + i + ")'>Edit</button></li>";
        }
    }
    document.getElementById('res-todo').innerHTML = res;
}
const editTodo = (index) => {
    const newValue = prompt("Edit the to-do item:", todolis[index]);
    if (newValue !== null) {
        todolis[index] = newValue;
        printTodo(); // Refresh the displayed list after editing
    } else {
        // ไ
        return;
    }
}


const deleteTodo = (index) => {
    if (window.todolis && window.todolis.length > index && index >= 0) {
        window.todolis.splice(index, 1);
        printTodo();
    }
}

// skills chart function
const skills = () => {
    var chart = document.getElementById('myskills');
    var data = {
        names: ["HTML", "CSS", "SCSS", "JavaScript", "Bootstrap", "JQuery", "Tailwind", "PHP", "MySQL", "Python", "C", "VBA", "DART"],
        levels: [100, 70, 70, 75, 95, 90, 55, 100, 97, 70, 40, 50, 30]
    }

    // color random
    var o = Math.round, r = Math.random, s = 255;

    // fetch data from array
    // var ctx = document.getElementById('myskills').getContext('2d');
    var myChart = new Chart(chart, {
        type: 'line',
        data: {
            labels: data.names,
            datasets: [{
                label: 'My Skills',
                data: data.levels,
                backgroundColor: function () {
                    return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',0.4)';
                },

                borderWidth: 3
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


// Data USA
const dataUSA = () => {
    var ctx = document.getElementById('datausa');
    fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
        .then(response => response.json())
        .then(data => {
            // Assuming the API response structure has "data" as an array of objects
            const populationData = data.data.map(item => ({
                population: item.Population,
                year: item.Year
            }));

            // console.log(populationData);

            const labels = populationData.map(item => item.year);
            const datas = populationData.map(item => item.population);
            var o = Math.round, r = Math.random, s = 255;
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Population',
                        data: datas,
                        backgroundColor: function () {
                            return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',0.4)';
                        },
                        borderWidth: 0
                    }]
                },
            })

        })
        .catch(error => {
            console.log('Error fetching data:', error);
        });

}


/*
========================================
API
========================================
*/
const randomImg = () => {
    const imgElement = document.getElementById('image');
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            const imageUrl = data.message;

            imgElement.src = imageUrl;
            imgElement.alt = 'random dog image';
        })
        .catch(error => {
            console.log('Error fetching dog image:', error);
        });
};

const fetchPrices = () => {

    const now = new Date();
    const date = now.toLocaleTimeString();

    fetch('https://api.coinbase.com/v2/exchange-rates?currency=USDT')
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            displayPrices(data);
            displayUpdateTime(date);
        })
        .catch(error => {
            console.log('Error fetching prices:', error);
        })
}

const displayPrices = (data) => {
    const usdt = document.getElementById('usdt');


    const rates = data.data.rates;


    var currencies = ['1INCH', 'AAVE', 'ABT', 'ACH', 'ACS', 'ADA', 'AED', 'BTC', 'ETH'];

    let pricesHtml = '<p>Current Prices</p> <ul>';

    currencies.forEach(currency => {
        if (rates[currency]) {
            pricesHtml += `<li>${currency}: ${rates[currency]}</li>`;
        } else {
            pricesHtml += `<li>${currency}: N/A</li>`;
        }
    });

    pricesHtml += '</ul>';
    usdt.innerHTML = pricesHtml;
}

const displayUpdateTime = (date) => {
    const updatetime = document.getElementById('updatetime');
    updatetime.innerText = date;
}

const nationality = () => {
    const name = document.getElementById('names');
    let namess = document.getElementById('namess').value;
    const nationalityTable = document.getElementById('nationality');

    if (namess !== "") {
        fetch(`https://api.nationalize.io/?name=${namess}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data); 
              if(data.country.length > 0){
                  nationalityTable.innerHTML = ''; // Clear previous results
                  data.country.forEach(country => {
                      const row = `<tr><td>${country.country_id}</td><td>${country.probability}</td></tr>`;
                      nationalityTable.innerHTML += row;
                  }
                  );
            }else{
                const nationalityTable = document.getElementById('nationality');
                nationalityTable.innerHTML = `<tr><td colspan="2" class="text-center">data not found</td></tr>`;
            }
              
                name.innerText = 'Your name is ' + namess;

            })
            .catch(error => {
                console.error('Error fetching data:', error);
                name.innerText = 'Sorry, something went wrong. Please try again.';
            });
    } else {
        name.innerText = 'Please enter a name';
        nationalityTable.innerHTML = '';
    }
    namess.value = '';
}



