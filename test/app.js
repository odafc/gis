const createPlaces = ({ latitude, longitude }) => [
    ['p1', 35.191143938313395, 132.5010111812519],
    ['p2', 35.1911328788817, 132.50099539303255],
    ['p3', 35.191129192404155, 132.50095028383444],
  ].map(([label,  cy,  cx]) => ({
    label,
    location: {
      latitude : cy,
      longitude: cx,
    },
  }));
  
  const models = [
    {
      url: '#asset-eevee',
      scale: ['2', '2', '2'],
      info: 'Eevee',
    }
  ];
  
  const createEntity = ({ id, location: { latitude, longitude }, model, scale: [x, y, z] }) => {
    const $entity = document.createRange().createContextualFragment(`
      <a-entity
        id="${id}"
        gltf-model="${model}"
        scale="${x} ${y} ${z}"
        gps-entity-place="latitude: ${latitude}; longitude: ${longitude};"
        animation="property: rotation; to: 0 360 0; dur: 4000; easing: linear; loop: true"
      ></a-entity>
    `);
  
    $entity.addEventListener(
      'loaded',
      () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')),
    );
  
    return $entity;
  };
  
  const renderPlace = ({ location }, count) => {
    const { url, scale, info } = models[count % models.length];
  
    const $info = document.querySelector('.info');
    $info.innerText = info;
  
    const $scene = document.querySelector('a-scene');
    const entityId = `e-${Math.floor(Math.random() * 100000)}`;
    const $entity = createEntity({ id: entityId, location, model: url, scale });
    $scene.appendChild($entity);
  
    // const $button = document.querySelector('button[data-action="change"]');
    // const buttonClickEventListener = () => {
    //   $button.removeEventListener('click', buttonClickEventListener, false);
    //   $scene.removeChild(document.getElementById(entityId));
    //   renderPlace({ location }, count + 1);
    // }
    // $button.addEventListener('click', buttonClickEventListener);
  };
  
  const main = async () => {
    console.log('main');
  
    const $info = document.querySelector('.info');
    $info.innerText = 'loading...'
  
    const successCallback = position => {
      console.log('success', position);
      createPlaces(position.coords)
        .forEach(place => renderPlace(place, 0));
    };
  
    const errorCallback = error => {
      console.log('error', error);
      alert(error.message);
    };
  
    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback
    );
  };
  
  window.onload = main;
  
  const createEntity = ({ location: { latitude, longitude }, model, scale: [x, y, z] }) => {
    const $entity = document.createRange().createContextualFragment(`
      <a-entity
        gltf-model="${model}"
        scale="${x} ${y} ${z}"
        gps-entity-place="latitude: ${latitude}; longitude: ${longitude};"
      ></a-entity>
    `)
  
    $entity.addEventListener(
      'loaded',
      () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')),
    );
  
    return $entity;
  };
  
  const renderPlace = ({ location }) => {
    const $scene = document.querySelector('a-scene');
    const $entity = createEntity({
      location,
      model: '#asset-eevee',
      scale: ['2', '2', '2'],
    });
    $scene.appendChild($entity);
  };
  
  const main = async () => {
    console.log('main');
  
    const successCallback = position => {
      console.log('success', position);
      staticLoadPlaces().forEach(renderPlace);
    };
  
    const errorCallback = error => {
      console.log('error', error);
      alert(error.message);
    };
  
    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback
    );
  };
  
  window.onload = main;
