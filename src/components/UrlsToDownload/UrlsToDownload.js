import React, {Component} from 'react';
import io from 'socket.io-client';

import './UrlsToDownload.css';
import DownloadUrl from './DownloadUrl';

class UrlsToDownload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentValue: '',
            urls: [],
            downloadWholeSite: false,
            downloadedUrls: [],
        }
        // this.onChangeHandler = this.onChangeHandler.bind(this);
        // this.addUrl = this.addUrl.bind(this);
        // this.deleteUrl = this.deleteUrl.bind(this);
        // this.downloadUrls = this.downloadUrls.bind(this);
    }

    onChangeHandler = (e) => {
        this.setState({currentValue: e.target.value});
    }

    addUrl = () => {
        const urlInputValue = this.state.currentValue;
        if(urlInputValue !== '' || /[?&]q=/.test(urlInputValue)) {
            const urlList = [...this.state.urls];
            urlList.push(this.state.currentValue);
            this.setState({urls: urlList});
        }
    }

    deleteUrl = (index) => {
        const urlList = [...this.state.urls];
        urlList.splice(index, 1);
        this.setState({urls: urlList});
    }

    toggleDownloadWholeSite = () => {
        this.setState(prevState => ({
            downloadWholeSite: !prevState.downloadWholeSite
        }));
    }

    downloadUrls = (e) => {
        e.preventDefault();

        const data = {
            array: this.state.urls,
            status: this.state.downloadWholeSite
        };
        // console.log(JSON.stringify(data))
        
        // const socket = io('http://192.168.89.132:4012');
        const socket = io('http://localhost:4001');
        socket.on('connect', () => {
            socket.emit('sendForm', JSON.stringify(data));

            document.getElementsByClassName('form-send ')[0].classList.add('disabled');
            document.getElementsByClassName('preloader-wrapper')[0].classList.add('active');
        });

        socket.on('link', data => {
            const messageList = [...this.state.downloadedUrls];
            // messageList.push(data.message);
            messageList.push(data);
            this.setState({downloadedUrls: messageList});
        });

        

        socket.on('status', (res) => {
            const messageList = [...this.state.downloadedUrls];
            messageList.push(res.message);
            this.setState({downloadedUrls: messageList});
            // console.log(`${res.message} ${res.status} ${res.name}`);

            // If res.status === download, enable download button
            if(res.status === 'download') {
                const downloadBtn = document.getElementsByClassName('download-site')[0];
                downloadBtn.classList.remove('disabled');
                downloadBtn.setAttribute('href', res.message);
                document.getElementsByClassName('preloader-wrapper')[0].classList.remove('active');
                socket.close();
            };
        });
    }

    render() {
        const urlList = this.state.urls.map((url, index) => {
            return <DownloadUrl 
                        key={index}
                        removeUrl={() => this.deleteUrl(index)}
                        text={url} />
        });

        let downloadButton;
        if(this.state.urls.length > 0) {
            downloadButton = <button type='submit' className='form-send waves-effect waves-light btn'>Начать процесс скачивания</button>;
        } else {
            downloadButton = <button type='submit' className='form-send waves-effect waves-light btn disabled'>Начать процесс скачивания</button>;
        }

        return (
            <div className='url-list-wrap'>
                <form onSubmit={this.downloadUrls}>
                    <div className='form-header'>
                        <input onChange={this.onChangeHandler} type='text' placeholder='url' />
                        <button type='button' onClick={this.addUrl} className="btn-floating btn-small waves-effect waves-light teal">
                            <i className="material-icons">add</i>
                        </button>
                    </div>

                    <div className='form-body'>
                        {urlList}
                    </div>

                    <p className='checkbox-paragraph'>
                        <label>
                            <input type="checkbox" onChange={this.toggleDownloadWholeSite} />
                            <span>Скачать весь сайт</span>
                        </label>
                    </p>

                    {downloadButton}
                    {/* <button type='submit' className='form-send waves-effect waves-light btn'>Начать процесс скачивания</button> */}

                    <div className="preloader-wrapper">
                        <div className="spinner-layer spinner-teal-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div><div className="gap-patch">
                            <div className="circle"></div>
                        </div><div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                        </div>
                    </div>

                </form>

            </div>
        );
    }
};

export default UrlsToDownload; 