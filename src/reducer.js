export function reducer(state, { type, payload }) {
  switch (type) {
    case 'CLICK_HEADER_FILTER':
      return {
        ...state,
        currentNewswareFilter: payload,
        isNewswareFilterOpen: !state.isNewswareFilterOpen,
      };
    case 'SET_NEWSWARE_FILTER_OPEN':
      return {
        ...state,
        isNewswareFilterOpen: !state.isNewswareFilterOpen,
      };
    case 'SET_MESSAGE_TEXT':
      return {
        ...state,
        messageText: payload,
      };
    case 'CHANGE_PAGE':
      return {
        ...state,
        page: payload,
      };
    case 'SET_SCROLL_VALUE':
      return {
        ...state,
        scrollValue: payload,
      };
    case 'GO_TO_COMMENTS':
      return {
        ...state,
        message: true,
        commentNewswareId: payload,
      };
    case 'SET_FULL_IMGS':
      return {
        ...state,
        fullImages: payload,
      };
    case 'SET_PROFILE':
      return {
        ...state,
        profile: payload,
      };
    case 'GO_BACK_COMMENTS':
      return {
        ...state,
        messageText: '',
        message: false,
      };
    case 'SET_USER_PROFILE_NEWSWARE':
      return {
        ...state,
        userProfileNewswareItems: payload,
      };
    case 'SET_ACTIVE_CHATS':
      return {
        ...state,
        activeChats: payload,
      };
    case 'SET_CHAT_FILTER':
      return {
        ...state,
        chatFilter: payload,
      };
    case 'SET_ACTIVE_GLOBAL_SEARCH':
      return {
        ...state,
        activeGlobalSearch: payload,
      };
    case 'CLEAR_GLOBAL_FILTERS':
      return {
        ...state,
        globalFilters: {
          tags: [],
          forms: [],
          formats: [],
          cities: [],
        },
      };
    case 'DROP_GLOBAL_FILTER':
      switch (payload.category) {
        case 'tag':
          return {
            ...state,
            globalFilters: {
              ...state.globalFilters,
              tags: state.globalFilters.tags.filter((obj) => obj !== payload.globalFilter),
            },
          };
        case 'form':
          return {
            ...state,
            globalFilters: {
              ...state.globalFilters,
              forms: state.globalFilters.forms.filter((obj) => obj !== payload.globalFilter),
            },
          };
        case 'format':
          return {
            ...state,
            globalFilters: {
              ...state.globalFilters,
              formats: state.globalFilters.formats.filter((obj) => obj !== payload.globalFilter),
            },
          };
        case 'city':
          return {
            ...state,
            globalFilters: {
              ...state.globalFilters,
              cities: state.globalFilters.cities.filter((obj) => obj !== payload.globalFilter),
            },
          };
        default:
          return state;
      }
    case 'ADD_GLOBAL_FILTER':
      switch (payload.category) {
        case 'tag':
          return {
            ...state,
            globalFilters: {
              ...state.globalFilters,
              tags: [...state.globalFilters.tags, payload.globalFilter],
            },
          };
        case 'form':
          return {
            ...state,
            globalFilters: {
              ...state.globalFilters,
              forms: [...state.globalFilters.forms, payload.globalFilter],
            },
          };
        case 'format':
          return {
            ...state,
            globalFilters: {
              ...state.globalFilters,
              formats: [...state.globalFilters.formats, payload.globalFilter],
            },
          };
        case 'city':
          return {
            ...state,
            globalFilters: {
              ...state.globalFilters,
              cities: [...state.globalFilters.cities, payload.globalFilter],
            },
          };
        default:
          return state;
      }
    default:
      return state;
  }
}
