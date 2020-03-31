const initialState = {
    user: {
        email: "", pw: "", age: null,
        street: null,
        city: null,
    },
    actionsDone: 0,
    actionsResolved: false,
    actions: [
        {id: 1, text: "Jetzt schon Weihnachtsschmuck basteln", done: false},
        {id: 2, text: "Ahnenforschung", done: false},
        {id: 3, text: "Selbst tätowieren mit Edding", done: false},
        {id: 4, text: "Nicht Blinzeln Challenge mit dir selbst im Spiegel", done: false},
        {id: 5, text: "Alte und peinliche Fotos ausgraben und Freunden schicken", done: false},
        {id: 6, text: "Alles auf halber Temperatur backen um Zeit totzuschlagen", done: false},
        {id: 7, text: "Alles rückwärts aussprechen.", done: false},
        {id: 8, text: "Rechtschreibfehler in wissenschaftlichen Paper suchen", done: false},
        {id: 9, text: "Alles auf halber Temperatur backen um Zeit totzuschlagen", done: false},
        {id: 10, text: "Wohnung unnötig umstellen", done: false},
        {id: 11, text: "Internet-Speedcheck machen und verärgert den Provider anrufen", done: false},
        {id: 12, text: "Höhle bauen", done: false},
    ],

    charitiesDone: 0,
    charitiesResolved: false,
    charities: [
        {id: 1, text: "Falls du mal draußen bist, pöble große Gruppen an!", done: false},
        {id: 2, text: "Rufe jemand an und verpasse ihm einen Ohrwurm!", done: false},
        {id: 3, text: "Rufe jemanden an, der sich Einsam fühlt.", done: false},
        {id: 4, text: "Koche für deine Mitbewohner, wohnst du alleine - iss zwei Portionen!", done: false},
        {id: 5, text: "Sing ein Lied für deine Nachbarn.", done: false},

    ]
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_USER_AUTH": {
            return {
                ...state,
                user: {
                    email: action.email === undefined ? state.user.email: action.email,
                    pw: action.pw === undefined ? state.user.pw: action.pw,
                    age: action.age === undefined ? state.user.age: action.age,
                    street: action.street === undefined ? state.user.street: action.street,
                    city: action.city === undefined ? state.user.city: action.city,
                }
            }
        }
        case "UPDATE_ACTIONS": {
            const actionsDone = action.updatedActions.filter(item => item.done).length
            const actionsLength = action.updatedActions.length
            return {
                ...state,
                actionsDone: actionsDone,
                actions: action.updatedActions,
                actionsResolved: actionsLength === actionsDone
            }
        }
        case "UPDATE_CHARITIES": {
            const charitiesDone = action.updatedCharities.filter(item => item.done).length
            const charitiesLength = action.updatedCharities.length
            return {
                ...state,
                charitiesDone: charitiesDone,
                charities: action.updatedCharities,
                charitiesResolved: charitiesLength === charitiesDone

            }
        }
        default:
            return state
    }
};

export default reducer
