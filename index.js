const state = {};

function _logState(){
    console.log(state);
}

function _getState(property){
    return ( state[property] !== undefined ) ? state[property][0] : undefined;
}

function _getPreviousState(property){
    return ( state[property] !== undefined && state[property][1] !== undefined ) ? state[property][1] : undefined;
}

function _setState(key,value) { 

    if ( state[key] === undefined) { // ie first time state property is being defined
        state[key] = [value];
        PubSub.publish(key, value);
        _logState();
    } else { // not the first time the property is being defined
    //If it's a string or array and values are the same, stateChanged=False+
        var stateChanged = true;
        if (typeof value === 'string') {
            stateChanged = (state[key][0] !== value);
        } else if (Array.isArray(value) && Array.isArray(state[key][0])) {
            stateChanged = !value.compare(state[key][0]);
        } else {
            stateChanged = true; //assume it's changed if we can't verify
        }              
        //Only publish if we've changed state
        if ( stateChanged ) { 
            state[key].unshift(value);
            PubSub.publish(key, value);
            _logState();
            if ( state[key].length > 2 ) {
                state[key].length = 2;
            }
        }
    }
}

exports.stateModule = {
    logState: _logState,
    getState: _getState,
    getPreviousState: _getPreviousState,
    setState: _setState
};