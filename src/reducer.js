export function reducer(state, { type, payload }) {
    switch (type) {
        case "CLICK_HEADER_FILTER":
            return {
                ...state,
                currentNewswareFilter: payload,
                isNewswareFilterOpen: !state.isNewswareFilterOpen
            };
        case "SET_NEWSWARE_FILTER_OPEN":
            return {
                ...state,
                isNewswareFilterOpen: !state.isNewswareFilterOpen
            };
        case "SET_USER_PROFILE":
            return{
                ...state,
                userProfile: Object.assign(payload)
            }
        case "SET_MODAL":
            return{
                ...state,
                modalOption: payload.option
            }
        case "SET_FOOTER_TYPE":
            return {
                ...state,
                footType: payload
            };
        case "SET_LOGIN_BOX":
            return {
                ...state,
                activeLoginBox: payload
            };
        case "SET_MESSAGE_TEXT":
            return {
                ...state,
                messageText: payload
            };
        case "CHANGE_PAGE":
            return {
                ...state,
                page: payload
            };
        case "SET_FULL_IMGS":
            return {
                ...state,
                fullImages: payload.imgs,
                fullImgIndex: payload.index
            };
        case "EDIT_MY_PROFILE":
            return {
                ...state,
                myProfile: Object.assign(payload)
            };
        case "SET_USER_PROFILE_NEWSWARE":
            return {
                ...state,
                userProfileNewswareItems: payload
            };
        case "SET_PROFILE_ACTIVE_ICON":
            return {
                ...state,
                profileActiveIcon: payload
            };
        case "SET_CHAT_FILTER":
            return {
                ...state,
                chatFilter: payload
            };
        case "SET_ACTIVE_GLOBAL_SEARCH":
            return {
                ...state,
                activeGlobalSearch: payload
            };
        case "CLEAR_GLOBAL_FILTERS":
            return {
                ...state,
                globalFilters: {
                    tags: [],
                    forms: [],
                    formats: [],
                    cities: []
                }
            };
        case "DROP_GLOBAL_FILTER":
            switch (payload.category) {
                case 'tag':
                    return {
                        ...state,
                        globalFilters: {
                            ...state.globalFilters,
                            tags: state.globalFilters.tags.filter((obj) => obj !== payload.globalFilter)
                        }
                    }
                case 'form':
                    return {
                        ...state,
                        globalFilters: {
                            ...state.globalFilters,
                            forms: state.globalFilters.forms.filter((obj) => obj !== payload.globalFilter)
                        }
                    }
                case 'format':
                    return {
                        ...state,
                        globalFilters: {
                            ...state.globalFilters,
                            formats: state.globalFilters.formats.filter((obj) => obj !== payload.globalFilter)
                        }
                    }
                case 'city':
                    return {
                        ...state,
                        globalFilters: {
                            ...state.globalFilters,
                            cities: state.globalFilters.cities.filter((obj) => obj !== payload.globalFilter)
                        }
                    }
                default:
                    return state;
            };
        case "ADD_GLOBAL_FILTER":
            switch (payload.category) {
                case 'tag':
                    return {
                        ...state,
                        globalFilters: {
                            ...state.globalFilters,
                            tags: [...state.globalFilters.tags, payload.globalFilter]
                        }
                    }
                case 'form':
                    return {
                        ...state,
                        globalFilters: {
                            ...state.globalFilters,
                            forms: [...state.globalFilters.forms, payload.globalFilter]
                        }
                    }
                case 'format':
                    return {
                        ...state,
                        globalFilters: {
                            ...state.globalFilters,
                            formats: [...state.globalFilters.formats, payload.globalFilter]
                        }
                    }
                case 'city':
                    return {
                        ...state,
                        globalFilters: {
                            ...state.globalFilters,
                            cities: [...state.globalFilters.cities, payload.globalFilter]
                        }
                    }
                default:
                    return state;
            };
        case 'SET_OPEN_TAB_EDITOR':
            return {
                ...state,
                openTabEditor: !state.openTabEditor
            }
        case 'SET_CLICK_CHAT':
            return {
                ...state,
                clickChat: Object.assign(payload)
            };
        case 'EDITED_CHATS':
            return {
                ...state,
                activeChats: Object.assign(payload),
                messageText: '',
                changeMsgs: [],
                replyDialogMsg: false,
                forwardedDialogMsgs: []
            };
        case 'SET_CHANGE_MSG':
            return {
                ...state,
                changeMsgs: state.changeMsgs.find((changeMsg) => changeMsg.messageId === payload.messageId) ? state.changeMsgs.filter((changeMsg) => changeMsg.messageId !== payload.messageId) : [...state.changeMsgs, payload],
                replyDialogMsg: false,
                forwardedDialogMsgs: [],
                footType: 'editorMsg'
            }
        case 'DELETE_MESSAGES':
            return {
                ...state,
                clickChat: { ...payload },
                changeMsgs: []
            };
        case 'CLICK_MSG_REDACTOR':
            return {
                ...state,
                messageText: payload,
                footType: 'text',
                editorMsg: true
            };
        case 'CLOSED_EDITOR_MSG':
            return {
                ...state,
                messageText: '',
                footType: 'text',
                changeMsgs: [],
                forwardedDialogMsgs: [],
                replyDialogMsg: false,
            };
        case 'REDACTOR_MESSAGE':
            return {
                ...state,
                clickChat: { ...payload },
                changeMsgs: [],
                messageText: '',
                replyDialogMsg: false,
                forwardedDialogMsgs: [],
                editorMsg: false
            };
        case 'SET_REPLY_DIALOG_MSG':
            return {
                ...state,
                replyDialogMsg: payload,
                footType: 'text',
            };
        case 'SET_FORWARDED_DIALOG_MSG':
            return {
                ...state,
                changeMsgs : [],
                forwardedDialogMsgs: [...state.changeMsgs]
            }
        default:
            return state;
    }
}