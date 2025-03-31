// Lexer
function tokenize(code) {
    const tokens = [];
    const keywords = ["kaboom", "crash", "panic", "glitch", "if", "return", "meltdown", "explode", "chaosfor", "chaosforeach", "in", "unleashchaos", "mutate", "chaoscall", "rewind", "corrupt", "multiverse"];
    let i = 0;
    let line = 1;
    while (i < code.length) {
        let char = code[i];
        if (/\s/.test(char)) {
            if (char === "\n") line++;
            i++;
            continue;
        }
        if (char === "/" && i + 1 < code.length && code[i + 1] === "/") {
            while (i < code.length && code[i] !== "\n") { i++; }
            line++;
            continue;
        }
        if (/[a-zA-Z]/.test(char)) {
            let word = "";
            while (i < code.length && /[a-zA-Z0-9]/.test(code[i])) {
                word += code[i];
                i++;
            }
            const token = keywords.includes(word) ?
                { type: "keyword", value: word, line } :
                { type: "identifier", value: word, line };
            tokens.push(token);
            continue;
        }
        if ("=<>+-*/%^|.,".includes(char)) {
            if (char === "-" && i + 1 < code.length && /[0-9]/.test(code[i + 1])) {
                let num = "-";
                i++;
                while (i < code.length && /[0-9]/.test(code[i])) {
                    num += code[i];
                    i++;
                }
                tokens.push({ type: "number", value: parseInt(num), line });
                continue;
            }
            tokens.push({ type: "operator", value: char, line });
            i++;
            continue;
        }
        if ("(){};[]".includes(char)) {
            tokens.push({ type: "symbol", value: char, line });
            i++;
            continue;
        }
        if (char === '"') {
            let str = "";
            i++;
            while (i < code.length && code[i] !== '"') {
                if (code[i] === "\n") line++;
                str += code[i];
                i++;
            }
            i++;
            tokens.push({ type: "string", value: str, line });
            continue;
        }
        if (/[0-9]/.test(char)) {
            let num = "";
            while (i < code.length && /[0-9]/.test(code[i])) {
                num += code[i];
                i++;
            }
            tokens.push({ type: "number", value: parseInt(num), line });
            continue;
        }
        throw new Error(`Unrecognized character: ${char} at line ${line}`);
    }
    return tokens;
}

