import React, {Component} from 'react';
import io from 'socket.io-client';
import './HeaderComponent.css';
import url from 'url';

class HeaderComponent extends Component {
    state = {
        currentUrl: '',
        showSiteToDownload: false,
        siteData: {}
    }

    addUrl = () => {
        const uri = document.getElementsByClassName('form__input')[0].value;
        this.setState({currentUrl: uri});
        
        if(uri) {
            this.setState({showSiteToDownload: true});
            // const socket = io('http://192.168.89.132:4012');
            const socket = io('http://localhost:4001');
            socket.on('connect', () => {
                const data = JSON.stringify({array: [this.state.currentUrl]});
                socket.emit('info', data);
                socket.on('info', res => {
                    console.log(res.link.links)
                    res.link.links.map(link => {
                        const formatUrl = url.format({
                            pathname: url.parse(link).pathname
                        })
                        const splitLink = formatUrl.split('/')[formatUrl.split('/').length -1];
                        if (splitLink) { // Если главная страница - назвать её main 
                            console.log(formatUrl);
                        }
                    })
                    // for (const link of res.link) {
                    //     const formatUrl = url.format({
                    //         pathname: url.parse(link).pathname
                    //     })
                    //     // const splitLink = formatUrl.split('/')[formatUrl.split('/').length -1];
                    //     console.log(formatUrl);
                    // }
                    this.setState({siteData: res});
                    this.setSiteData();

                    socket.close(); // все равно не закрывается соединение - пофиксить
                });
            });
        }
        
    }

    setSiteData = () => {
        document.getElementsByClassName('header-component')[0].classList.add('header-component-active');
        document.getElementsByClassName('header-component-active')[0].style.background = `url(${this.state.siteData.link.screen})`;
        document.getElementsByClassName('header__site-description')[0].textContent = this.state.siteData.link.title;
        document.getElementsByClassName('header__site-status')[0].textContent = `Статус сайта ${this.state.siteData.link.status}, ip - ${this.state.siteData.link.ip}`;

        this.props.onSitePages(this.state.siteData.link.links);

        if(this.state.siteData.link.links.length !== 0) {
            document.getElementsByClassName('begin-download-btn')[0].classList.remove('disabled');
            document.getElementsByClassName('site-pages-form-item__selct-all')[0].removeAttribute('disabled');
        }
    }

    removeUrl = () => {
        this.setState({showSiteToDownload: false});
    }

    render() {
        let siteToDownload;
        if(this.state.showSiteToDownload) {
            siteToDownload = <div className='site-to-download'>
                <h3 className='site-to-download__title'>{this.state.currentUrl}</h3>
                <button type='button' className='site-to-download__btn btn-floating btn-small waves-effect waves-light teal' onClick={this.removeUrl}>
                    <i className="material-icons">remove</i>
                </button>
            </div>;
        }

        return (
            <section className='header-component'>
            <div className='content-container'>
                <h2>Информация о сайте</h2>

                <div>
                    <p className='header__site-description'>Описание сайта</p>
                    <p className='header__site-status'>Статус, ip сайта</p>
                </div>

                <div>
                    <form>
                        <input type='text' className='form__input' required placeholder='Добавте ссылку' />
                        <button type='button' className='waves-effect waves-light btn' onClick={this.addUrl}>Добавить</button>
                    </form>
                </div>

                {siteToDownload}
            </div>
            </section>
        );
    };
};

export default HeaderComponent;