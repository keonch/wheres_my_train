import parseRespose from './parse_response';

function requestMta() {
  $.ajax({
    url: 'https://crossorigin.me/http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045',
    encoding: null
  }).then((data) => parseRespose(data), (errors) => console.log(errors))
}

export default requestMta;
