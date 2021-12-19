console.log("This is postMan  console.log");

const parametersBox = document.getElementById('parametersBox');
const json = document.getElementById('jsonBox');
const addParam = document.getElementById('addParam');
const params = document.getElementById('params');
const submitBtn = document.getElementById('submitBtn');
parametersBox.style.display = 'none';

//hide parametersBox and dispay json box
let radioJson = document.getElementById('json');
radioJson.addEventListener('click', () => {
    parametersBox.style.display = 'none';
    json.style.display = 'block'
});

//hide json box and dispaly parametersBox
let radioParameters = document.getElementById('customParameters');
radioParameters.addEventListener('click', () => {
    parametersBox.style.display = 'block';
    json.style.display = 'none'
});

//adding parametersBox after clicking button
let addedParamCount = 1;
addParam.addEventListener('click', () => {
    params.innerHTML += `<div class="form-group row my-4" id="params${++addedParamCount}">
                            <label for="parametersBox" class="col-sm-2 col-form-label">Parameter  ${addedParamCount}</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="parameterKey${addedParamCount}" placeholder="Enter Parameter  ${addedParamCount} Key">
                            </div>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="parameterValue${addedParamCount}" placeholder="Enter Parameter ${addedParamCount} Value">
                            </div>
                            <button id="deleteBtn${addedParamCount}" class="btn btn-primary col-md-1" onclick="funcDeteParam(${addedParamCount})">-</button>
                       </div>`;
});

//delete parametersBox after clicking button
function funcDeteParam(index) {
    document.getElementById(`params${index}`).style.display = 'none';
    document.getElementById(`parameterKey${index}`).value = '';
    document.getElementById(`parameterValue${index}`).value = '';
}

//handle submit Button
submitBtn.addEventListener('click', () => {
    document.getElementById('responseBox').innerHTML = "Please wait.. Fetching response...";
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").id;
    let contentType = document.querySelector("input[name='contentType']:checked").id;
    let data;

    if (contentType == 'json') {
        data = document.getElementById('jsonText').value;
    }
    else {
        data = {}
        for (let i = 1; i < addedParamCount + 1; i++) {
            let key = document.getElementById(`parameterKey${i}`).value;
            let value = document.getElementById(`parameterValue${i}`).value;
            data[key] = value;
        }
    }
    data = JSON.stringify(data);

    if (requestType == 'get') {
        fetch(url, {
            method: 'GET',
        }).then(response => response.text()).then((text) => {
            document.getElementById('responseBox').innerHTML = text;
            Prism.highlightAll();
        });
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.text()).then((text) => {
            document.getElementById('responseBox').innerHTML = text;
            Prism.highlightAll();
        });
    }
});
