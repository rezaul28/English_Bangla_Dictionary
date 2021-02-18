const fs = require('fs')
const data = JSON.parse(fs.readFileSync('E2Bdataset.json'))
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
    for (let i = 0; i < word.length; i++) {
        word_length -= 1;
        x = word.charCodeAt(i) - 96;
        int_word += Math.pow(26, word_length) * x
    }
    return (int_word);
}
const primary_hash = async () => {
    let slot = Object.keys(data).length
    let count = 1;
    for (let i = 0; i < slot; i++) {
        let int_word = await word_to_number(Object.keys(data)[i])
        if (i % 1000 == 0) {
            console.log("one thousand * " + count);
            count += 1
            console.log(new Date());
        }
        //console.log(Object.keys(data)[i]+"   "+int_word);
    }
    console.log(done);
}
module.exports.primary_hash = async (req, res) => {

    const result = await primary_hash()
    return

}