import Vue from 'vue'

Vue.filter('dealNull', (value, nullVal) =>{

  if (!value || (value+"").trim().length === 0 ) return nullVal
  return value
});

Vue.filter('keyTranslate', (value, keyMap) =>{

  if(keyMap){

    return keyMap[value];
  }

  return value;
}
)

