let color = randomColor({
    luminosity: 'bright',
    format: 'rgb' // e.g. 'rgb(225,200,20)'
 });

let background = document.createElement('div');
background.className = 'mt-5 w-50 d-flex justify-content-center rounded';
background.setAttribute('style','background-color:'+ color);

let search = document.createElement('a');
search.className = 'h2';
search.textContent = 'Start searching';
search.setAttribute('href', '/search');
background.appendChild(search);

let container = document.querySelector('.cont');
container.appendChild(background);
