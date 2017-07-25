let appState = {
    title:{
        text:'React Redux',
        color:'red'
    },
    content:{
        text:'make redux',
        color:'blue'
    }
}

function createStore(state,stateChanger){
    const listeners = [];
    const subscribe = (listener) =>listeners.push(listener);
    const getState = () =>state
    const dispatch = (action) =>{
        state = stateChanger(state,action);
        listeners.forEach((listener) =>listener())
    }
    return{getState,dispatch,subscribe}
}



function renderApp(newAppState,oldAppState = {}){
    if(newAppState === oldAppState) return
    console.log('render app...')
    renderTitle(newAppState.title,oldAppState.title);
    renderContent(newAppState.content,oldAppState.content);
}

function renderTitle(newtitle,oldtitle = {}){
    if(newtitle === oldtitle) return
    console.log('render title...')
    const titleDOM = document.getElementById('title');
    titleDOM.innerHTML = newtitle.text;
    titleDOM.style.color = newtitle.color;
}

function renderContent(newcontent,oldcontent ={}){
    if(newcontent === oldcontent) return
    console.log('render content...')
    const contentDOM = document.getElementById('content');
    contentDOM.innerHTML = newcontent.text;
    contentDOM.style.color = newcontent.color;
}

function stateChanger (state,action){
    switch(action.type){
        case 'UPDATE_TITLE_TEXT':
        return{
            ...state,
            title:{
                ...state,
                text:action.text
            }
        }
      
        case 'UPDATE_TITLE_COLOR':
        return{
            ...state,
            title:{
                ...state,
                color:action.color
            }
        }
        default:
        return state
    }
}

const store = createStore(appState,stateChanger);
let oldState = store.getState();
store.subscribe(() =>{
    const newState = store.getState();
    renderApp(newState,oldState);
    oldState = newState;
});

renderApp(store.getState());
store.dispatch({type:'UPDATE_TITLE_TEXT',text:'react-redux'});
store.dispatch({type:'UPDATE_TITLE_COLOR',color:'blue'});