// Parser
class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.pos = 0;
    }
    currentToken() { return this.tokens[this.pos]; }
    eat(type) {
        if (this.currentToken() && this.currentToken().type === type) {
            this.pos++;
            return this.tokens[this.pos - 1];
        }
        throw new Error(`Expected token type ${type}, got ${this.currentToken()?.type} at line ${this.currentToken()?.line}`);
    }
    parse() {
        const ast = { type: "Program", body: [] };
        while (this.pos < this.tokens.length) {
            ast.body.push(this.parseStatement());
        }
        return ast;
    }
    parseStatement() {
        const token = this.currentToken();
        if (token.type === "keyword" && token.value === "kaboom") return this.parseFunction();
        if (token.type === "keyword" && token.value === "crash") return this.parseVariable();
        if (token.type === "keyword" && token.value === "glitch") return this.parseGlitch();
        if (token.type === "keyword" && token.value === "return") return this.parseReturn();
        if (token.type === "keyword" && token.value === "if") return this.parseIf();
        if (token.type === "keyword" && token.value === "panic") return this.parsePanic();
        if (token.type === "keyword" && token.value === "meltdown") return this.parseMeltdown();
        if (token.type === "keyword" && token.value === "explode") return this.parseExplode();
        if (token.type === "keyword" && token.value === "chaosfor") return this.parseChaosFor();
        if (token.type === "keyword" && token.value === "chaosforeach") return this.parseChaosForEach();
        if (token.type === "keyword" && token.value === "unleashchaos") return this.parseUnleashChaos();
        if (token.type === "keyword" && token.value === "mutate") return this.parseMutate();
        if (token.type === "keyword" && token.value === "chaoscall") return this.parseChaosCall();
        if (token.type === "keyword" && token.value === "rewind") return this.parseRewind();
        if (token.type === "keyword" && token.value === "corrupt") return this.parseCorrupt();
        if (token.type === "keyword" && token.value === "multiverse") return this.parseMultiverse();
        if (token.type === "identifier") return this.parseMethodOrCallStatement();
        throw new Error(`Unexpected token: ${token.value} at line ${token.line}`);
    }
    parseFunction() {
        const line = this.currentToken().line;
        this.eat("keyword");
        const name = this.eat("identifier").value;
        this.eat("symbol"); // (
        const params = [];
        if (this.currentToken() && this.currentToken().value !== ")") {
            params.push(this.eat("identifier").value);
            while (this.currentToken() && this.currentToken().value === ",") {
                this.eat("operator"); // ,
                params.push(this.eat("identifier").value);
            }
        }
        this.eat("symbol"); // )
        this.eat("symbol"); // {
        const body = [];
        while (this.currentToken() && this.currentToken().value !== "}") {
            body.push(this.parseStatement());
        }
        this.eat("symbol"); // }
        return { type: "FunctionDeclaration", name, params, body, line };
    }
    parseVariable() {
        const line = this.currentToken().line;
        this.eat("keyword");
        const name = this.eat("identifier").value;
        this.eat("operator"); // =
        const value = this.parseQuantumOrExpression();
        this.eat("symbol"); // ;
        return { type: "VariableDeclaration", name, value, line };
    }
    parseQuantumOrExpression() {
        let expr = this.parseExpression();
        if (this.currentToken() && this.currentToken().value === "|") {
            const options = [expr];
            while (this.currentToken() && this.currentToken().value === "|") {
                this.eat("operator"); // |
                options.push(this.parseExpression());
            }
            return { type: "QuantumExpression", options, line: expr.line };
        }
        return expr;
    }
    parseExpression() {
        let left = this.parseFactor();
        while (this.currentToken() && "+-".includes(this.currentToken().value)) {
            const operator = this.eat("operator").value;
            const right = this.parseFactor();
            left = { type: "BinaryExpression", operator, left, right, line: left.line };
        }
        return left;
    }
    parseFactor() {
        let left = this.parsePower();
        while (this.currentToken() && "*/%".includes(this.currentToken().value)) {
            const operator = this.eat("operator").value;
            const right = this.parsePower();
            left = { type: "BinaryExpression", operator, left, right, line: left.line };
        }
        return left;
    }
    parsePower() {
        let left = this.parseTerm();
        while (this.currentToken() && "^".includes(this.currentToken().value)) {
            const operator = this.eat("operator").value;
            const right = this.parseTerm();
            left = { type: "BinaryExpression", operator, left, right, line: left.line };
        }
        return left;
    }
    parseTerm() {
        const token = this.currentToken();
        if (token.type === "number") {
            this.eat("number");
            return { type: "NumberLiteral", value: token.value, line: token.line };
        } else if (token.type === "string") {
            this.eat("string");
            return { type: "StringLiteral", value: token.value, line: token.line };
        } else if (token.type === "symbol" && token.value === "[") {
            return this.parseArrayLiteral();
        } else if (token.type === "identifier") {
            const ident = this.eat("identifier");
            if (this.currentToken() && this.currentToken().value === "(") {
                return this.parseCall(ident.value);
            } else if (this.currentToken() && this.currentToken().value === "[") {
                return this.parseArrayAccess(ident.value);
            } else if (this.currentToken() && this.currentToken().value === ".") {
                this.eat("operator"); // .
                const property = this.eat("identifier").value;
                if (this.currentToken() && this.currentToken().value === "(") {
                    return this.parseMethodCall(ident.value, property);
                }
                return { type: "PropertyAccess", object: ident.value, property, line: ident.line };
            }
            const left = { type: "Identifier", name: ident.value, line: ident.line };
            if (this.currentToken() && "><=".includes(this.currentToken().value)) {
                const operator = this.eat("operator").value;
                const right = this.parseTerm();
                return { type: "BinaryExpression", operator, left, right, line: left.line };
            }
            return left;
        }
        throw new Error(`Unexpected expression token: ${token.value} at line ${token.line}`);
    }
    parseArrayLiteral() {
        const line = this.currentToken().line;
        this.eat("symbol"); // [
        const elements = [];
        if (this.currentToken() && this.currentToken().value !== "]") {
            elements.push(this.parseExpression());
            while (this.currentToken() && this.currentToken().value === ",") {
                this.eat("operator"); // ,
                elements.push(this.parseExpression());
            }
        }
        this.eat("symbol"); // ]
        return { type: "ArrayLiteral", elements, line };
    }
    parseArrayAccess(name) {
        const line = this.currentToken().line;
        this.eat("symbol"); // [
        const index = this.parseExpression();
        this.eat("symbol"); // ]
        return { type: "ArrayAccess", name, index, line };
    }
    parseCall(name) {
        const line = this.currentToken().line;
        this.eat("symbol"); // (
        const args = [];
        if (this.currentToken() && this.currentToken().value !== ")") {
            args.push(this.parseExpression());
            while (this.currentToken() && this.currentToken().value === ",") {
                this.eat("operator"); // ,
                args.push(this.parseExpression());
            }
        }
        this.eat("symbol"); // )
        return { type: "CallExpression", name, args, line };
    }
    parseMethodCall(object, method) {
        const line = this.currentToken().line;
        this.eat("symbol"); // (
        const args = [];
        if (this.currentToken() && this.currentToken().value !== ")") {
            args.push(this.parseExpression());
            while (this.currentToken() && this.currentToken().value === ",") {
                this.eat("operator"); // ,
                args.push(this.parseExpression());
            }
        }
        this.eat("symbol"); // )
        return { type: "MethodCall", object, method, args, line };
    }
    parseMethodOrCallStatement() {
        const ident = this.eat("identifier");
        if (this.currentToken() && this.currentToken().value === ".") {
            this.eat("operator"); // .
            const method = this.eat("identifier").value;
            const call = this.parseMethodCall(ident.value, method);
            this.eat("symbol"); // ;
            return call;
        } else {
            const call = this.parseCall(ident.value);
            this.eat("symbol"); // ;
            return call;
        }
    }
    parseGlitch() {
        const line = this.currentToken().line;
        this.eat("keyword");
        this.eat("symbol");
        const arg = this.parseExpression();
        this.eat("symbol");
        this.eat("symbol");
        return { type: "GlitchStatement", argument: arg, line };
    }
    parseReturn() {
        const line = this.currentToken().line;
        this.eat("keyword");
        const value = this.parseExpression();
        this.eat("symbol");
        return { type: "ReturnStatement", value, line };
    }
    parseIf() {
        const line = this.currentToken().line;
        this.eat("keyword");
        this.eat("symbol");
        const condition = this.parseExpression();
        this.eat("symbol");
        this.eat("symbol");
        const body = [];
        while (this.currentToken() && this.currentToken().value !== "}") {
            body.push(this.parseStatement());
        }
        this.eat("symbol");
        return { type: "IfStatement", condition, body, line };
    }
    parsePanic() {
        const line = this.currentToken().line;
        this.eat("keyword");
        this.eat("symbol");
        const message = this.parseExpression();
        this.eat("symbol");
        this.eat("symbol");
        return { type: "PanicStatement", message, line };
    }
    parseMeltdown() {
        const line = this.currentToken().line;
        this.eat("keyword");
        this.eat("symbol");
        const condition = this.parseExpression();
        this.eat("symbol");
        this.eat("symbol");
        const body = [];
        while (this.currentToken() && this.currentToken().value !== "}") {
            body.push(this.parseStatement());
        }
        this.eat("symbol");
        return { type: "MeltdownStatement", condition, body, line };
    }
    parseExplode() {
        const line = this.currentToken().line;
        this.eat("keyword");
        this.eat("symbol"); // ;
        return { type: "ExplodeStatement", line };
    }
    parseChaosFor() {
        const line = this.currentToken().line;
        this.eat("keyword"); // chaosfor
        this.eat("symbol"); // (
        const iterator = this.eat("identifier").value;
        this.eat("operator"); // =
        const start = this.parseExpression();
        this.eat("symbol"); // ;
        const end = this.parseExpression();
        this.eat("symbol"); // ;
        const step = this.parseExpression();
        this.eat("symbol"); // )
        this.eat("symbol"); // {
        const body = [];
        while (this.currentToken() && this.currentToken().value !== "}") {
            body.push(this.parseStatement());
        }
        this.eat("symbol"); // }
        return { type: "ChaosForStatement", iterator, start, end, step, body, line };
    }
    parseChaosForEach() {
        const line = this.currentToken().line;
        this.eat("keyword"); // chaosforeach
        this.eat("symbol"); // (
        const item = this.eat("identifier").value;
        this.eat("keyword"); // in
        const array = this.parseExpression();
        this.eat("symbol"); // )
        this.eat("symbol"); // {
        const body = [];
        while (this.currentToken() && this.currentToken().value !== "}") {
            body.push(this.parseStatement());
        }
        this.eat("symbol"); // }
        return { type: "ChaosForEachStatement", item, array, body, line };
    }
    parseUnleashChaos() {
        const line = this.currentToken().line;
        this.eat("keyword"); // unleashchaos
        this.eat("symbol"); // ;
        return { type: "UnleashChaosStatement", line };
    }
    parseMutate() {
        const line = this.currentToken().line;
        this.eat("keyword"); // mutate
        const name = this.eat("identifier").value;
        this.eat("symbol"); // (
        const params = [];
        if (this.currentToken() && this.currentToken().value !== ")") {
            params.push(this.eat("identifier").value);
            while (this.currentToken() && this.currentToken().value === ",") {
                this.eat("operator"); // ,
                params.push(this.eat("identifier").value);
            }
        }
        this.eat("symbol"); // )
        this.eat("operator"); // =
        this.eat("symbol"); // {
        const body = [];
        while (this.currentToken() && this.currentToken().value !== "}") {
            body.push(this.parseStatement());
        }
        this.eat("symbol"); // }
        this.eat("symbol"); // ;
        return { type: "MutateStatement", name, params, body, line };
    }
    parseChaosCall() {
        const line = this.currentToken().line;
        this.eat("keyword"); // chaoscall
        this.eat("symbol"); // ;
        return { type: "ChaosCallStatement", line };
    }
    parseRewind() {
        const line = this.currentToken().line;
        this.eat("keyword"); // rewind
        const steps = this.parseExpression();
        this.eat("symbol"); // ;
        return { type: "RewindStatement", steps, line };
    }
    parseCorrupt() {
        const line = this.currentToken().line;
        this.eat("keyword"); // corrupt
        this.eat("symbol"); // ;
        return { type: "CorruptStatement", line };
    }
    parseMultiverse() {
        const line = this.currentToken().line;
        this.eat("keyword"); // multiverse
        this.eat("symbol"); // ;
        return { type: "MultiverseStatement", line };
    }
}

