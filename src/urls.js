const FORCE_SCRIPT_NAME = '/atm'

function url(url) {
    return FORCE_SCRIPT_NAME + url;
}

export default {
    home: url('/'),
    cassagrain: url('/cassagrain/'),
    newtonian: url('/newtonian/'),
}