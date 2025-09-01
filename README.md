## A very simple logger using JS closure

https://mini-logger.vercel.app/

This logger wraps any function and keeps track of its call history — arguments, results, errors, and timestamps — inside a closure.

Because the history lives in the closure, it can only be updated through the function call only.

# Features

    -	Logs arguments and results of each call
    -	Records errors without breaking execution
    -	Maintains a configurable maximum history size
    -	Displays history in a clean table format
