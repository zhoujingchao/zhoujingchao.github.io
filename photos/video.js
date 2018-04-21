;(function(){
  let searchData;
  
  function loadData(success) {
    if (!searchData) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', './video.json?t=' + +new Date(), true);

      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          let res = JSON.parse(this.response);
          searchData = res;
          success(searchData);
        } else {
          console.error(this.statusText);
        }
      };

      xhr.onerror = function () {
        console.error(this.statusText);
      };

      xhr.send();
    } else {
      success(searchData);
    }
  }

  render = function (res) {
    let len = res.list.length;
    if (!len) return
    
    let liTmpl = '';
    for (let i = 0; i < len; i++) {
      let isShow = res.list[i].text ? 'show' : 'hidden'
      liTmpl += `
        <div class="video-container">
          <div class="video-header is-${isShow}">
            <center>
              <h1>${res.list[i].text}</h1>
            </center>
            <hr>
          </div>
          <div class="video-body">
            <video width="84%" height="85%" controls="controls" src="${res.list[i].link}">
            </video>
          </div>
        </div>
      `
    }
    document.querySelector('.videos-list').innerHTML = liTmpl;
  }

  loadData(function (data) {
    render(data);
  });

})()