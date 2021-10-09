"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.store = void 0;
var axios_1 = require("axios");
var vuex_1 = require("vuex");
// 发起访问请求函数(组合get/post等请求)
var asyncAndCommit = function (url, mutationName, commit, config) {
    if (config === void 0) { config = { method: 'get' }; }
    return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, axios_1["default"])(url, config)];
                case 1:
                    data = (_a.sent()).data;
                    commit(mutationName, data);
                    return [2 /*return*/, data];
            }
        });
    });
};
exports.store = (0, vuex_1.createStore)({
    state: {
        error: { status: false },
        token: localStorage.getItem('token') || '',
        loading: false,
        columns: [],
        posts: [],
        user: { isLogin: false }
    },
    mutations: {
        // 登录
        login: function (state, newData) {
            var token = newData.data.token;
            state.token = token;
            localStorage.setItem('token', token);
            // 设置请求头，每次请求都在Authorization中携带token
            axios_1["default"].defaults.headers.common.Authorization = "Bearer " + token;
        },
        // 新建文章
        createPost: function (state, newPost) {
            state.posts.push(newPost);
        },
        fetchColumns: function (state, newData) {
            state.columns = newData.data.list;
        },
        fetchColumn: function (state, newData) {
            state.columns = [newData.data];
        },
        fetchPosts: function (state, newData) {
            state.posts = newData.data.list;
        },
        // 设置loading
        setLoading: function (state, status) {
            state.loading = status;
        },
        fetchCurrentUser: function (state, newData) {
            state.user = __assign({ isLogin: true }, newData.data);
        },
        // 修改错误状态
        setError: function (state, e) {
            state.error = e;
        },
        // 登出
        logout: function (state) {
            state.token = '';
            state.user = { isLogin: false };
            localStorage.remove('token');
            delete axios_1["default"].defaults.headers.common.Authorization;
        },
        fetchPost: function (state, newData) {
            state.posts = [newData.data];
        },
        updatePost: function (state, _a) {
            var data = _a.data;
            state.posts = state.posts.map(function (post) {
                if (post._id === data.id) {
                    return data;
                }
                else {
                    return post;
                }
            });
        },
        deletePost: function (state, _a) {
            var data = _a.data;
            state.posts = state.posts.filter(function (post) { return post._id !== data._id; });
        }
    },
    actions: {
        // 登录
        login: function (_a, params) {
            var commit = _a.commit;
            return asyncAndCommit('/user/login', 'login', commit, {
                method: 'post',
                data: params
            });
        },
        // 获取首页“发现精彩”内容
        fetchColumns: function (_a) {
            var commit = _a.commit;
            return asyncAndCommit('/columns', 'fetchColumns', commit);
        },
        // 获取专栏页头部内容
        fetchColumn: function (_a, cid) {
            var commit = _a.commit;
            return asyncAndCommit("/columns/" + cid, 'fetchColumn', commit);
        },
        // 获取专栏页文章内容
        fetchPosts: function (_a, cid) {
            var commit = _a.commit;
            return asyncAndCommit("/columns/" + cid + "/posts", 'fetchPosts', commit);
        },
        // 获取某一文章内容
        fetchPost: function (_a, id) {
            var commit = _a.commit;
            return asyncAndCommit("/posts/" + id, 'fetchPost', commit);
        },
        // 获取用户信息
        fetchCurrentUser: function (_a) {
            var commit = _a.commit;
            return asyncAndCommit('/user/current', 'fetchCurrentUser', commit);
        },
        // 组合action(login和fetchCurrentUser)
        loginAndFetch: function (_a, loginData) {
            var dispatch = _a.dispatch;
            return dispatch('login', loginData).then(function () {
                return dispatch('fetchCurrentUser');
            });
        },
        // 新建文章
        createPost: function (_a, params) {
            var commit = _a.commit;
            return asyncAndCommit('/posts', 'createPost', commit, {
                method: 'post',
                data: params
            });
        },
        // 更新文章
        updatePost: function (_a, _b) {
            var commit = _a.commit;
            var id = _b.id, params = _b.params;
            return asyncAndCommit("/posts/" + id, 'updatePost', commit, {
                method: 'patch',
                data: params
            });
        },
        // 删除文章
        deletePost: function (_a, id) {
            var commit = _a.commit;
            return asyncAndCommit("/posts/" + id, 'deletePost', commit, {
                method: 'delete',
                data: id
            });
        }
    },
    getters: {
        // 获取当前专栏信息
        getColumnById: function (state) { return function (id) {
            return state.columns.find(function (c) { return c._id === id; });
        }; },
        // 获取当前专栏内文章
        getPostsByCid: function (state) { return function (cid) {
            return state.posts.filter(function (post) { return post.column === cid; });
        }; },
        // 获取当前文章
        getCurrentPost: function (state) { return function (id) {
            return state.posts.find(function (post) { return post._id === id; });
        }; }
    }
});
exports["default"] = exports.store;
