const splitFile = require('split-file');
const fs = require('fs');
 
split(2);

function split(size) {
	 splitFile.splitFile("./file/file.txt", size)
	  .then((names) => {
	  console.log(names);
	  })
	  .catch((err) => {
	    console.log('Error: ', err);
	  });
}