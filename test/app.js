const staticLoadPlaces = () => [
    // {
    //   label: 'p1',
    //   location: {
    //     latitude:   35.1910560565511,
    //     longitude: 132.500876966642,
    //   },
    // },
    // {
    //     label: 'p2',
    //     location: {
    //       latitude:   35.191084200685, 
    //       longitude: 132.500892342173,
    //     },
    //   },
    //     {
    //     label: 'p3',
    //     location: {
    //       latitude:   35.1911149669384, 
    //       longitude: 132.500903277536,
    //     },
    //   },
    //      {
    //     label: 'p4',
    //     location: {
    //       latitude:   35.1911447120686, 
    //       longitude:  132.500905942735,
    //     },
    //   },
    //      {
    //     label: 'p5',
    //     location: {
    //       latitude:   35.1911750002241, 
    //       longitude: 132.500900980012,
    //     },
    //   },
    //   {
    //     label: 'p6',
    //     location: {
    //       latitude:   35.1912026908251, 
    //       longitude: 132.500891555726,
    //     },
    //   },
    //   {
    //     label: 'p7',
    //     location: {
    //       latitude:   35.1912304077455, 
    //       longitude: 132.50087259385,
    //     },
    //   },
    //   {
    //     label: 'p8',
    //     location: {
    //       latitude:   35.1912654532629, 
    //       longitude: 132.500846031813,
    //     },
    //   },
    //  {
    //     label: 'p9',
    //     location: {
    //       latitude:   35.1913059240663, 
    //       longitude: 132.50083017269,
    //     },
    //   },

  ];
  
  const createEntity = ({ location: { latitude, longitude }, model, scale: [x, y, z] }) => {
    const $entity = document.createRange().createContextualFragment(`
      <a-entity
        gltf-model="${model}"
        scale="${x} ${y} ${z}"
        light=" type: ambient; color: #ffffff; intensity: 1.5 "
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
      scale: ['1', '1', '1'],
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
