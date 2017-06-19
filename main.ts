import { Observable, Observer } from "rxjs";

// import { Observable } from "rxjs/Observable";
// import "rxjs/add/operator/map";  //this file has side effects which add .map to Observable
// import "rxjs/add/operator/filter";

let circle = document.getElementById("circle");
let source = Observable.fromEvent(document, "mousemove")
                        .map((e : MouseEvent) => {
                            return {
                                x: e.clientX,
                                y: e.clientY
                            }
                        })
                        .filter(value => value.x < 500)
                        .delay(300);

    // .map(n => n * 2)
    // .filter(n => n > 4);

function onNext(value) {
    circle.style.left = value.x;
    circle.style.top = value.y;
}

source.subscribe(
    onNext,
    e => console.log(`error: ${e}`),
    () => console.log("complete")
);