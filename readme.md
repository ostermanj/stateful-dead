# Stateful Dead

A dead-simple object-oriented state container to store and announce the state changes of your app. `state` is one object with the state changes as property-value pairs.

## Methods

`logState()` : log the state object to console

`getState(stateChange)` : return the current value of the specified state change

`getPreviousState(stateChange)` : return the previous value of the specified state change (the state object stores the two latest values for each state change property)

`setState(stateChange, value)` : set the state change to the specified value

Parameters: stateChange is a string referring to a new or existing property of the state object; value can be whatever: a string, object, array, so on. It's often just a string, but the value will be announced as the data of messages published by the PubSub module, so it is often useful to pass set the value as an object or array.

A state change is announced by the PubSub module, and you can subscribe other functions in your code to that message. That way function A can anounce a state change and function B can react to that change. If you later swap out function B for function C, you don't have to make any changes to function A to keep things working. 