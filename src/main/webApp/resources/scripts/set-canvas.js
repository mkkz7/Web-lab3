export function getCanvas(){
    return document.getElementById(clientGraphFormId);
}

export function getSpinnerRValue() {
    var spinner = PF('spinnerR');
    if (spinner) {
        return spinner.getValue();
    }
    return null;
}