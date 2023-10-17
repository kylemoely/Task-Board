const handleError = (err, setErr) => {
    switch(err.response.status.toString()[0]){
        case '4':
            setErr(`Something wasn't found. Please try again.`);
            break;
        case '5':
            setErr(`Something went wrong on our end. Please try again later.`);
            break;
        default:
            setErr('Something went wrong. Please try again.');
    }
}

export default handleError;