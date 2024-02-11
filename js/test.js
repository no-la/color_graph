function testGetFunctionFromText(){
    const X = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    const Y = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    
    T = ["x*x+1", "x * x + 1", "x  *x+1", "(x*x )  + (1)"]
    f = (x, y) => x**2+1
    for (let t of T){
        console.log(t)
        g = getFunctionFromText(t)
        for (let x of X){
            for (let y of Y){
                console.assert(f(x, y) != g(x, y))
            }
        }
    }
}