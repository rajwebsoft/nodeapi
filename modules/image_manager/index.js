const _ = require('lodash');
const path = require('path');
const image_manager = {
    create: async (req, res) => {

        let responsedata = {
            "status": 0,
            "message": "Information",
            data: {}
        }

        try {
            const info_details = {
                "title": _.get(req.body, 'title', "")
            }
            if (_.get(req.files, 'photo') && req.files.photo.name) {
                
                let imagepath = path.dirname(path.dirname(path.dirname(__filename)))+"/public/"
                filePath=imagepath+req.files.photo.name;

                await image_manager.UploadFile(req.files.photo,filePath).then((result)=>{
                    info_details.photoname = req.files.photo.name;
                },(error)=>{
                    //console.log("Failed ",error)
                })
                

                responsedata.status=1;
                responsedata.message="successfully information";
                responsedata.data=info_details;
                return res.status(200).send(responsedata);

            } else {
                responsedata.status=1;
                responsedata.message="successfully information";
                responsedata.data=info_details;
                return res.status(200).send(responsedata);
            }
        } catch (er) {
            responsedata.data=er;
            return res.status(401).send(responsedata);
        }
    },

    UploadFile : (imgobj,filePath) => {
        return new Promise((resolve, reject) => {
            if(imgobj.name && imgobj.size) {
                imgobj.mv(filePath, (err) => {
                    if(err) {
                        console.log(err);
                        resolve(false);
                    }
                    else {
                        resolve(true);
                    }
                });
            } else {
                resolve(false);
            }
        });
    }
}

module.exports = image_manager
