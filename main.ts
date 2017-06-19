import { Observable, Observer } from "rxjs";

// import { Observable } from "rxjs/Observable";
// import "rxjs/add/operator/map";  //this file has side effects which add .map to Observable
// import "rxjs/add/operator/filter";

let numbers = [1, 5, 10];
let source = Observable.fromEvent(document, "mousemove")
                        .map((e : MouseEvent) => {
                            return {
                                x: e.clientX,
                                y: e.clientY
                            }
                        })
                        .filter(value => value.x < 500);

    // .map(n => n * 2)
    // .filter(n => n > 4);

source.subscribe(
    value => console.log(value),
    e => console.log(`error: ${e}`),
    () => console.log("complete")
);