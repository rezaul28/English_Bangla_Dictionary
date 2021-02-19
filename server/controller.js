const fs = require('fs')
//const data = JSON.parse(fs.readFileSync('BengaliDictionary.json'))
const data = require('./BengaliDictionary.json');
let primary_hash_array
let a,b
const read_data = async () => {
    console.log(Object.keys(data).length);
    return Object.keys(data).length;

}
module.exports.store_data = async (req, res) => {

    const result = await read_data()
    return

}
module.exports.read_data = async (req, res) => {

    const result = await read_data()
    if (result.failed)
        res.send(result)
    else
        res.send("length : " + result)

}
const word_to_number = async (word) => {
    let word_length = word.length;

    let int_word = 0;
    let mod = Math.pow(10, 12) + 1
    for (let i = 0; i < word.length; i++) {
        word_length -= 1;
        if (word[i] == ' ' || word[i] == '.' || word[i] == "'" || word[i] == '-') {
            continue;
        }
        x = word.charCodeAt(i) - 97;
        int_word += ((Math.pow(26, word_length) % mod) * x) % mod
    }
    return (int_word);
}
const primary_hash = async () => {
    let elements = data.length
    let slot=16921;
    primary_hash_array = new Array(slot)
    console.log(elements);
    a=Math.floor((Math.random()*elements)%slot)+1;
    b=Math.floor((Math.random()*elements)%slot)+1;
    console.log(a+" "+b);
    for (let i = 0; i < elements; i++) {
        let word = data[i].en;
        word = word.toLowerCase();
        let number = ((a*await word_to_number(word))+b) % slot;
        if (!primary_hash_array[number]) {
            primary_hash_array[number] = [data[i]];
        } else {
            primary_hash_array[number].push(data[i])
        }

    }
    let two = 0,
        three = 0,
        four = 0,
        five = 0,
        six = 0,
        seven = 0
    for (let i = 0; i < elements; i++) {
        //console.log(primary_hash_array[i]);
        try {
            if (primary_hash_array[i].length == 2) {
                two++;
            } else if (primary_hash_array[i].length == 3) {
                three++;
            } else if (primary_hash_array[i].length == 4) {
                four++;
            } else if (primary_hash_array[i].length == 5) {
                five++;
            } else if (primary_hash_array[i].length == 6) {
                six++;
            } else if (primary_hash_array[i].length == 7) {
                seven++;
            }
        } catch {}
    }
    console.log("two " + two);
    console.log("three " + three);
    console.log("four " + four);
    console.log("five " + five);
    console.log("six " + six);
    console.log("seven " + seven);
    //console.log(primary_hash_array[0]);
}
module.exports.primary_hash = async (req, res) => {

    const result = await primary_hash()
    return

}
const print_test=async ()=>{
    console.log(a);
    console.log(b);
}
module.exports.print_test = async (req, res) => {

    await print_test()

}