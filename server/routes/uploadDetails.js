const express = require('express');
const router = express.Router();

const port = require('../config/default').port;
const VideoDetails = require('../models/VideoDetailsSchema');

router.post('/', (req, res, next) => {

    let username = req.userData.firstName
    let title = req.body.filename.replace(/ /g, '_').replace(/.mov|.mpg|.mpeg|.mp4|.wmv|.avi/gi, '');
    let target = 'http://192.168.1.180:' + port + '/api/videos/' + req.body.filename.replace(/ /g, '_');

    const videoDetails = new VideoDetails({
        uploader_name: username,
        upload_title: title,
        video_path: target,
        thumbnail_path: 'http://192.168.1.180:' + port + '/api/videos/video_thumbnails/' + encodeURIComponent(title + '.jpg')
    });
    videoDetails
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Video upload successful'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                message: err
            });
        });


});

module.exports = router;