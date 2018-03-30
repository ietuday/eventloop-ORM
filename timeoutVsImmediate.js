setTimeout(function(){
    console.log("SETTIMEOUT");
});
setImmediate(function(){
    console.log("SETIMMEDIATE");
});

function cb(){
  console.log('Processed in next iteration');
}

process.nextTick(cb);