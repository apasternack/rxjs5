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
    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("load", () => {
            let data = JSON.parse(xhr.responseText);
            observer.next(data);
            observer.complete();
        });

        xhr.open("GET", url);
        xhr.send();
    });
}

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    });
}

click.map(e => load("movies.json"))
    .subscribe(o => console.log(o));

// click.subscribe(
//     e => load("movies.json"),  //in RXJS world this step becomes the creating of an observable
//     e => console.log(`error: ${e}`),
//     () => console.log("complete")
// );