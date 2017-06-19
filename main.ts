import { Observable, Observer } from "rxjs";

// import { Observable } from "rxjs/Observable";
// import "rxjs/add/operator/map";  //this file has side effects which add .map to Observable
// import "rxjs/add/operator/filter";

let output = document.getElementById("output");
let button = document.getElementById("button");

let click = Observable.fromEvent(button, "click");

    // .map(n => n * 2)
    // .filter(n => n > 4);

function load(url: string) {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
        let movies = JSON.parse(xhr.responseText);
        movies.forEach(m => {
            let div = document.createElement("div");
            div.innerText = m.title;
            output.appendChild(div);
        });
    });

    xhr.open("GET", url);
    xhr.send();
}

click.subscribe(
    e => load("movies.json"),
    e => console.log(`error: ${e}`),
    () => console.log("complete")
);