import React, {Component} from 'react';
import './SitePages.css';

import M from 'materialize-css/dist/js/materialize.min.js';
import io from 'socket.io-client';

class SitePages extends Component {
    state = {
        pages: this.props.downloadPages,
        selectedPages: [],
        downloadWholeSite: false
    }

    beginDownload = () => {
        const socket = io('http://localhost:4001');
        //const socket = io('http://192.168.89.132:4012');
        socket.on('connect', () => {
            const data = JSON.stringify({array: [...this.state.selectedPages]});
            // console.log(data)
            socket.emit('sendForm', data)

            socket.on('status', res => {
                // console.log(res);
                this.props.onLogLinks(res);
            });
            
            // socket.close();
        });

    }

    toggleAllCheckboxes = () => {
        this.setState({downloadWholeSite: !this.state.downloadWholeSite});

        const source = document.getElementsByClassName('site-pages-form-item__selct-all')[0];
        const checkboxes = document.getElementsByName('site-page');
        for(var i=0, n=checkboxes.length;i<n;i++) {
            checkboxes[i].checked = source.checked;
        }

    }

    addSitePage = (event) => {
        if(event.target.checked) {
            const value = event.target.nextSibling.textContent;
            const pagesList = [...this.state.selectedPages];
            pagesList.push(value);

            this.setState({selectedPages: pagesList});
        } else {
            const currentItem = this.state.selectedPages.indexOf(event.target.nextSibling.textContent)
            const pagesList = [...this.state.selectedPages];
            pagesList.splice(currentItem, 1);

            this.setState({selectedPages: pagesList});
        }
    }

    render() {
        const downloadPagesList = this.props.downloadPages.map((page, id) => {
            return <div key={id} className='site-pages-form-item'>
                        <label>
                            <input 
                                name='site-page' 
                                className='site-pages-form__input'
                                type="checkbox"
                                onClick={this.addSitePage} />
                            <span data-position="top" data-tooltip={page} className='tooltipped'>{page}</span>
                        </label>
                    </div>
        });

        var elems = document.querySelectorAll('.tooltipped');
        var instances = M.Tooltip.init(elems);

        return (
            <section className='site-pages'>
                    <h2 className='site-pages__title'>Выберите страницы для скачивания</h2>

                    <form action="#" className='site-pages-form'>
                        {downloadPagesList}

                        <div className='site-pages-form-item site-pages-form-item_last'>
                            <label onClick={this.toggleAllCheckboxes}>
                                <input 
                                    type="checkbox" 
                                    disabled='disabled'
                                     
                                    className='site-pages-form-item__selct-all' />
                                <span>Выбрать все</span>
                            </label>
                        </div>
                    </form>

                    <button 
                        type='button' 
                        className='begin-download-btn waves-effect waves-light btn disabled' 
                        onClick={this.beginDownload}>Начать процесс скачивания
                    </button>
            </section>
        );
    };
};

export default SitePages;
