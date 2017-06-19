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
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.statusText);
            }
        });

        xhr.open("GET", url);
        xhr.send();
    }).retryWhen(retryStrategy());
}

function retryStrategy() {
    return function(errors) {  //this returned function must take an observable and return one per the .retryWhen API
        return errors
                .scan((acc, value) => {
                    console.log(acc, value);
                    return acc + 1;
                }, 0)
                .takeWhile(acc => acc < 4)
                .delay(1000);
    }
}

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    });
}

// load("movies.json").subscribe(renderMovies);

click.flatMap(e => load("moviess.json"))
    .subscribe(
        renderMovies,
        e => console.log(`error: ${e}`),
        () => console.log("complete")
    );