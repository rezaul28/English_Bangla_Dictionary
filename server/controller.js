const fs = require('fs')
//const data = JSON.parse(fs.readFileSync('BengaliDictionary.json'))
const data = require('./BengaliDictionary.json');
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
    let mod =Math.pow(10,12)+1
    for (let i = 0; i < word.length; i++) {
        word_length -= 1;
        if(word[i]==' ' || word[i]=='.' || word[i]=="'"||word[i]=='-'){
            continue;
        }
        x = word.charCodeAt(i) - 97;
        int_word += ((Math.pow(26, word_length)%mod) * x)%mod
    }
    return (int_word);
}
const primary_hash = async () => {
    let slot = data.length
    let count = 1;
    for (let i = 0; i < slot; i++) {
        let word = data[i].en;
        word = word.toLowerCase();
        let number =await word_to_number(word)
        console.log(number);
        if(number<0){
            console.log(word+"   "+number);
        }
    }
    console.log("done");
}
module.exports.primary_hash = async (req, res) => {

    const result = await primary_hash()
    return

}