function parse(tokens) {
    const parser = new Parser(tokens);
    return parser.parse();
}

// Interpreter
class Environment {
    constructor(parent = null) {
        this.vars = {};
        this.funcs = {};
        this.parent = parent;
        this.isCrazyMode = false;
    }
    setVar(name, value) { this.vars[name] = value; }
    getVar(name) {
        let value = this.vars[name] !== undefined ? this.vars[name] : this.parent?.getVar(name);
        if (value && value.isQuantum) {
            return value.options[Math.floor(Math.random() * value.options.length)];
        }
        return value;
    }
    setFunc(name, params, body) { this.funcs[name] = { params, body }; }
    getFunc(name) {
        return this.funcs[name] || this.parent?.getFunc(name);
    }
    extend() { return new Environment(this); }
    shuffleArrays() {
        if (!this.isCrazyMode) return;
        for (let key in this.vars) {
            if (Array.isArray(this.vars[key])) {
                this.vars[key].sort(() => Math.random() - 0.5);
            }
        }
        if (this.parent) this.parent.shuffleArrays();
    }
    getAllFuncs() {
        const funcs = { ...this.funcs };
        if (this.parent) Object.assign(funcs, this.parent.getAllFuncs());
        return funcs;
    }
    clone() {
        const newEnv = new Environment(this.parent ? this.parent.clone() : null);
        newEnv.vars = { ...this.vars };
        newEnv.funcs = { ...this.funcs };
        newEnv.isCrazyMode = this.isCrazyMode;
        return newEnv;
    }
}

