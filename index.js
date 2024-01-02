import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";


/*Inquirer.prompt will prompt the user for a url which is stored with the key name.
The qr object will take the name: input and save it as a variable
*/
inquirer.prompt([
        {
            message:"Please input your URL: ",
            //name stores the answer
            name: "URL",
        },
    ])

    .then((answers) => {
        const url = answers.URL;
        var qr_svg = qr.image(url);
        //saves the image as a .png file
        qr_svg.pipe(fs.createWriteStream('qr_img.png'));
        //adds the url as a txt file
        fs.writeFile('URL.txt', url, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          }); 
    })
    .catch((error) => {
        if(error.isTtyError) {
            prompt("Could not render Qr Code");
        } else {
            console.log("Something went wrong.");
        }
    });

