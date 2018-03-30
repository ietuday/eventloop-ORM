
// setTimeout(function(){
//     console.log("SETTIMEOUT");
// });
// setImmediate(function(){
//     console.log("SETIMMEDIATE");
// });

// setTimeout(function() {
//     console.log("TIMEOUT 1");
//     setImmediate(function() {
//         console.log("SETIMMEDIATE 1");
//     });
// }, 0);
// setTimeout(function() {
//     console.log("TIMEOUT 2");
//     setImmediate(function() {
//         console.log("SETIMMEDIATE 2");
//     });
// }, 0);
// setTimeout(function() {
//     console.log("TIMEOUT 3");
// }, 0);



// Event Loop 

//Refer Screenshot

// Each rectangular box in the diagram represent a phase and event loops iterates
// on those again and again, starting from timers to close callbacks. There is
// also a nextTickQueue in the middle, however it’s not a part of the event loop
// itself. Each phase has a queue attached to it. When event loop enters in a
// particular phase, its target is to execute the callbacks/tasks in those
// queues. A little description about the phases are as below.

// Timer: It handles the callbacks assigned by setTimeout & setInterval after the
// given time threshold is completed.  I/O callbacks: Handles all callbacks
// except the ones set by setTimeout, setInterval & setImmediate. It also does
// not have any close callbacks.  Idle, prepare: Used internally.  Pole: Retrieve
// new I/O events. This is which makes node a cool dude.  Check: Here the
// callbacks of setImmediate() is handled.  Close callbacks: Handles close
// connection callbacks etc. (eg: socket connection close)  nextTickQueue: Holds
// the callbacks of process.nextTick(); but not a part of the event loop.

// How event loop propagates It enters the Timer phase & checks if anything
// (callback) is there in the timer queue. If there are some, it starts executing
// one after another till either the queue is empty or the maximum allowed
// callback execution is completed.

// After Timer it moves to the I/O callback phase where it again find the queue
// associated with it for i/o operations. It followed the similar approach as
// timer and after task done moves to the next phase.

// Idle phase is used by node internally; for preparation etc. After that, the
// event loop enters the Poll phase where it handles events. If there is no event
// to be handled then also the event loops waits a bit in the poll phase for new
// i/o events. Nothing in the event loops works when poll phase is in waiting or
// sleep mode. However if there are some scripts assigned by setImmediate the
// event loop will end the poll phase and continue to the Check phase to execute
// those scheduled scripts.

// After Check it will try executing anything in Close callbacks and after that
// goes back to Timer for the next iteration or tick.

// Now about nextTickQueue. Any callbacks assigned by process.nextTick() is
// queued in the nextTickQueue and the event loop executes them one after another
// another, till the entire queue is drained out; after completing the ongoing
// operation; irrespective of which phase it is in.

//SetImmediate

// So first of all, by the workflow of event loop, now we can say setImmediate()
// is not exactly immediate, but the queue containing the callbacks of this, will
// be executed once in every iteration (when event loop is in Check phase).

// So, the example in previous section; things were non-deterministic, because it
// depends on the performance of the process. Cause timer has an extra work of
// sorting, which takes some extra time to register it. However if we move the
// piece of code in an I/O callback; we can guarantee that the callback of
// setImmediate will be called before setTimeout, irrespective of anything else.


var fs = require('fs');
fs.readFile("server.js", function() {
    setTimeout(function(){
        console.log("SETTIMEOUT");
    });
    setImmediate(function(){
        console.log("SETIMMEDIATE");
    });
});


// setTimeout(fn,0)

// This also invokes the callback, but will not be executed till the event loop
// enters the Timer phase. So any setTimeout(fn, 0) along with setImmediate() in
// the Close callback phase will guarantee the execution of setTimeout 0 before
// the setImmediate. And accordingly, keeping the phase diagram of event loop in
// your mind, you can easily determine whether it’s setTimeout(fn, 0) or
// setImmediate() which will be called at the earliest.



// process.nextTick()

// As per node.js documentation, “nextTickQueue will be processed after the
// current operation completes, regardless of the current phase of the event
// loop.”  It means, this queue will be executed whenever the boundary between
// JavaScript and C/C++ is crossed. So it’s not like it will be called after the
// task in the current phase only. Neither it means after the execution of the
// current callback. It is sometime before the next phase is hit.