function interpret(ast, initialCode) {
    const globalEnv = new Environment();
    const outputDiv = document.getElementById("output");
    const canvas = document.getElementById("chaos-canvas");
    const ctx = canvas.getContext("2d");
    outputDiv.innerHTML = "";
    let history = [];
    let currentCode = initialCode;

    function drawChaos(x, y, value) {
        if (!globalEnv.isCrazyMode) return;
        ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
        ctx.beginPath();
        ctx.arc(x, y, Math.abs(value) * 10 || 20, 0, Math.PI * 2);
        ctx.fill();
    }

    function corruptCode(code) {
        if (!globalEnv.isCrazyMode) return code;
        const lines = code.split("\n");
        const randomLine = Math.floor(Math.random() * lines.length);
        let line = lines[randomLine];
        if (Math.random() > 0.5) {
            line = line.replace(/[+\-*/%^]/, () => ["+", "-", "*", "/", "%", "^"][Math.floor(Math.random() * 6)]);
        } else {
            line = line.replace(/\d+/, () => Math.floor(Math.random() * 100));
        }
        lines[randomLine] = line;
        return lines.join("\n");
    }

    function evaluate(node, env, universe = 0) {
        history.push({ env: env.clone(), output: outputDiv.innerHTML, node });
        if (env.isCrazyMode && node.type === "NumberLiteral") {
            return node.value + (Math.floor(Math.random() * 11) - 5);
        }
        switch (node.type) {
            case "Program":
                node.body.forEach(stmt => evaluate(stmt, env, universe));
                break;
            case "FunctionDeclaration":
                env.setFunc(node.name, node.params, node.body);
                break;
            case "VariableDeclaration":
                const value = evaluate(node.value, env, universe);
                env.setVar(node.name, node.value.type === "QuantumExpression" ? { isQuantum: true, options: node.value.options.map(opt => evaluate(opt, env, universe)) } : value);
                break;
            case "NumberLiteral":
                return node.value;
            case "StringLiteral":
                return node.value;
            case "ArrayLiteral":
                return node.elements.map(elem => evaluate(elem, env, universe));
            case "ArrayAccess":
                const array = env.getVar(node.name);
                const index = evaluate(node.index, env, universe);
                if (!Array.isArray(array) || index >= array.length || index < 0) {
                    throw new Error(`Invalid array access: ${node.name}[${index}] at line ${node.line}`);
                }
                return array[index];
            case "PropertyAccess":
                const obj = env.getVar(node.object);
                if (Array.isArray(obj) && node.property === "length") {
                    return obj.length;
                }
                throw new Error(`Unknown property ${node.property} on ${node.object} at line ${node.line}`);
            case "MethodCall":
                const target = env.getVar(node.object);
                if (!Array.isArray(target)) {
                    throw new Error(`${node.object} is not an array at line ${node.line}`);
                }
                if (node.method === "push") {
                    const value = evaluate(node.args[0], env, universe);
                    target.push(value);
                    return undefined;
                } else if (node.method === "pop") {
                    if (target.length === 0) {
                        throw new Error(`Cannot pop from empty array ${node.object} at line ${node.line}`);
                    }
                    return target.pop();
                } else if (node.method === "shift") {
                    if (target.length === 0) {
                        throw new Error(`Cannot shift from empty array ${node.object} at line ${node.line}`);
                    }
                    return target.shift();
                } else if (node.method === "unshift") {
                    const value = evaluate(node.args[0], env, universe);
                    target.unshift(value);
                    return undefined;
                }
                throw new Error(`Unknown method ${node.method} on ${node.object} at line ${node.line}`);
            case "Identifier":
                const val = env.getVar(node.name);
                if (val === undefined) throw new Error(`Variable ${node.name} not found at line ${node.line}`);
                return val;
            case "BinaryExpression":
                const left = evaluate(node.left, env, universe);
                const right = evaluate(node.right, env, universe);
                switch (node.operator) {
                    case ">": return env.isCrazyMode ? left < right : left > right;
                    case "<": return env.isCrazyMode ? left > right : left < right;
                    case "=": return left === right;
                    case "+": return left + right;
                    case "-": return left - right;
                    case "*": return left * right;
                    case "/":
                        if (right === 0) throw new Error(`Division by zero at line ${node.line}`);
                        return left / right;
                    case "%":
                        if (right === 0) throw new Error(`Modulo by zero at line ${node.line}`);
                        return left % right;
                    case "^":
                        const result = Math.pow(left, right);
                        if (isNaN(result)) throw new Error(`Invalid power operation resulted in NaN at line ${node.line}`);
                        return result;
                    default: throw new Error(`Unknown operator: ${node.operator} at line ${node.line}`);
                }
            case "CallExpression":
                const func = env.getFunc(node.name);
                if (!func) throw new Error(`Function ${node.name} not found at line ${node.line}`);
                const args = node.args.map(arg => evaluate(arg, env, universe));
                const funcEnv = env.extend();
                func.params.forEach((param, i) => funcEnv.setVar(param, args[i] !== undefined ? args[i] : Math.floor(Math.random() * 10)));
                let returnValue;
                for (const stmt of func.body) {
                    const result = evaluate(stmt, funcEnv, universe);
                    if (stmt.type === "ReturnStatement") return returnValue = result;
                    if (stmt.type === "ExplodeStatement") break;
                }
                return returnValue;
            case "IfStatement":
                if (evaluate(node.condition, env, universe)) {
                    node.body.forEach(stmt => evaluate(stmt, env, universe));
                }
                break;
            case "GlitchStatement":
                const glitchVal = evaluate(node.argument, env, universe);
                outputDiv.innerHTML += `Universe ${universe}: ${glitchVal}<br>`;
                drawChaos(Math.random() * canvas.width, Math.random() * canvas.height, glitchVal);
                break;
            case "ReturnStatement":
                return evaluate(node.value, env, universe);
            case "PanicStatement":
                throw new Error(`${evaluate(node.message, env, universe)} at line ${node.line}`);
            case "MeltdownStatement":
                while (evaluate(node.condition, env, universe)) {
                    for (const stmt of node.body) {
                        evaluate(stmt, env, universe);
                        if (stmt.type === "ExplodeStatement") return;
                    }
                }
                break;
            case "ExplodeStatement":
                return;
            case "ChaosForStatement":
                const startVal = evaluate(node.start, env, universe);
                const endVal = evaluate(node.end, env, universe);
                const stepVal = evaluate(node.step, env, universe);
                let i = startVal;
                if (stepVal > 0) {
                    while (i < endVal) {
                        env.setVar(node.iterator, i);
                        for (const stmt of node.body) {
                            evaluate(stmt, env, universe);
                            if (stmt.type === "ExplodeStatement") return;
                        }
                        i += stepVal;
                    }
                } else if (stepVal < 0) {
                    while (i >= endVal) {
                        env.setVar(node.iterator, i);
                        for (const stmt of node.body) {
                            evaluate(stmt, env, universe);
                            if (stmt.type === "ExplodeStatement") return;
                        }
                        i += stepVal;
                    }
                }
                break;
            case "ChaosForEachStatement":
                const arr = evaluate(node.array, env, universe);
                if (!Array.isArray(arr)) {
                    throw new Error(`Expected an array for chaosforeach, got ${arr} at line ${node.line}`);
                }
                for (const itemValue of arr) {
                    env.setVar(node.item, itemValue);
                    for (const stmt of node.body) {
                        evaluate(stmt, env, universe);
                        if (stmt.type === "ExplodeStatement") return;
                    }
                }
                break;
            case "UnleashChaosStatement":
                env.isCrazyMode = true;
                document.body.classList.add("crazy-mode");
                env.shuffleArrays();
                break;
            case "MutateStatement":
                if (!env.getFunc(node.name)) throw new Error(`Function ${node.name} not found to mutate at line ${node.line}`);
                env.setFunc(node.name, node.params, node.body);
                break;
            case "ChaosCallStatement":
                if (!env.isCrazyMode) break;
                const allFuncs = env.getAllFuncs();
                const funcNames = Object.keys(allFuncs);
                if (funcNames.length === 0) break;
                const randomFuncName = funcNames[Math.floor(Math.random() * funcNames.length)];
                const randomFunc = allFuncs[randomFuncName];
                const randomArgs = randomFunc.params.map(() => Math.floor(Math.random() * 10));
                const callEnv = env.extend();
                randomFunc.params.forEach((param, i) => callEnv.setVar(param, randomArgs[i]));
                for (const stmt of randomFunc.body) {
                    const result = evaluate(stmt, callEnv, universe);
                    if (stmt.type === "ReturnStatement") break;
                    if (stmt.type === "ExplodeStatement") break;
                }
                break;
            case "RewindStatement":
                const steps = evaluate(node.steps, env, universe);
                if (history.length > steps) {
                    const rewindState = history[history.length - steps - 1];
                    env.vars = { ...rewindState.env.vars };
                    env.funcs = { ...rewindState.env.funcs };
                    env.isCrazyMode = rewindState.env.isCrazyMode;
                    outputDiv.innerHTML = rewindState.output;
                    history = history.slice(0, history.length - steps);
                    evaluate(rewindState.node, env, universe);
                }
                break;
            case "CorruptStatement":
                if (!env.isCrazyMode) break;
                currentCode = corruptCode(currentCode);
                const newTokens = tokenize(currentCode);
                const newAst = parse(newTokens);
                outputDiv.innerHTML += "Code corrupted!<br>";
                evaluate(newAst, env.clone(), universe);
                break;
            case "MultiverseStatement":
                if (!env.isCrazyMode) break;
                const universes = [env.clone(), env.clone()];
                universes.forEach((uEnv, i) => {
                    uEnv.isCrazyMode = Math.random() > 0.5;
                    outputDiv.innerHTML += `<b>Universe ${i + 1}:</b><br>`;
                    evaluate(ast, uEnv, i + 1);
                });
                break;
        }
    }

    try {
        evaluate(ast, globalEnv, 0);
        const mainFunc = globalEnv.getFunc("main");
        if (mainFunc) {
            const mainEnv = globalEnv.extend();
            mainFunc.body.forEach(stmt => evaluate(stmt, mainEnv, 0));
        }
    } catch (e) {
        outputDiv.innerHTML += `Chaos unleashed: ${e.message}`;
    }
}

// Exports for use in index.html
export { tokenize, parse, interpret };
