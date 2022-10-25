const fs = require('fs');
const http =  require('http');
const url = require('url');
const nodemon = require('nodemon')

// Read files

const student_data = fs.readFileSync('C:/Sulochan/Misc/Demo/Tableau_Evaluation_1_Data/DA15_Student_Details.json', 'utf-8');
const submissions = fs.readFileSync('C:/Sulochan/Misc/Demo/Tableau_Evaluation_1_Data/submissions.json', 'utf-8');
const questions = fs.readFileSync('C:/Sulochan/Misc/Demo/Tableau_Evaluation_1_Data/questions.json', 'utf-8')

// Parse JSON to Javascript Objects

const student_data_obj = JSON.parse(student_data);
const submission_obj = JSON.parse(submissions);

const generate_url = (temp) => {
    return '/' + temp.username
}

const urls = submission_obj.map(el => generate_url(el))

const server = http.createServer((req, res) => {

    const {query, pathname} = url.parse(req.url, true)

    switch (pathname) {
        case '/submissions':
            res.end(submissions);
            break;
        case '/questions':
            res.end(questions);
            break;
        default:
            res.end('No Response');
            break;
    }

})

server.listen(3000, '0.0.0.0', () => {
    console.log('Listening to requests on port 8000')
})