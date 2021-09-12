import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import videojs from 'video.js';
import './videojs.css';
import Navbar from '../Navbar/Navbar';

class VideoPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      videoJsOptions: null,
    }
  }

  componentDidMount() {
    axios.get('http://192.168.1.180:3333/api/videoList', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
      }
    }).then(res => {
      res.data.map(video => {
        if (video.upload_title === this.props.match.params.videoTitle) {
          this.setState({
            loaded: true,
            videoJsOptions: {
              autoplay: false,
              controls: true,
              sources: [{
                src: video.video_path
              }]
            }
          }, () => {
            this.player = videojs(this.videoNode, this.state.videoJsOptions, function onPlayerReady() {
              // console.log('onPlayerReady', this)
            });
          });
        }
      });
    });
  }

  doSth() {
    if (!video | !canvas) {
      var canvas = document.getElementById("prevImgCanvas");
      var video = document.getElementById("video").firstChild;
      video.addEventListener('seeked', () => this.eventListener(canvas, video), false);
    }

    if (video && canvas) {
      canvas.width = 3840;
      canvas.height = 2160;

      if (!isNaN(video.duration)) {
        var rand = Math.round(Math.random() * video.duration * 1000) + 1;
        video.currentTime = rand / 1000;
      }

    }
  }

  eventListener(canvas, video) {
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    if (!localStorage.getItem('userTokenTime')) return <Redirect to="/signIn" />
    return (
      <React.Fragment>
        <Navbar />
        <div className="row" style={{ width: "100vw" }}>
          <div className="col-12 mx-auto mt-5">
            {this.state.loaded ? (
              <div data-vjs-player>
                <video hidden id="video" ref={node => this.videoNode = node} className="video-js vjs-big-play-centered" />

              </div>
            ) : ' Loading ... '}
          </div>
          <div>
            <canvas id="prevImgCanvas">Your browser does not support the HTML5 canvas tag.</canvas>
            <input type="submit" onClick={() => { this.doSth() }} value="load random frame" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default VideoPlayer;
