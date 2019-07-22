import React from 'react';

export default class VideoCompo extends React.Component {
    initFlv = ($video) => {
        if ($video) {
            $video.play();
        }
    }

    render() {
        const {url} = this.props;
        return (
            <video
                autoPlay
                controls
                width="100%"
                height="100%"
                id="video" 
                src={url}
                type="application/x-mpegURL"
                x-webkit-airplay="h5"
                x5-video-player-fullscreen="true"
                webkit-playsinline="true"
                x5-playsinline="true"
                playsInline={true}
                preload="auto"
                ref={this.initFlv}
            >
                <h5>您的系统不支持Video标签</h5>
            </video>
        )
    }
}