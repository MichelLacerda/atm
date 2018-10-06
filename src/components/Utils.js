export function round(x, size) {
    switch (size) {
        case 1:
            return Math.round(x * 10) / 10;
        case 2:
            return Math.round(x * 100) / 100;
        default:
            return Math.round(x * 1000) / 1000;
    }
}

export function sagittaOfArc(r, l) {
    /* s = r - sqrt(r^2 - l^2)
        s = Sagitta
        r = Raio da curvatura (2 * F)
        l = Metade do diametro da superficie (D/2)
    */
    return Math.round(1000 * (r - Math.sqrt(Math.pow(r, 2) - Math.pow(l, 2)))) / 1000;
}

export function radiusOfArc(l, s) {
    /* r = (s^2 + l^2)/2s
        r = Raio da curvatura
        l = Metade do diametro da superficie (D/2)
        s = Sagitta
    */
    return Math.round(1000 * ((Math.pow(s, 2) + Math.pow(l, 2)) / (2 * s))) / 1000;
}

export function heightOfArcAnyPoint(s, r, x) {
    /* h = s + sqrt(r^2 - x^2) - r
        h = Altura do arco (3 casas decimais)
        s = Sagitta
        r = Raio da curvatura
        x = Descolamento lateral do centro ao ponto em que desejar medir
    */
    return Math.round(1000 * (s + Math.sqrt(Math.pow(r, 2) - Math.pow(x, 2)) - r)) / 1000;
}

export function circumferenceOfArc(l, r) {
    /* θ = 2 arcsin(l/r); c = θr
        c = Comprimento (circuferência) do arco
        l = Metade do diametro da superficie (D/2)
        r = Raio da curvatura
    */
    return Math.round(1000 * ((2 * Math.asin(l / r)) * r)) / 1000;
}

export function radians(degrees) {
    return degrees * Math.PI / 180;
}