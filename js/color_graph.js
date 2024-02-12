// 実装する関数や演算
const functionGroups = {
    constant: ["PI", "E"],
    binary: ["+", "-", "*", "/", "\,"],
    // binary: {"+":"sum", "-":"subtract", "*":"multiply", "/":"divide"},
    unary: ["log10", "log1p", "log2", "log",
    "asinh", "acosh", "atanh", 
    "sinh", "cosh", "tanh", 
    "asin", "acos", "atan", 
    "sin", "cos", "tan", 
    "abs", "sqrt", "sign"]
}




// 文字列が条件を満たしている確認する関数
function checkBrackets(t){
    // 括弧の対応を確認する
    left = 0
    right = 0
    for (let i=0; i<t.length; i++){
        if (t[i]=="("){
            left++
        }
        else if (t[i]==")"){
            right++
        }
    }
    return left==right
}
function getCloseBrackets(t, start){
    // 閉じ括弧の位置を返す
    if (t[start]!="("){
        return false
    }
    left = 1
    right = 0
    for (let i=start+1; i<t.length; i++){
        if (t[i]=="("){
            left++
        }
        else if (t[i]==")"){
            right++
        }
        if (left==right){
            return i
        }
    }
    return False
}
function checkFunctionText(t=""){
    t += " " // ループ数の調整
    let q = ""
    for (let i=0; i<t.length; i++){
        if (t[i]=="("){ // 括弧内を調べる
            let closeIndex = getCloseBrackets(t, i)
            let ok = checkFunctionText(t.slice(i+1, closeIndex)+" ")
            i = closeIndex
            if (!ok){
                return false
            }
        }
        else if (t[i]==" " || functionGroups.binary.includes(t[i])){
            // 区切り文字 この時点でqは何らかの意味を持つ
            // (constant, unaryではない) -> 数字 or 変数
            if (q.length==0){
            }
            else if (q=="x" || q=="y"){
                q = ""
            }
            else if (!isNaN(q)){
                q = ""
            }
            else{
                console.warn(`意味を持たない文字列があります t=${t} i=${i} t[i]=${t[i]} q=${q}`)
                return false
            }
        }
        else{
            q += t[i]

            if (functionGroups.constant.includes(q)){
                q = ""
            }
            else if (functionGroups.unary.includes(q)){
                q = ""
            }
        }
    }
    if (q.length!=0){
        return false
    }
    return true
}


// 変換の準備
function normalize(x){
    // とりあえず雑に切り上げor切り捨て
    let value;
    if (0<=x && x<=1){ value = x}
    else if (x<0){ value = 0}
    else{ value = 1}
    // console.log(`normalize ${x} to ${value}`)
    return value
}



// 変換する
function getFunctionFromText(t=""){
    if (t.length==0){
        t = "0"
    }
    if (!checkBrackets(t)){
        console.error(`括弧の数が一致していません t=${t}`)
    }
    if (!checkFunctionText(t)){
        console.error(`関数に変換できません  t=${t}`)
    }
    else{
        for (let i=0; i<functionGroups.unary.length; i++){
            f = functionGroups.unary[i]
            t = t.replace(f, `[placeholder-${i}]`)
        }
        for (let i=0; i<functionGroups.unary.length; i++){
            f = functionGroups.unary[i]
            t = t.replace(`[placeholder-${i}]`, `Math.${f}`)
        }

        for (let i=0; i<functionGroups.constant.length; i++){
            c = functionGroups.constant[i]
            t = t.replace(c, `[placeholder-${i}]`)
        }
        for (let i=0; i<functionGroups.constant.length; i++){
            c = functionGroups.constant[i]
            t = t.replace(`[placeholder-${i}]`, `Math.${c}`)
        }
        return new Function("x", "y", `return normalize(${t})*255`)
    }
}
// ここまで


// canvasの座標変換
function coordinateTransfom(x, y, canvas){
    // canvasを[-1, 1]x[-1, 1]とみなす
    // x, y -> u, v
    u = (2*x - canvas.width)/(canvas.width)
    v = (canvas.height - 2*y)/(canvas.height)
    return [u, v]
}




// main.jsから呼ぶ関数
function getRGBFunction(r, g, b){
    funcR = getFunctionFromText(r)
    funcG = getFunctionFromText(g)
    funcB = getFunctionFromText(b)
    f = (x, y) => [funcR(x, y), funcG(x, y), funcB(x, y)]
    // console.log(f, funcR, funcG, funcB)
    return f
}

function drawGraph(f, canvas, context=undefined){
    if (context===undefined){
        context = canvas.getContext("2d")
    }
    step = 1
    for (let x=0; x<canvas.width; x+=step){
        for (let y=0; y<canvas.height; y+=step){
            let [u, v] = coordinateTransfom(x, y, canvas)
            let color = f(u, v)
            context.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
            // console.log(u, v, color)
            context.fillRect(x, y, step, step)
        }
    }
}
