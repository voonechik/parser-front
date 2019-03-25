import React, {Component} from 'react';
import './assets/css/fonts.css';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import './components/HeaderComponent/HeaderComponent.css';
import SitePages from './components/SitePages/SitePages';
import LogsContainer from './components/LogsContainer/LogsContainer';

class App extends Component {

  state = {
    sitePages: [],
    logs: [],
    downloadLink: ''
  }

  componentDidMount() {
    document.getElementsByClassName('tab-content-list')[0].scrollIntoView();
  }

  sitePages = (params) => {
    this.setState({sitePages: params});
  }

  logLinks = (params) => {
    const logsList = [...this.state.logs];
    logsList.push(params);
    this.setState({logs: logsList});

    var elem = document.getElementsByClassName('tab-content-list')[0];
    elem.scrollTop = 800;
    console.log(elem.scrollTop)
  }

  render() {
    let downloadLink;

    const downloadedResources = this.state.logs.map((url, id) => {
      if(url.status === 'download') {
        downloadLink = url.link;
      }
      return <li key={id} className='links__item'>
                <span className='links__item-link'>{url.link}</span> 
                <span className='links__item-status'>{url.status}</span>
             </li>;
    });

    let downloadButton;
    if(downloadLink) {
      downloadButton = <a href={downloadLink} download='Хотите скачать сайт?' className='download-site-btn waves-effect waves-light btn'>Скачать</a>;
    } else {
      downloadButton = <a href='#' download='Хотите скачать сайт?' className='download-site-btn waves-effect waves-light btn disabled'>Скачать</a>;
    }

    return(
      <main>

          <HeaderComponent 
                  onSitePages={this.sitePages.bind(this)} />
          <SitePages 
                  downloadPages={this.state.sitePages}
                  onLogLinks={this.logLinks.bind(this)} />
          <LogsContainer>
            <div label="Скачанные ресурсы">
              <ul className='tab-content-list'>
                {downloadedResources}
              </ul>
            </div>
            <div label="Ошибки скачивания">
              Ошибки скачивания
            </div>
          </LogsContainer>

          {downloadButton}

      </main>
    );
  };
};

export default App;






















// import './assets/fonts.css'

// import UrlsToDownload from './components/UrlsToDownload/UrlsToDownload';
// import LogsContainer from './components/LogsContainer/LogsContainer';

// class App extends Component {
//   state = {
//     downloadedUrls: []
//   }

//   setLinks = (urls) => {
//     this.setState({downloadedUrls: urls})
//   }

//   render() {
//     return (
//       <main className='main'>
//         <div className='container'>

//           <UrlsToDownload onLink={this.setLinks.bind(this)} />
//           <LogsContainer>
//             <div label="Скачанные ссылки">
//               <ul>
//                 {this.state.downloadedUrls.map((url, elementId) => {
//                     return <li 
//                               key={elementId}
//                               className='tab-list__item'>
//                                 <span className='tab-list__item-icon'></span>
//                                 <span className='tab-list__item-url'>{url.message}</span>
//                                 <span className='tab-list__item-status'>{url.status}</span>
//                            </li>
//                 })}
//               </ul>
//             </div>
//             <div label="Ошибки скачивания">
//                 Ошибки скачивания
//             </div>
//           </LogsContainer>

//           <div className='download-btn-wrap'>
//               <a href='##' download className="download-site btn disabled">Скачать архив</a>
//           </div>
        
//         </div>
//       </main>
//     );
//   }
// }

// export default App;