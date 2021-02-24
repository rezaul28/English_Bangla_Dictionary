const data = require('./BengaliDictionary.json');
const slot = 16921;
const first_prime = 610699;
const second_prime = 611953;
let primary_hash_array
let perfect_hash_array

let a, b
let secondary_a, secondary_b
const read_data = async () => {
    //console.log(Object.keys(data).length);
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
    word = word.toLowerCase();
    let int_word = 0;
    let mod = Math.pow(10, 12) + 1
    for (let i = 0; i < word.length; i++) {
        word_length -= 1;
        if (word[i] == ' ' || word[i] == '.' || word[i] == "'" || word[i] == '-') {
            //console.log(word);
            continue;
        }
        x = word.charCodeAt(i) - 97;
        int_word += ((Math.pow(26, word_length) % mod) * x) % mod
    }
    return (((a * int_word) + b) % 610699)%slot;
}
const word_to_number_second = async (word) => {
    let word_length = word.length;
    word = word.toLowerCase();
    let int_word = 0;
    for (let i = 0; i < word.length; i++) {
        word_length -= 1;
        if (word[i] == ' ' || word[i] == '.' || word[i] == "'" || word[i] == '-') {
            continue;
        }
        x = word.charCodeAt(i) - 96+1;
        int_word += ((Math.pow(27, word_length) % 17033) * x) % 17033
    }

    return int_word;
}
const primary_hash = async () => {
    let elements = data.length
    primary_hash_array = new Array(slot)
    a = Math.floor((Math.random() * Math.pow(10,8)) % first_prime) + 1;
    b = Math.floor((Math.random() * Math.pow(10,12)) % first_prime);
    count=0
    for (let i = 0; i < elements; i++) {
        let word = data[i].en;
        let number = await word_to_number(word)
        if (!primary_hash_array[number]) {
            primary_hash_array[number] = [data[i]];
        } else {
            primary_hash_array[number].push(data[i])
            count++
        }
    }
    //console.log("Primary "+count);
}
const secondary_hash = async () => {
    perfect_hash_array = new Array(16912);
    //console.log(primary_hash_array.length);
    secondary_a = Math.floor((Math.random() * Math.pow(10,8)) % second_prime) + 1;
    secondary_b = Math.floor((Math.random() * Math.pow(10,8)) % second_prime);
    count = 0;
    for (let i = 0; i < slot; i++) {
        if (!primary_hash_array[i])
            continue;
        let elements_in_ith = primary_hash_array[i].length
        if (elements_in_ith < 2) {
            continue;
        }
        // if (true) {
        //     console.log("elements "+elements_in_ith);


        // }
        let secondary_slot = Math.pow(elements_in_ith, 2);
        perfect_hash_array[i] = new Array(secondary_slot)
        for (let j = 0; j < elements_in_ith; j++) {
            let int_word=await word_to_number_second(primary_hash_array[i][j].en)
            // if(int_word){
            //     console.log(primary_hash_array[i][j].en +"  "+int_word);
            // }
            let number = (((secondary_a * int_word) + secondary_b)%second_prime) % secondary_slot;
            if(perfect_hash_array[i][number]){
                count++;
            }
            perfect_hash_array[i][number] = primary_hash_array[i][j];
            // if (true) {
            //     console.log("perfect");
            //     console.log(int_word);
            //     console.log(number)

            // }
        }
    }
    //console.log(count);
}
module.exports.secondary_hash = async () => {
    await secondary_hash()
}
module.exports.primary_hash = async (req, res) => {

    const result = await primary_hash()
    return

}
const get_words = async req =>{
    let word = req.query.word;
    let primary_table = await word_to_number(word);
    console.log(word);
    //console.log(primary_table);
    if(!perfect_hash_array[primary_table]){
        return "Not found"
    }
    let secondary_slot=perfect_hash_array[primary_table].length;

    //console.log(secondary_slot);
    if(secondary_slot>1){
        let int_word = await word_to_number_second(word);
        let secondary_table=(((secondary_a * int_word) + secondary_b)%second_prime) % secondary_slot;
        if(!perfect_hash_array[primary_table][secondary_table]){
            return "Not found"
        }
        if(perfect_hash_array[primary_table][secondary_table].en==word){
            return perfect_hash_array[primary_table][secondary_table]
        }else{
            return "Not found"
        }
    }else{
        if(perfect_hash_array[primary_table].en==word){
            return perfect_hash_array[primary_table]
        }else{
            return "Not found"
        }
    }
}
module.exports.get_words = async (req, res) => {

    const result = await get_words(req)
    res.send(result)

}