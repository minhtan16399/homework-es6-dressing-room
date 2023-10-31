// khởi tạo giao diện, lấy data từ api (navpill.json) async - await khắc phục bất đồng bộ khi chạy hàm
async function onloadData() {
    try {
        let response = await axios({
            url: './../data/navpill.json',
            method: 'GET',
        });
        console.log(response);
        showListBtn(response.data.data);
    } catch (error) {
        console.log(error);
    };
};

// sau khi lấy được data (response) từ api, hiển thị button lên giao diện. addEventListener thêm sự kiện click 
function showListBtn(response) {
    for (let tab of response) {
        let createTab = document.createElement('button');
        createTab.className = 'btn btn-outline-primary';
        createTab.addEventListener('click', async (e) => {
            let reset = document.querySelector('.tab-content');
            console.log('reset', reset, reset.hasChildNodes());
            if (reset.hasChildNodes()) { reset.innerHTML = '' };
            await getData(tab);
        });
        createTab.innerHTML = tab.showName;
        document.querySelector('.nav').appendChild(createTab);
    };
};

// lấy data từ api (tabpanes.json) trả về cho tab để hiển thị khi click button
async function getData(tab) {
    try {
        let response = await axios({
            url: './../data/tabpanes.json',
            method: 'GET',
        });
        // console.log(response);
        showListProduct(response.data.data, tab);
    } catch (error) {
        console.log(error);
    };
};

// từ listProduct lọc data theo type , trả về kết quả lọc (tab: lấy từ api navpill và item lấy từ api tabpanes)
function showListProduct(response, tab) {
    // let product = response.filter(item => {
    //     return item.type === tab.type
    // });
    let product = response.filter(item => (item.type === tab.type));
    console.log(product);
    showItem(product);
};

function showItem(product) {
    for (let item of product) {
        let img = item.imgSrc_jpg;
        let name = item.name;
        let createItem = document.createElement('div');
        createItem.className = 'card w-25';
        let createImgItem = document.createElement('img');
        createImgItem.className = 'card-img-top';
        createImgItem.src = img;
        let createNameItem = document.createElement('H5');
        createNameItem.className = 'card-title mt-2';
        createNameItem.innerHTML = name;
        let createBtn = document.createElement('button');
        createBtn.className = 'btn btn-outline-secondary';
        createBtn.innerText = 'Thu do'

        document.querySelector('.tab-content').appendChild(createItem);
        createItem.appendChild(createImgItem);
        createItem.appendChild(createNameItem);
        createItem.appendChild(createBtn);


    };
}

