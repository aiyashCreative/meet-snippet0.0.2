const version = "0.0.2"
const CDNlink = `https://cdn.jsdelivr.net/gh/aiyashCreative/meet-snippet${version}/`
const startingTime = new Date().getTime()
const jqueryScript = document.createElement('script')
const sweetAlert2Script = document.createElement('script')
const socketClientScript = document.createElement('script')
const watchScript = document.createElement('script')
const axiosScript = document.createElement('script')
const axiosLibrary = document.createElement('script')
const envScript = document.createElement('script')
const endPointScript = document.createElement('script')
const bootstrapBundleScript = document.createElement('script')
const bootstrapLink = document.createElement('link')

// stylesheet links
bootstrapLink.setAttribute('rel', "stylesheet")
bootstrapLink.setAttribute('href', "https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css")
bootstrapLink.setAttribute('intergirty', "sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N")
bootstrapLink.setAttribute('crossorigin', "anonymous")

// scripts
jqueryScript.setAttribute('src', "https://code.jquery.com/jquery-3.6.4.min.js")
sweetAlert2Script.setAttribute('src', "https://cdn.jsdelivr.net/npm/sweetalert2@11")
socketClientScript.setAttribute('src', "https://cdn.socket.io/4.6.0/socket.io.min.js")
socketClientScript.setAttribute('crossorigin', "anonymous")
axiosScript.setAttribute('src', "https://unpkg.com/axios/dist/axios.min.js")
axiosLibrary.setAttribute('src', `${CDNlink}libraries/axios.js`)
envScript.setAttribute('src', `${CDNlink}constants/env.js`)
bootstrapBundleScript.setAttribute('src', "https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js")
watchScript.setAttribute('src', `${CDNlink}libraries/watch.js`)

const socketUrl = "https://marketrix-soc.creative-hub.co/"
// const socketUrl = "http://192.168.1.76:8081"

// const clientUrl = "http://localhost/creativeHub/marketrix-meet-library/"

// script tags
document.body.prepend(axiosScript)
document.body.prepend(sweetAlert2Script)
document.body.prepend(socketClientScript)
document.body.prepend(watchScript)
document.body.prepend(jqueryScript)
document.body.prepend(envScript)

// header link
document.head.prepend(bootstrapLink)

const checkReady = (callback) => {
    if (window.jQuery) { callback(jQuery) }
    else window.setTimeout(function () { checkReady(callback); }, 20);
};

let name; // testing purporses
let socket;

let startInterval;

// initializing the library
checkReady(() => {
    // socket = io.connect(socketUrl)
    document.body.prepend(axiosLibrary)
    document.body.prepend(bootstrapBundleScript)
    listening()
    start()
})

// all watch would come inside this listening method
const listening = () => {
    // watch(() => {
    //     console.log('name is changing', name)
    // }, 'name')

    // watch(() => {
    //     if (meeting.meeting_id) meeting.start()
    //     else if (meeting.meeting_token) meeting.join.token()
    //     else if (meeting.guest_token) meeting.join.guest()
    // }, ['meeting.meeting_id', 'meeting.meeting_token', 'meeting.guest_token'])
}

const start = () => {
    const buttonDiv = document.createElement('div')
    const modalFormDiv = document.createElement('div')
    buttonDiv.setAttribute("id", "button-div")
    modalFormDiv.setAttribute("id", "modal-form-div")
    $("#button-div").css("position", "relative")
    document.body.append(modalFormDiv)
    document.body.append(buttonDiv)

    fetch(`${CDNlink}pages/modal.html`)
        .then((response) => {
            return response.text()
        })
        .then((html) => {
            modalFormDiv.innerHTML = html
        });

    fetch(`${CDNlink}pages/contact-button.html`)
        .then((response) => {
            return response.text()
        })
        .then((html) => {
            buttonDiv.innerHTML = html
        });
}

const closeModal = () => {
    $(".modal").hide('slow')
}

const showModal = () => {
    $(".modal").show('slow')
}

const browserName = (function (agent) {
    switch (true) {
        case agent.indexOf("edge") > -1:
            return "MS Edge";
        case agent.indexOf("edg/") > -1:
            return "Edge ( chromium based)";
        case agent.indexOf("opr") > -1 && !!window.opr:
            return "Opera";
        case agent.indexOf("chrome") > -1 && !!window.chrome:
            return "Chrome";
        case agent.indexOf("trident") > -1:
            return "MS IE";
        case agent.indexOf("firefox") > -1:
            return "Mozilla Firefox";
        case agent.indexOf("safari") > -1:
            return "Safari";
        default:
            return "other";
    }
})(window.navigator.userAgent.toLowerCase());

const browserVersion = (function (agent) {
    switch (true) {
        case agent.indexOf("edge") > -1:
            return `${agent.split("edge")[1]}`;
        case agent.indexOf("edg/") > -1:
            return `${agent.split("edg/")[1]}`;
        case agent.indexOf("opr") > -1 && !!window.opr:
            return `${agent.split("opr/")[1]}`;
        case agent.indexOf("chrome") > -1 && !!window.chrome:
            return `${agent.split("chrome/")[1]}`;
        case agent.indexOf("trident") > -1:
            return `${agent.split("trident/")[1]}`;
        case agent.indexOf("firefox") > -1:
            return `${agent.split("firefox/")[1]}`;
        case agent.indexOf("safari") > -1:
            return `${agent.split("safari/")[1]}`;
        default:
            return "other";
    }
})(window.navigator.userAgent.toLowerCase());


const submit = () => {
    socket = io.connect(socketUrl);


    const visitorDevice = {
        browser: navigator?.userAgentData?.brands[2]?.brand || browserName,
        browserVersion:
            navigator?.userAgentData?.brands[2]?.version || browserVersion,
        platform: navigator?.platform,
        networkDownlink: navigator?.connection?.downlink,
        networkEffectiveType: navigator?.connection?.effectiveType,
        vendor: navigator?.vendor,
        screenResolution: window?.screen?.width + "x" + window?.screen?.height,
        screenWidth: window?.screen?.width,
        screenHeight: window?.screen?.height,
    };

    const Visitor = {
        name: $("input[name='name']").val(),
        designation: $("input[name='designation']").val(),
        email: $("input[name='email']").val(),
        company: $("input[name='company']").val(),
        phone: $("input[name='phone']").val(),
        inquiryType: $("input[name='inquery']").val(),
        message: $("input[name='message']").val(),
        visitorDevice: visitorDevice,
    };

    socket.emit("VisitorRequestMeet", Visitor);
}

const meeting = {
    meeting_id: "",
    meeting_token: "",
    guest_token: "",
    connect() {
        console.log("meeting connect")
    },
    async start() {
        const req = { "meeting_id": meeting.meeting_id }

        await APIKit.post(END_POINTS.MEETING.START_MEETING, req)
            .then(handleResponse)
            .then(data => {
                return data;
            })
            .catch(error => {

                if (error?.response) {
                    console.log("ERROR1", error)
                    return error?.response?.data;
                }
                else {
                    console.log("ERROR2", error)
                    return error;
                }
            })
    },
    join: {
        token() {
            console.log("joining using token")
        },
        guest() {
            console.log("guest joining")
        }
    }
}

const clickMe = () => {
    console.log("clicked")
    name = "aiyash"
    meeting.meeting_id = "chg-fcq-fsi"
    meeting.meeting_token = "ksajfhkkk"
}