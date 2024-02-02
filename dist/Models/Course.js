var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Course_id, _Course_imageUrl, _Course_title, _Course_startDate, _Course_endDate, _Course_cost, _Course_description, _Course_rating;
class Course {
    constructor(id, imageUrl, title, startDate, endDate, cost, description, rating) {
        _Course_id.set(this, void 0);
        _Course_imageUrl.set(this, void 0);
        _Course_title.set(this, void 0);
        _Course_startDate.set(this, void 0);
        _Course_endDate.set(this, void 0);
        _Course_cost.set(this, void 0);
        _Course_description.set(this, void 0);
        _Course_rating.set(this, void 0);
        __classPrivateFieldSet(this, _Course_id, id, "f");
        __classPrivateFieldSet(this, _Course_imageUrl, imageUrl, "f");
        __classPrivateFieldSet(this, _Course_title, title, "f");
        __classPrivateFieldSet(this, _Course_startDate, startDate, "f");
        __classPrivateFieldSet(this, _Course_endDate, endDate, "f");
        __classPrivateFieldSet(this, _Course_cost, cost, "f");
        __classPrivateFieldSet(this, _Course_description, description, "f");
        __classPrivateFieldSet(this, _Course_rating, rating, "f");
    }
    get id() {
        return __classPrivateFieldGet(this, _Course_id, "f");
    }
    get imageUrl() {
        return __classPrivateFieldGet(this, _Course_imageUrl, "f");
    }
    get title() {
        return __classPrivateFieldGet(this, _Course_title, "f");
    }
    get startDate() {
        return __classPrivateFieldGet(this, _Course_startDate, "f");
    }
    get endDate() {
        return __classPrivateFieldGet(this, _Course_endDate, "f");
    }
    get cost() {
        return __classPrivateFieldGet(this, _Course_cost, "f");
    }
    get description() {
        return __classPrivateFieldGet(this, _Course_description, "f");
    }
    get rating() {
        return __classPrivateFieldGet(this, _Course_rating, "f").toFixed(1) + ' / 5';
    }
}
_Course_id = new WeakMap(), _Course_imageUrl = new WeakMap(), _Course_title = new WeakMap(), _Course_startDate = new WeakMap(), _Course_endDate = new WeakMap(), _Course_cost = new WeakMap(), _Course_description = new WeakMap(), _Course_rating = new WeakMap();
export default Course;
