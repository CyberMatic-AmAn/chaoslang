
```
# ChaosLang

ChaosLang is an experimental programming language built in JavaScript that thrives on unpredictability and chaos. Designed to break free from the rigidity of traditional programming, ChaosLang introduces randomness, quantum-inspired expressions, and dynamic code manipulation. It runs in a browser, leveraging an HTML canvas for chaotic visual effects and a text output for results, making it a playful yet powerful tool for exploring entropy in coding.

## Features

- Unique chaotic keywords for programming constructs and actions.
- Quantum expressions allowing multiple possible values for variables.
- Dynamic code mutation and multiverse execution for unpredictable outcomes.
- Crazy mode that flips logic, shuffles data, and adds randomness.
- Visual chaos rendering on a canvas for an immersive experience.
- History tracking with rewind capabilities.

## Documentation

### Keywords and Their Uses

- `kaboom`: Defines a function.
- `crash`: Declares a variable.
- `glitch`: Outputs a value to the screen.
- `panic`: Throws an error with a message.
- `if`: Conditional statement for branching logic.
- `return`: Returns a value from a function.
- `meltdown`: Executes a loop while a condition is true.
- `explode`: Breaks out of a loop or function.
- `chaosfor`: A for loop with start, end, and step values.
- `chaosforeach`: Iterates over an array.
- `in`: Specifies the array to iterate over in `chaosforeach`.
- `unleashchaos`: Activates crazy mode for chaotic execution.
- `mutate`: Redefines an existing function.
- `chaoscall`: Randomly calls a function in crazy mode.
- `rewind`: Reverts execution to a previous state by a specified number of steps.
- `corrupt`: Alters the source code during execution in crazy mode.
- `multiverse`: Forks execution into multiple parallel universes in crazy mode.

### Operators and Symbols
- `=` : Assignment.
- `+`, `-`, `*`, `/`, `%`, `^` : Arithmetic operators (behavior may flip in crazy mode).
- `>`, `<`, `=` : Comparison operators (may invert in crazy mode).
- `|` : Defines quantum expression options (e.g., `crash x = 1 | 2;`).
- `(`, `)`, `{`, `}`, `[`, `]`, `;`, `,` : Syntax delimiters and separators.

## Hello World in ChaosLang

Here’s a basic ChaosLang program to print "Hello, World!":

```
crash message = "Hello, World!";
glitch(message);
```

This declares a variable `message` with the string "Hello, World!" and outputs it using `glitch`.

## Crazy Mode

Crazy mode is ChaosLang’s signature feature, turning predictable execution into a chaotic playground. Activate it with the `unleashchaos;` statement. Once enabled:
- Arithmetic operators (e.g., `+` might become `-`) and comparisons (e.g., `<` might become `>`) behave unpredictably.
- Numbers in expressions may shift randomly.
- Arrays shuffle their elements.
- Visual effects like colorful shapes appear on the canvas.
- Additional chaotic statements like `corrupt`, `multiverse`, and `chaoscall` take effect.

### How to Use Crazy Mode
1. Add `unleashchaos;` at any point in your program to enable crazy mode.
2. Use chaotic keywords like `corrupt` to rewrite code, `multiverse` to split execution, or `chaoscall` to invoke random functions.
3. Watch the output and canvas for unexpected results!

Example with Crazy Mode:
```
unleashchaos;
crash x = 5;
glitch(x + 3);
```
Here, `x + 3` might output anything from `2` to `13` (or more), with random shapes on the canvas.

## Project Structure

```
chaoslang/
├── index.html           # Main HTML file with UI and interpreter runner
├── style.css            # Styles for the UI and crazy mode effects
├── chaoslang.js         # Core implementation (lexer, parser, interpreter)
├── copyToPlayground.js  # Utility to copy code to a playground environment
├── animations.js        # Canvas animation logic for chaotic visuals
├── README.md            # This documentation file
└── img/                 # Directory for images (e.g., screenshots)
    ├── (image files)
```


